"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Edit, 
  Save, 
  Trash2,
  Phone,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

interface CTASection {
  id?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  textColor?: string;
  isActive?: boolean;
}

const defaultCTAData: CTASection = {
  title: "Get Started",
  description: "Contact us today",
  buttonText: "Contact",
  buttonLink: "/contact",
  backgroundColor: "#0066cc",
  textColor: "#ffffff",
  isActive: true,
};

const API_BASE = getApiUrl("api/home-cta");

export default function CTASection() {
  const [ctaData, setCtaData] = useState<CTASection>(defaultCTAData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCTAData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setCtaData(result.data);
      } else if (result.success && !result.data) {
        setCtaData(defaultCTAData);
      } else {
        // On error, use default data instead of showing error
        setCtaData(defaultCTAData);
        setError(null);
      }
    } catch (err: any) {
      console.error("Error fetching CTA data:", err);
      // On error, use default data instead of showing error
      setCtaData(defaultCTAData);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCTAData();
  }, []);

  const handleSave = async () => {
    if (!ctaData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!ctaData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!ctaData.buttonText.trim()) {
      setError("Button text is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        title: ctaData.title.trim(),
        description: ctaData.description.trim(),
        buttonText: ctaData.buttonText.trim(),
        buttonLink: ctaData.buttonLink.trim(),
        backgroundColor: ctaData.backgroundColor || "#0066cc",
        textColor: ctaData.textColor || "#ffffff",
        isActive: ctaData.isActive !== undefined ? ctaData.isActive : true,
      };

      const isNew = !ctaData.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${ctaData.id}`, payload);

      if (result.success) {
        setSuccessMessage(`CTA Section ${isNew ? "created" : "updated"} successfully!`);
        setIsEditing(false);
        await fetchCTAData();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || result.errors?.[0]?.msg || `Failed to ${isNew ? "create" : "update"} CTA section`);
      }
    } catch (err: any) {
      console.error("Error saving CTA:", err);
      setError(err.message || "Failed to save CTA data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!ctaData.id) {
      setError("No CTA data to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this CTA section?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${ctaData.id}`);

      if (result.success) {
        setSuccessMessage("CTA section deleted successfully!");
        setCtaData(defaultCTAData);
        setIsEditing(false);
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || "Failed to delete CTA section");
      }
    } catch (err: any) {
      console.error("Error deleting CTA:", err);
      setError(err.message || "Failed to delete CTA section");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <CardTitle>CTA Section</CardTitle>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {ctaData.id && (
                    <Button onClick={handleDelete} variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={handleSave} size="sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      fetchCTAData();
                    }} 
                    variant="outline" 
                    size="sm"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={ctaData.title}
                  onChange={(e) => setCtaData({ ...ctaData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={ctaData.description}
                  onChange={(e) => setCtaData({ ...ctaData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={ctaData.buttonText}
                    onChange={(e) => setCtaData({ ...ctaData, buttonText: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={ctaData.buttonLink}
                    onChange={(e) => setCtaData({ ...ctaData, buttonLink: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background Color (Hex)</Label>
                  <Input
                    type="color"
                    value={ctaData.backgroundColor || "#0066cc"}
                    onChange={(e) => setCtaData({ ...ctaData, backgroundColor: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Text Color (Hex)</Label>
                  <Input
                    type="color"
                    value={ctaData.textColor || "#ffffff"}
                    onChange={(e) => setCtaData({ ...ctaData, textColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div 
                className="p-6 rounded-lg text-center"
                style={{
                  backgroundColor: ctaData.backgroundColor || "#0066cc",
                  color: ctaData.textColor || "#ffffff"
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{ctaData.title}</h3>
                <p className="mb-4">{ctaData.description}</p>
                <Button 
                  variant="secondary"
                  style={{
                    backgroundColor: ctaData.textColor || "#ffffff",
                    color: ctaData.backgroundColor || "#0066cc"
                  }}
                >
                  {ctaData.buttonText}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


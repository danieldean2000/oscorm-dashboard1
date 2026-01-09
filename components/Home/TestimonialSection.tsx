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
  MessageSquare,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

interface TestimonialSection {
  id?: string;
  title: string;
  description: string;
  isActive?: boolean;
}

const defaultSectionData: TestimonialSection = {
  title: "Testimonials",
  description: "What our clients say",
  isActive: true,
};

const API_BASE = getApiUrl("api/home-testimonial-section");

export default function TestimonialSection() {
  const [sectionData, setSectionData] = useState<TestimonialSection>(defaultSectionData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchSectionData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setSectionData(result.data);
      } else if (result.success && !result.data) {
        setSectionData(defaultSectionData);
      } else {
        // On error, use default data instead of showing error
        setSectionData(defaultSectionData);
        setError(null);
      }
    } catch (err: any) {
      console.error("Error fetching section data:", err);
      // On error, use default data instead of showing error
      setSectionData(defaultSectionData);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

  const handleSave = async () => {
    if (!sectionData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!sectionData.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        title: sectionData.title.trim(),
        description: sectionData.description.trim(),
        isActive: sectionData.isActive !== undefined ? sectionData.isActive : true,
      };

      const isNew = !sectionData.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${sectionData.id}`, payload);

      if (result.success) {
        setSuccessMessage(`Section ${isNew ? "created" : "updated"} successfully!`);
        setIsEditing(false);
        await fetchSectionData();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || result.errors?.[0]?.msg || `Failed to ${isNew ? "create" : "update"} section`);
      }
    } catch (err: any) {
      console.error("Error saving section:", err);
      setError(err.message || "Failed to save section data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!sectionData.id) {
      setError("No section data to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this section?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${sectionData.id}`);

      if (result.success) {
        setSuccessMessage("Section deleted successfully!");
        setSectionData(defaultSectionData);
        setIsEditing(false);
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || "Failed to delete section");
      }
    } catch (err: any) {
      console.error("Error deleting section:", err);
      setError(err.message || "Failed to delete section");
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
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Testimonials Section Header</CardTitle>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Header
                  </Button>
                  {sectionData.id && (
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
                      fetchSectionData();
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
        <CardContent>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm mb-4">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm mb-4">
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={sectionData.title}
                  onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Section Description</Label>
                <textarea
                  className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                  value={sectionData.description}
                  onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-1">{sectionData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


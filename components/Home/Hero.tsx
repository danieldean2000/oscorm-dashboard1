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
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

interface HeroSection {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  isActive?: boolean;
}

const defaultHeroData: HeroSection = {
  title: "Welcome",
  subtitle: "Solutions",
  description: "We provide solutions for your business.",
  buttonText: "Get Started",
  buttonLink: "/contact",
  backgroundImage: "/images/hero-bg.jpg",
  isActive: true,
};

const API_BASE = getApiUrl("api/home-hero");

export default function Hero() {
  const [heroSection, setHeroSection] = useState<HeroSection>(defaultHeroData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchHeroData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setHeroSection(result.data);
      } else if (result.success && !result.data) {
        setHeroSection(defaultHeroData);
      } else {
        setError(result.message || "Failed to fetch hero data");
      }
    } catch (err: any) {
      console.error("Error fetching hero data:", err);
      setError(err.message || "Failed to fetch hero data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleSave = async () => {
    if (!heroSection.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!heroSection.subtitle.trim()) {
      setError("Subtitle is required");
      return;
    }
    if (!heroSection.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        title: heroSection.title.trim(),
        subtitle: heroSection.subtitle.trim(),
        description: heroSection.description.trim(),
        buttonText: heroSection.buttonText.trim(),
        buttonLink: heroSection.buttonLink.trim(),
        backgroundImage: heroSection.backgroundImage.trim(),
        isActive: heroSection.isActive !== undefined ? heroSection.isActive : true,
      };

      const isNew = !heroSection.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${heroSection.id}`, payload);

      if (result.success) {
        setSuccessMessage(`Hero ${isNew ? "created" : "updated"} successfully!`);
        setIsEditing(false);
        await fetchHeroData();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || result.errors?.[0]?.msg || `Failed to ${isNew ? "create" : "update"} hero`);
      }
    } catch (err: any) {
      console.error("Error saving hero:", err);
      setError(err.message || "Failed to save hero data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!heroSection.id) {
      setError("No hero data to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this hero section?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${heroSection.id}`);

      if (result.success) {
        setSuccessMessage("Hero deleted successfully!");
        setHeroSection(defaultHeroData);
        setIsEditing(false);
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || "Failed to delete hero");
      }
    } catch (err: any) {
      console.error("Error deleting hero:", err);
      setError(err.message || "Failed to delete hero");
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
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle>Hero Section</CardTitle>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {heroSection.id && (
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
                      fetchHeroData();
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
                  value={heroSection.title}
                  onChange={(e) => setHeroSection({ ...heroSection, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={heroSection.subtitle}
                  onChange={(e) => setHeroSection({ ...heroSection, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={heroSection.description}
                  onChange={(e) => setHeroSection({ ...heroSection, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={heroSection.buttonText}
                    onChange={(e) => setHeroSection({ ...heroSection, buttonText: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={heroSection.buttonLink}
                    onChange={(e) => setHeroSection({ ...heroSection, buttonLink: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Background Image URL</Label>
                <Input
                  value={heroSection.backgroundImage}
                  onChange={(e) => setHeroSection({ ...heroSection, backgroundImage: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold">{heroSection.title}</h3>
                <p className="text-sm text-muted-foreground">{heroSection.subtitle}</p>
                <p className="mt-2">{heroSection.description}</p>
                <Button className="mt-4">{heroSection.buttonText}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


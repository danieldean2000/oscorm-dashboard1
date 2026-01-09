"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Save, 
  Trash2, 
  Plus, 
  X,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

// Interfaces
interface BadgeItem {
  id: string;
  label: string;
}

interface ButtonItem {
  id: string;
  label: string;
}

interface HeroData {
  id?: string;
  serviceSlug: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
  badges: BadgeItem[];
  features: string[];
  buttons: ButtonItem[];
  isActive?: boolean;
}

// Dummy data for initial state
const defaultHeroData: HeroData = {
  serviceSlug: "admin-support",
  backgroundImage: "/images/services/admin-support.jpg",
  title: "Reliable Admin Support Services",
  subtitle: "Streamline your operations with our professional administrative support solutions.",
  badges: [
    {
      id: "1",
      label: "Admin Support Services"
    },
    {
      id: "2",
      label: "24/7 Business Support"
    }
  ],
  features: [
    "Dedicated virtual administrative assistants",
    "Accurate data entry and document management",
    "Calendar and email management services",
    "Scalable admin support for growing businesses"
  ],
  buttons: [
    {
      id: "1",
      label: "Get Custom Quote"
    },
    {
      id: "2",
      label: "Talk to Expert"
    }
  ]
};

// API Base URL - Update this according to your API endpoint
const API_BASE = getApiUrl("api/service-hero");

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>(defaultHeroData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch hero data from API
  const fetchHeroData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setHeroData(result.data);
      } else if (result.success && !result.data) {
        // If no data exists, use default data
        setHeroData(defaultHeroData);
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

  // Load data on component mount
  useEffect(() => {
    fetchHeroData();
  }, []);

  // Handle save/update
  const handleSave = async () => {
    // Validation
    if (!heroData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!heroData.subtitle.trim()) {
      setError("Subtitle is required");
      return;
    }
    if (!heroData.serviceSlug.trim()) {
      setError("Service slug is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        serviceSlug: heroData.serviceSlug.trim(),
        backgroundImage: heroData.backgroundImage.trim(),
        title: heroData.title.trim(),
        subtitle: heroData.subtitle.trim(),
        badges: heroData.badges,
        features: heroData.features.filter(f => f.trim() !== ""),
        buttons: heroData.buttons,
        isActive: heroData.isActive !== undefined ? heroData.isActive : true,
      };

      const isNew = !heroData.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${heroData.id}`, payload);

      if (result.success) {
        setSuccessMessage(`Hero ${isNew ? "created" : "updated"} successfully!`);
        setIsEditing(false);
        await fetchHeroData(); // Refresh data
        
        // Clear success message after 3 seconds
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

  // Handle delete
  const handleDelete = async () => {
    if (!heroData.id) {
      setError("No hero data to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this hero section?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${heroData.id}`);

      if (result.success) {
        setSuccessMessage("Hero deleted successfully!");
        setHeroData(defaultHeroData);
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

  // Handle add badge
  const handleAddBadge = () => {
    const newBadge: BadgeItem = {
      id: Date.now().toString(),
      label: "New Badge"
    };
    setHeroData({
      ...heroData,
      badges: [...heroData.badges, newBadge]
    });
  };

  // Handle update badge
  const handleUpdateBadge = (id: string, label: string) => {
    setHeroData({
      ...heroData,
      badges: heroData.badges.map(badge => 
        badge.id === id ? { ...badge, label } : badge
      )
    });
  };

  // Handle delete badge
  const handleDeleteBadge = (id: string) => {
    setHeroData({
      ...heroData,
      badges: heroData.badges.filter(badge => badge.id !== id)
    });
  };

  // Handle add feature
  const handleAddFeature = () => {
    setHeroData({
      ...heroData,
      features: [...heroData.features, ""]
    });
  };

  // Handle update feature
  const handleUpdateFeature = (index: number, value: string) => {
    const newFeatures = [...heroData.features];
    newFeatures[index] = value;
    setHeroData({
      ...heroData,
      features: newFeatures
    });
  };

  // Handle delete feature
  const handleDeleteFeature = (index: number) => {
    setHeroData({
      ...heroData,
      features: heroData.features.filter((_, i) => i !== index)
    });
  };

  // Handle add button
  const handleAddButton = () => {
    const newButton: ButtonItem = {
      id: Date.now().toString(),
      label: "New Button"
    };
    setHeroData({
      ...heroData,
      buttons: [...heroData.buttons, newButton]
    });
  };

  // Handle update button
  const handleUpdateButton = (id: string, label: string) => {
    setHeroData({
      ...heroData,
      buttons: heroData.buttons.map(button => 
        button.id === id ? { ...button, label } : button
      )
    });
  };

  // Handle delete button
  const handleDeleteButton = (id: string) => {
    setHeroData({
      ...heroData,
      buttons: heroData.buttons.filter(button => button.id !== id)
    });
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle>Service Hero Section</CardTitle>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {heroData.id && (
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
                      fetchHeroData(); // Reset to original data
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
        <CardContent className="space-y-6">
          {/* Error/Success Messages */}
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
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label>Service Slug</Label>
                  <Input
                    value={heroData.serviceSlug}
                    onChange={(e) => setHeroData({ ...heroData, serviceSlug: e.target.value })}
                    placeholder="admin-support"
                  />
                </div>
                <div>
                  <Label>Background Image URL</Label>
                  <Input
                    value={heroData.backgroundImage}
                    onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
                    placeholder="/images/services/admin-support.jpg"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={heroData.title}
                    onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                    placeholder="Reliable Admin Support Services"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                    placeholder="Streamline your operations..."
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Badges</Label>
                  <Button onClick={handleAddBadge} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Badge
                  </Button>
                </div>
                <div className="space-y-2">
                  {heroData.badges.map((badge) => (
                    <div key={badge.id} className="flex gap-2">
                      <Input
                        value={badge.label}
                        onChange={(e) => handleUpdateBadge(badge.id, e.target.value)}
                        placeholder="Badge label"
                      />
                      <Button
                        onClick={() => handleDeleteBadge(badge.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button onClick={handleAddFeature} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {heroData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleUpdateFeature(index, e.target.value)}
                        placeholder="Feature description"
                      />
                      <Button
                        onClick={() => handleDeleteFeature(index)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Action Buttons</Label>
                  <Button onClick={handleAddButton} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Button
                  </Button>
                </div>
                <div className="space-y-2">
                  {heroData.buttons.map((button) => (
                    <div key={button.id} className="flex gap-2">
                      <Input
                        value={button.label}
                        onChange={(e) => handleUpdateButton(button.id, e.target.value)}
                        placeholder="Button label"
                      />
                      <Button
                        onClick={() => handleDeleteButton(button.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Service Slug</p>
                  <p className="font-medium">{heroData.serviceSlug}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-semibold text-lg">{heroData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subtitle</p>
                  <p className="text-sm">{heroData.subtitle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {heroData.badges.map((badge) => (
                      <Badge key={badge.id} variant="secondary">
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Features</p>
                  <ul className="list-disc list-inside space-y-1">
                    {heroData.features.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Buttons</p>
                  <div className="flex gap-2">
                    {heroData.buttons.map((button) => (
                      <Button key={button.id} variant="outline" size="sm">
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

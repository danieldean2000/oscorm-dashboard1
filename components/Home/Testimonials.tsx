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
  MessageSquare,
  Star,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

interface Testimonial {
  id?: string;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  profileImage: string;
  rating: number;
  order: number;
  isActive: boolean;
}

const API_BASE = getApiUrl("api/home-testimonials");

// Dummy data for preview
const dummyTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    title: "CEO",
    company: "Tech Corp",
    testimonial: "Great service and support!",
    profileImage: "",
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Founder",
    company: "StartupX",
    testimonial: "Excellent experience working with the team.",
    profileImage: "",
    rating: 4,
    order: 2,
    isActive: true,
  },
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
      }`}
    />
  ));
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(dummyTestimonials);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setTestimonials(result.data);
      } else if (result.success && !result.data) {
        // Keep dummy data if API returns empty
        setTestimonials(dummyTestimonials);
      } else {
        // On error, show dummy data
        setTestimonials(dummyTestimonials);
        setError(null); // Don't show error, just use dummy data
      }
    } catch (err: any) {
      console.error("Error fetching testimonials:", err);
      // On error, show dummy data instead of error
      setTestimonials(dummyTestimonials);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (testimonialId: string) => {
    const testimonial = testimonials.find(t => t.id === testimonialId);
    if (!testimonial) return;

    if (!testimonial.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!testimonial.testimonial.trim()) {
      setError("Testimonial text is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        name: testimonial.name.trim(),
        title: testimonial.title.trim(),
        company: testimonial.company.trim(),
        testimonial: testimonial.testimonial.trim(),
        profileImage: testimonial.profileImage.trim(),
        rating: testimonial.rating,
        order: testimonial.order,
        isActive: testimonial.isActive,
      };

      const isNew = !testimonial.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${testimonial.id}`, payload);

      if (result.success) {
        setSuccessMessage(`Testimonial ${isNew ? "created" : "updated"} successfully!`);
        setEditingTestimonial(null);
        await fetchTestimonials();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || result.errors?.[0]?.msg || `Failed to ${isNew ? "create" : "update"} testimonial`);
      }
    } catch (err: any) {
      console.error("Error saving testimonial:", err);
      setError(err.message || "Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (testimonialId: string) => {
    const testimonial = testimonials.find(t => t.id === testimonialId);
    if (!testimonial || !testimonial.id) {
      setError("No testimonial to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${testimonial.id}`);

      if (result.success) {
        setSuccessMessage("Testimonial deleted successfully!");
        await fetchTestimonials();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || "Failed to delete testimonial");
      }
    } catch (err: any) {
      console.error("Error deleting testimonial:", err);
      setError(err.message || "Failed to delete testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: "",
      title: "",
      company: "",
      testimonial: "",
      profileImage: "",
      rating: 5,
      order: testimonials.length + 1,
      isActive: true,
    };
    setTestimonials([...testimonials, newTestimonial]);
    setEditingTestimonial(newTestimonial.id!);
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
              <CardTitle>Testimonials</CardTitle>
              <Badge variant="secondary">{testimonials.length} Testimonials</Badge>
            </div>
            <Button onClick={handleAddTestimonial} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {testimonial.profileImage ? (
                        <img
                          src={testimonial.profileImage}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                      {testimonial.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {editingTestimonial === testimonial.id ? (
                      <Button onClick={() => handleSave(testimonial.id!)} size="sm" variant="outline" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <Button onClick={() => setEditingTestimonial(testimonial.id!)} size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(testimonial.id!)}
                      variant="destructive"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {editingTestimonial === testimonial.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Profile Image URL</Label>
                      <Input
                        value={testimonial.profileImage}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, profileImage: e.target.value } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, name: e.target.value } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={testimonial.title}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, title: e.target.value } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={testimonial.company}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, company: e.target.value } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Testimonial</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                        value={testimonial.testimonial}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, testimonial: e.target.value } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Rating (1-5 stars)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, rating: parseInt(e.target.value) || 5 } : t
                          );
                          setTestimonials(updated);
                        }}
                      />
                      <div className="flex gap-1 mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`active-${testimonial.id}`}
                        checked={testimonial.isActive}
                        onChange={(e) => {
                          const updated = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, isActive: e.target.checked } : t
                          );
                          setTestimonials(updated);
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`active-${testimonial.id}`} className="cursor-pointer">
                        Active (visible on website)
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No testimonials added yet. Click "Add Testimonial" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


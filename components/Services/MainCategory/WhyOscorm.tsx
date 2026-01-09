"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, TrendingUp } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface WhyOscormFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  bulletPoints: string[];
}

interface WhyOscormSection {
  title: string;
  features: WhyOscormFeature[];
}

export function WhyOscorm() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<WhyOscormSection>({
    title: "Why Oscorm for Admin Support?",
    features: [
      {
        id: "1",
        title: "Dedicated Support Team + PM + QA",
        description: "You get a complete support unit instead of just a lone freelancer.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Dedicated Support Specialist to do the actual work",
          "Project Manager for clarity, planning & deadlines",
          "QA Specialist to ensure consistency, brand alignment & error-free delivery",
        ],
      },
      {
        id: "2",
        title: "Cross-Skill Support (Multi-Channel + Data + Research)",
        description: "You don't need to hire multiple freelancers. All under one roof:",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Customer Support",
          "Data Processing",
          "Executive Assistance",
          "Research & Analysis",
          "CRM & Back-Office",
        ],
      },
      {
        id: "3",
        title: "AI QC for Quality Consistency & Accuracy",
        description: "Your support tasks are not just human-reviewed.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Data accuracy checks",
          "Process consistency",
          "Quality assurance automation",
          "Error detection & prevention",
          "Performance monitoring",
        ],
      },
      {
        id: "4",
        title: "Fast Turnaround & Flexible Team Scale-Up",
        description: "Scale instantly whether you need one specialist or a full 8-member pod.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "AI-assisted workflows",
          "In-house teams",
          "Streamlined internal systems",
        ],
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Why Oscorm section saved:", sectionData);
  };

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Feature description",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
      bulletPoints: ["Point 1", "Point 2"],
    };
    setSectionData({
      ...sectionData,
      features: [...sectionData.features, newFeature],
    });
  };

  const handleDeleteFeature = (id: string) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.filter(f => f.id !== id),
    });
  };

  const handleAddBulletPoint = (featureId: string) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.map(f =>
        f.id === featureId
          ? { ...f, bulletPoints: [...f.bulletPoints, "New point"] }
          : f
      ),
    });
  };

  const handleRemoveBulletPoint = (featureId: string, index: number) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.map(f =>
        f.id === featureId
          ? { ...f, bulletPoints: f.bulletPoints.filter((_, i) => i !== index) }
          : f
      ),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Why Oscorm</CardTitle>
            </div>
            <div className="flex gap-2">
              {!editing ? (
                <Button onClick={() => setEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
              {editing && (
                <Button onClick={handleAddFeature} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={sectionData.title}
                  onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                />
              </div>
              <div className="space-y-6">
                {sectionData.features.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Feature Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const updated = sectionData.features.map(f =>
                            f.id === feature.id ? { ...f, title: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, features: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[60px] px-3 py-2 border rounded-md"
                        value={feature.description}
                        onChange={(e) => {
                          const updated = sectionData.features.map(f =>
                            f.id === feature.id ? { ...f, description: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, features: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={feature.image}
                        onChange={(e) => {
                          const updated = sectionData.features.map(f =>
                            f.id === feature.id ? { ...f, image: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, features: updated });
                        }}
                      />
                      {feature.image && (
                        <div className="relative w-full h-48 mt-2 rounded-md overflow-hidden bg-muted">
                          <SafeImage
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Bullet Points</Label>
                        <Button
                          onClick={() => handleAddBulletPoint(feature.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Point
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {feature.bulletPoints.map((point, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={point}
                              onChange={(e) => {
                                const updated = sectionData.features.map(f =>
                                  f.id === feature.id
                                    ? {
                                        ...f,
                                        bulletPoints: f.bulletPoints.map((p, i) =>
                                          i === idx ? e.target.value : p
                                        ),
                                      }
                                    : f
                                );
                                setSectionData({ ...sectionData, features: updated });
                              }}
                            />
                            <Button
                              onClick={() => handleRemoveBulletPoint(feature.id, idx)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteFeature(feature.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Feature
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-4">{sectionData.title}</h3>
              <div className="space-y-6">
                {sectionData.features.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="relative w-full h-64 rounded-md overflow-hidden bg-muted">
                        {feature.image ? (
                          <SafeImage
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground mb-3">{feature.description}</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {feature.bulletPoints.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Monitor } from "lucide-react";

interface TrackingFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TrackingSection {
  title: string;
  subtitle: string;
  mainImageSrc: string;
  mainImageAlt: string;
  features: TrackingFeature[];
}

export function RealTimeTracking() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<TrackingSection>({
    title: "Real-Time Tracking System",
    subtitle: "Complete visibility into your support operations",
    mainImageSrc: "/images/services/admin-support/pc.png",
    mainImageAlt: "Real-Time Tracking Dashboard",
    features: [
      {
        id: "1",
        icon: "/images/services/admin-support/Live-Work-Tracking.png",
        title: "Live Work Tracking",
        description: "Monitor support tasks in real-time with screenshots and progress updates",
      },
      {
        id: "2",
        icon: "/images/services/admin-support/AI-Activity-Insights.png",
        title: "AI Activity Insights",
        description: "Smart analytics on support team productivity and performance patterns",
      },
      {
        id: "3",
        icon: "/images/services/admin-support/Task-Level-Transparency.png",
        title: "Task-Level Transparency",
        description: "Detailed progress tracking at individual support task level with milestones",
      },
      {
        id: "4",
        icon: "/images/services/admin-support/PM-Verified-Reports.png",
        title: "PM-Verified Reports",
        description: "Project manager validated support progress reports with quality assurance",
      },
      {
        id: "5",
        icon: "/images/services/admin-support/Time-Output-Logs.png",
        title: "Time & Output Logs",
        description: "Accurate time tracking and support output measurement with analytics",
      },
      {
        id: "6",
        icon: "/images/services/admin-support/Centralized-File-Delivery.png",
        title: "Centralized File Delivery",
        description: "All support files delivered through secure central system with version control",
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Tracking section saved:", sectionData);
  };

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/feature-new.png",
      title: "New Feature",
      description: "Feature description",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.7 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <CardTitle>Real-Time Tracking System</CardTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={sectionData.title}
                    onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={sectionData.subtitle}
                    onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Main Image URL</Label>
                  <Input
                    value={sectionData.mainImageSrc}
                    onChange={(e) => setSectionData({ ...sectionData, mainImageSrc: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Main Image Alt Text</Label>
                  <Input
                    value={sectionData.mainImageAlt}
                    onChange={(e) => setSectionData({ ...sectionData, mainImageAlt: e.target.value })}
                  />
                </div>
                {sectionData.mainImageSrc && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={sectionData.mainImageSrc}
                      alt={sectionData.mainImageAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-4">
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
                      <Label>Icon URL</Label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => {
                          const updated = sectionData.features.map(f =>
                            f.id === feature.id ? { ...f, icon: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, features: updated });
                        }}
                      />
                      {feature.icon && (
                        <div className="relative w-16 h-16 mt-2 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={feature.icon}
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
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
              <h3 className="text-2xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-2">{sectionData.subtitle}</p>
              <div className="relative w-full h-64 md:h-96 mt-4 mb-6 rounded-lg overflow-hidden bg-muted">
                {sectionData.mainImageSrc ? (
                  <Image
                    src={sectionData.mainImageSrc}
                    alt={sectionData.mainImageAlt}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Main Image
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {sectionData.features.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="relative w-16 h-16 mb-3 rounded-md overflow-hidden bg-muted">
                      {feature.icon ? (
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No Icon
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Sliders } from "lucide-react";

interface EngagementSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  order: number;
}

interface EngagementSection {
  sectionTitle: string;
  slides: EngagementSlide[];
}

export function EngagementModels() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<EngagementSection>({
    sectionTitle: "Engagement Models Built for Your Needs",
    slides: [
      {
        id: "1",
        title: "Support Retainer",
        subtitle: "A continuous, high-volume support subscription available every month.",
        description: "Submit support requests through your dashboard, and we provide prioritization and delivery in sprints. All tasks go through PM review, QA, and version tracking.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Learn More",
        order: 1,
      },
      {
        id: "2",
        title: "Dedicated Team",
        subtitle: "Full-time, managed support specialists embedded into your workflows.",
        description: "Handpicked support team aligned to your workflows, with PM supervision and real-time reporting to ensure predictable delivery.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Explore Team",
        order: 2,
      },
      {
        id: "3",
        title: "Project-Based Engagement",
        subtitle: "Fixed-scope support projects with clear milestones and deliverables.",
        description: "Structured delivery with kickoff, milestones, and QA gates to ensure every support project meets your quality bar and deadlines.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Get Proposal",
        order: 3,
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Engagement section saved:", sectionData);
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now().toString(),
      title: "New Engagement Model",
      subtitle: "Subtitle",
      description: "Description",
      image: "/images/services/admin-support/Engagement-new.png",
      cta: "Learn More",
      order: sectionData.slides.length + 1,
    };
    setSectionData({
      ...sectionData,
      slides: [...sectionData.slides, newSlide],
    });
  };

  const handleDeleteSlide = (id: string) => {
    setSectionData({
      ...sectionData,
      slides: sectionData.slides.filter(s => s.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-primary" />
              <CardTitle>Engagement Models</CardTitle>
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
                <Button onClick={handleAddSlide} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slide
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
                  value={sectionData.sectionTitle}
                  onChange={(e) => setSectionData({ ...sectionData, sectionTitle: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                {sectionData.slides.map((slide) => (
                  <div key={slide.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Slide Title</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => {
                          const updated = sectionData.slides.map(s =>
                            s.id === slide.id ? { ...s, title: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, slides: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={slide.subtitle}
                        onChange={(e) => {
                          const updated = sectionData.slides.map(s =>
                            s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, slides: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={slide.description}
                        onChange={(e) => {
                          const updated = sectionData.slides.map(s =>
                            s.id === slide.id ? { ...s, description: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, slides: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={slide.image}
                        onChange={(e) => {
                          const updated = sectionData.slides.map(s =>
                            s.id === slide.id ? { ...s, image: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, slides: updated });
                        }}
                      />
                      {slide.image && (
                        <div className="relative w-full h-32 mt-2 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteSlide(slide.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Slide
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-4">{sectionData.sectionTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sectionData.slides.map((slide) => (
                  <div key={slide.id} className="border rounded-lg p-4">
                    <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-muted">
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold mb-2">{slide.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{slide.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{slide.description}</p>
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


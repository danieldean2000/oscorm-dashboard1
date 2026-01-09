"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Layers } from "lucide-react";

interface ProvenStep {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

interface ProvenDeliverySection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  steps: ProvenStep[];
}

export function ProvenDeliveryModel() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<ProvenDeliverySection>({
    title: "Our Proven Delivery Model",
    subtitle: "A streamlined 6-step process from consultation to deployment",
    ctaText: "Ready to streamline your operations with expert support?",
    ctaButtonLabel: "Book a Free Consultation",
    steps: [
      {
        id: "1",
        title: "Needs Analysis",
        description: "We begin by understanding your support needs, operational requirements, and service expectations. Whether you need customer support or data processing, everything starts with clarity.",
        image: "/images/services/admin-support/Model-1.png",
        order: 1,
      },
      {
        id: "2",
        title: "Scope Plan",
        description: "Our experts chart the support workflow, service deliverables, schedules, and skill sets needed. This ensures your admin support is designed for efficiency from the start.",
        image: "/images/services/admin-support/Model-2.png",
        order: 2,
      },
      {
        id: "3",
        title: "Solution Offer",
        description: "You receive a customized proposal with pricing options for support services or dedicated teams. We match you with the right specialists, tools, and engagement model.",
        image: "/images/services/admin-support/Model-3.png",
        order: 3,
      },
      {
        id: "4",
        title: "Team Onboarding",
        description: "Once approved, we onboard your dedicated support team with comprehensive training, processes, and integration with your existing systems and workflows.",
        image: "/images/services/admin-support/Model-4.png",
        order: 4,
      },
      {
        id: "5",
        title: "Performance Delivery",
        description: "Your support team delivers on schedule with real-time tracking, quality assurance checks, and regular communication. We ensure consistent excellence at every milestone.",
        image: "/images/services/admin-support/Model-5.png",
        order: 5,
      },
      {
        id: "6",
        title: "Continuous Optimization",
        description: "We monitor support performance analytics, gather feedback, and optimize processes continuously. Your success is our ongoing commitment with regular reviews and improvements.",
        image: "/images/services/admin-support/Model-6.png",
        order: 6,
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Proven section saved:", sectionData);
  };

  const handleAddStep = () => {
    const newStep = {
      id: Date.now().toString(),
      title: "New Step",
      description: "Step description",
      image: "/images/services/admin-support/Model-new.png",
      order: sectionData.steps.length + 1,
    };
    setSectionData({
      ...sectionData,
      steps: [...sectionData.steps, newStep],
    });
  };

  const handleDeleteStep = (id: string) => {
    setSectionData({
      ...sectionData,
      steps: sectionData.steps.filter(s => s.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <CardTitle>Proven Delivery Model</CardTitle>
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
                <Button onClick={handleAddStep} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
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
              <div className="space-y-4">
                {sectionData.steps.map((step) => (
                  <div key={step.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Step Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => {
                          const updated = sectionData.steps.map(s =>
                            s.id === step.id ? { ...s, title: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, steps: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={step.description}
                        onChange={(e) => {
                          const updated = sectionData.steps.map(s =>
                            s.id === step.id ? { ...s, description: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, steps: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={step.image}
                        onChange={(e) => {
                          const updated = sectionData.steps.map(s =>
                            s.id === step.id ? { ...s, image: e.target.value } : s
                          );
                          setSectionData({ ...sectionData, steps: updated });
                        }}
                      />
                      {step.image && (
                        <div className="relative w-full h-32 mt-2 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteStep(step.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Step
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-2">{sectionData.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {sectionData.steps.map((step) => (
                  <div key={step.id} className="border rounded-lg p-4">
                    <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-muted">
                      {step.image ? (
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
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


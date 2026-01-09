"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Sparkles } from "lucide-react";

interface ElevateFeature {
  id: string;
  icon: string;
  title: string;
}

interface ElevatesSection {
  title: string;
  centerImageSrc: string;
  centerImageAlt: string;
  leftFeatures: ElevateFeature[];
  rightFeatures: ElevateFeature[];
}

export function AIElevatesOutput() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<ElevatesSection>({
    title: "AI That Elevates Every Output",
    centerImageSrc: "/images/services/admin-support/Sytem.png",
    centerImageAlt: "AI Platform Interface",
    leftFeatures: [
      {
        id: "1",
        icon: "/images/services/admin-support/zero.png",
        title: "Auto Layout Optimization",
      },
      {
        id: "2",
        icon: "/images/services/admin-support/zero-2.png",
        title: "Accessibility Intelligence",
      },
      {
        id: "3",
        icon: "/images/services/admin-support/zero-3.png",
        title: "Design QA Automation",
      },
    ],
    rightFeatures: [
      {
        id: "4",
        icon: "/images/services/admin-support/zero-4.png",
        title: "Motion Storyboard Generation",
      },
      {
        id: "5",
        icon: "/images/services/admin-support/zero-5.png",
        title: "Asset Version Diffing",
      },
      {
        id: "6",
        icon: "/images/services/admin-support/zero-5.png",
        title: "Faster Review Cycles",
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Elevates section saved:", sectionData);
  };

  const handleAddLeftFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/zero-new.png",
      title: "New Feature",
    };
    setSectionData({
      ...sectionData,
      leftFeatures: [...sectionData.leftFeatures, newFeature],
    });
  };

  const handleAddRightFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/zero-new.png",
      title: "New Feature",
    };
    setSectionData({
      ...sectionData,
      rightFeatures: [...sectionData.rightFeatures, newFeature],
    });
  };

  const handleDeleteLeftFeature = (id: string) => {
    setSectionData({
      ...sectionData,
      leftFeatures: sectionData.leftFeatures.filter(f => f.id !== id),
    });
  };

  const handleDeleteRightFeature = (id: string) => {
    setSectionData({
      ...sectionData,
      rightFeatures: sectionData.rightFeatures.filter(f => f.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.0 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI That Elevates Every Output</CardTitle>
            </div>
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
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={sectionData.title}
                  onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Center Image URL</Label>
                  <Input
                    value={sectionData.centerImageSrc}
                    onChange={(e) => setSectionData({ ...sectionData, centerImageSrc: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Center Image Alt Text</Label>
                  <Input
                    value={sectionData.centerImageAlt}
                    onChange={(e) => setSectionData({ ...sectionData, centerImageAlt: e.target.value })}
                  />
                </div>
                {sectionData.centerImageSrc && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={sectionData.centerImageSrc}
                      alt={sectionData.centerImageAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Left Features</Label>
                    <Button onClick={handleAddLeftFeature} size="sm" variant="outline">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  {sectionData.leftFeatures.map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-3 space-y-2">
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const updated = sectionData.leftFeatures.map(f =>
                            f.id === feature.id ? { ...f, title: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, leftFeatures: updated });
                        }}
                      />
                      <div className="flex gap-2">
                        <Input
                          value={feature.icon}
                          onChange={(e) => {
                            const updated = sectionData.leftFeatures.map(f =>
                              f.id === feature.id ? { ...f, icon: e.target.value } : f
                            );
                            setSectionData({ ...sectionData, leftFeatures: updated });
                          }}
                          placeholder="Icon URL"
                        />
                        {feature.icon && (
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={feature.icon}
                              alt={feature.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <Button
                          onClick={() => handleDeleteLeftFeature(feature.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Right Features</Label>
                    <Button onClick={handleAddRightFeature} size="sm" variant="outline">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  {sectionData.rightFeatures.map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-3 space-y-2">
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const updated = sectionData.rightFeatures.map(f =>
                            f.id === feature.id ? { ...f, title: e.target.value } : f
                          );
                          setSectionData({ ...sectionData, rightFeatures: updated });
                        }}
                      />
                      <div className="flex gap-2">
                        <Input
                          value={feature.icon}
                          onChange={(e) => {
                            const updated = sectionData.rightFeatures.map(f =>
                              f.id === feature.id ? { ...f, icon: e.target.value } : f
                            );
                            setSectionData({ ...sectionData, rightFeatures: updated });
                          }}
                          placeholder="Icon URL"
                        />
                        {feature.icon && (
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={feature.icon}
                              alt={feature.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <Button
                          onClick={() => handleDeleteRightFeature(feature.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-4">{sectionData.title}</h3>
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-muted">
                {sectionData.centerImageSrc ? (
                  <Image
                    src={sectionData.centerImageSrc}
                    alt={sectionData.centerImageAlt}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Center Image
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {sectionData.leftFeatures.map((feature) => (
                    <div key={feature.id} className="border rounded p-3 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
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
                      <p className="font-semibold">{feature.title}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {sectionData.rightFeatures.map((feature) => (
                    <div key={feature.id} className="border rounded p-3 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
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
                      <p className="font-semibold">{feature.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


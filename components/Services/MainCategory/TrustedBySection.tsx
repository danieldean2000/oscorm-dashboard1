"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Building2 } from "lucide-react";

interface TrustedBySection {
  id: string;
  title: string;
  subtitle: string;
  logos: string[];
  isActive: boolean;
}

export function TrustedBySectionComponent() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<TrustedBySection>({
    id: "1",
    title: "Trusted by Industry Leaders",
    subtitle: "Join 500+ forward-thinking companies scaling with Oscorm",
    logos: [
      "/images/home/Industry/sec-0.png",
      "/images/home/Industry/sec-1.png",
      "/images/home/Industry/sec-2.png",
      "/images/home/Industry/sec-3.png",
      "/images/home/Industry/sec-4.png",
      "/images/home/Industry/sec-5.png",
      "/images/home/Industry/sec-6.png",
      "/images/home/Industry/sec-7.png",
    ],
    isActive: true,
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Trusted by section saved:", sectionData);
  };

  const handleAddLogo = () => {
    setSectionData({
      ...sectionData,
      logos: [...sectionData.logos, "/images/home/Industry/sec-new.png"],
    });
  };

  const handleRemoveLogo = (logoIndex: number) => {
    setSectionData({
      ...sectionData,
      logos: sectionData.logos.filter((_, i) => i !== logoIndex),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Trusted by Industry Leaders</CardTitle>
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
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={sectionData.subtitle}
                  onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Company Logos</Label>
                  <Button onClick={handleAddLogo} size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Logo
                  </Button>
                </div>
                <div className="space-y-2">
                  {sectionData.logos.map((logo, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={logo}
                        onChange={(e) => {
                          const updated = sectionData.logos.map((l, i) =>
                            i === idx ? e.target.value : l
                          );
                          setSectionData({ ...sectionData, logos: updated });
                        }}
                        placeholder="/images/home/Industry/sec-X.png"
                      />
                      <Button
                        onClick={() => handleRemoveLogo(idx)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{sectionData.title}</h3>
                <p className="text-muted-foreground mt-2">{sectionData.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {sectionData.logos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 bg-muted/50 flex items-center justify-center h-24"
                  >
                    <span className="text-xs text-muted-foreground truncate w-full text-center">
                      {logo}
                    </span>
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


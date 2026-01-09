"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Award } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface ToolsSection {
  title: string;
  certifications: Certification[];
}

export function ToolsTechnologies() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<ToolsSection>({
    title: "Tools & Technologies",
    certifications: [
      {
        id: "1",
        name: "SOC 2",
        image: "/images/services/admin-support/Tools-01.png",
        alt: "SOC 2 Type 2",
      },
      {
        id: "2",
        name: "ISO 27001",
        image: "/images/services/admin-support/Tools-02.png",
        alt: "ISO 27001",
      },
      {
        id: "3",
        name: "HIPAA",
        image: "/images/services/admin-support/Tools-03.png",
        alt: "HIPAA Compliance",
      },
      {
        id: "4",
        name: "CMMI",
        image: "/images/services/admin-support/Tools-04.png",
        alt: "CMMI Level",
      },
      {
        id: "5",
        name: "GDPR",
        image: "/images/services/admin-support/Tools-05.png",
        alt: "GDPR Certified",
      },
      {
        id: "6",
        name: "ISO 9001",
        image: "/images/services/admin-support/Tools-06.png",
        alt: "ISO 9001",
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Tools section saved:", sectionData);
  };

  const handleAddCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "New Certification",
      image: "/images/services/admin-support/Tools-new.png",
      alt: "New Certification",
    };
    setSectionData({
      ...sectionData,
      certifications: [...sectionData.certifications, newCert],
    });
  };

  const handleDeleteCertification = (id: string) => {
    setSectionData({
      ...sectionData,
      certifications: sectionData.certifications.filter(c => c.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.9 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Tools & Technologies</CardTitle>
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
                <Button onClick={handleAddCertification} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionData.certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Certification Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => {
                          const updated = sectionData.certifications.map(c =>
                            c.id === cert.id ? { ...c, name: e.target.value } : c
                          );
                          setSectionData({ ...sectionData, certifications: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={cert.image}
                        onChange={(e) => {
                          const updated = sectionData.certifications.map(c =>
                            c.id === cert.id ? { ...c, image: e.target.value } : c
                          );
                          setSectionData({ ...sectionData, certifications: updated });
                        }}
                      />
                      {cert.image && (
                        <div className="relative w-full h-24 mt-2 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={cert.image}
                            alt={cert.alt}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Alt Text</Label>
                      <Input
                        value={cert.alt}
                        onChange={(e) => {
                          const updated = sectionData.certifications.map(c =>
                            c.id === cert.id ? { ...c, alt: e.target.value } : c
                          );
                          setSectionData({ ...sectionData, certifications: updated });
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => handleDeleteCertification(cert.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-4">{sectionData.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sectionData.certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4 text-center">
                    <div className="relative w-full h-24 mb-3 rounded-md overflow-hidden bg-muted">
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.alt}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold">{cert.name}</p>
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


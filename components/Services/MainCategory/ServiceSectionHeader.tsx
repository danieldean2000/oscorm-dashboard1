"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, FileText } from "lucide-react";

interface ServiceSection {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export function ServiceSectionHeader() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<ServiceSection>({
    id: "1",
    title: "Our Services",
    description: "We offer a wide range of services to help your business grow and succeed in the digital world.",
    isActive: true,
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Service section saved:", sectionData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Service Section Header</CardTitle>
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
                <Label>Description</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={sectionData.description}
                  onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-2">{sectionData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


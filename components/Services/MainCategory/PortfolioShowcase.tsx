"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, FolderOpen } from "lucide-react";

interface PortfolioItem {
  id: string;
  brand: string;
  heading: string;
  title: string;
  image: string;
}

interface PortfolioSection {
  title: string;
  subtitle: string;
  items: PortfolioItem[];
}

export function PortfolioShowcase() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<PortfolioSection>({
    title: "A Glimpse of Our Excellence",
    subtitle: "Portfolio showcasing our support service achievements",
    items: [
      {
        id: "1",
        brand: "Customer Support",
        heading: "Enterprise Support Solution",
        title: "Complete customer support system for Series B funded company",
        image: "/images/services/admin-support/Engagement.png",
      },
      {
        id: "2",
        brand: "Data Processing",
        heading: "Data Management Platform",
        title: "Complete data processing system for Series B funded company",
        image: "/images/services/admin-support/Engagement2.png",
      },
      {
        id: "3",
        brand: "Executive Assistance",
        heading: "Executive Support Team",
        title: "Complete executive assistance system for Series B funded company",
        image: "/images/services/admin-support/Engagement3.png",
      },
      {
        id: "4",
        brand: "CRM & Back-Office",
        heading: "Back-Office Operations",
        title: "Complete CRM and back-office system for Series B funded company",
        image: "/images/services/admin-support/Engagement4.png",
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Portfolio section saved:", sectionData);
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      brand: "New Brand",
      heading: "New Heading",
      title: "New portfolio item title",
      image: "/images/services/admin-support/portfolio-new.png",
    };
    setSectionData({
      ...sectionData,
      items: [...sectionData.items, newItem],
    });
  };

  const handleDeleteItem = (id: string) => {
    setSectionData({
      ...sectionData,
      items: sectionData.items.filter(i => i.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.1 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              <CardTitle>Portfolio Showcase</CardTitle>
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
                <Button onClick={handleAddItem} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionData.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Brand</Label>
                      <Input
                        value={item.brand}
                        onChange={(e) => {
                          const updated = sectionData.items.map(i =>
                            i.id === item.id ? { ...i, brand: e.target.value } : i
                          );
                          setSectionData({ ...sectionData, items: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Heading</Label>
                      <Input
                        value={item.heading}
                        onChange={(e) => {
                          const updated = sectionData.items.map(i =>
                            i.id === item.id ? { ...i, heading: e.target.value } : i
                          );
                          setSectionData({ ...sectionData, items: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const updated = sectionData.items.map(i =>
                            i.id === item.id ? { ...i, title: e.target.value } : i
                          );
                          setSectionData({ ...sectionData, items: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={item.image}
                        onChange={(e) => {
                          const updated = sectionData.items.map(i =>
                            i.id === item.id ? { ...i, image: e.target.value } : i
                          );
                          setSectionData({ ...sectionData, items: updated });
                        }}
                      />
                      {item.image && (
                        <div className="relative w-full h-32 mt-2 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={item.image}
                            alt={item.heading}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Item
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-2">{sectionData.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {sectionData.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.heading}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                    <h4 className="font-semibold mb-2">{item.heading}</h4>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
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


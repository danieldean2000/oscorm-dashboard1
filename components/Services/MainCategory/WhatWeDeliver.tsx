"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Grid3x3 } from "lucide-react";

interface DeliverableService {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export function WhatWeDeliver() {
  const [editing, setEditing] = useState(false);
  const [services, setServices] = useState<DeliverableService[]>([
    {
      id: "1",
      title: "Customer Support Services",
      description: "Comprehensive customer support solutions to enhance customer satisfaction and build lasting relationships with your clients.",
      icon: "Headphones",
      isActive: true,
    },
    {
      id: "2",
      title: "Data Processing Services",
      description: "Efficient data processing and management services to organize, analyze, and transform your business data into actionable insights.",
      icon: "Database",
      isActive: true,
    },
    {
      id: "3",
      title: "Executive Assistance Services",
      description: "Professional executive assistance to help manage schedules, communications, and administrative tasks for leadership teams.",
      icon: "Briefcase",
      isActive: true,
    },
    {
      id: "4",
      title: "Research & Analysis Services",
      description: "In-depth research and analytical services to support data-driven decision making and strategic business planning.",
      icon: "Search",
      isActive: true,
    },
    {
      id: "5",
      title: "CRM & Back-Office Services",
      description: "Complete CRM management and back-office support to streamline operations and improve customer relationship management.",
      icon: "Users",
      isActive: true,
    },
    {
      id: "6",
      title: "Specialized Support Services",
      description: "Tailored specialized support services designed to meet unique business needs and industry-specific requirements.",
      icon: "Settings",
      isActive: true,
    },
  ]);

  const handleSave = () => {
    setEditing(false);
    console.log("Deliver services saved:", services);
  };

  const handleAddService = () => {
    const newService: DeliverableService = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      icon: "Settings",
      isActive: true,
    };
    setServices([...services, newService]);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    console.log("Service deleted:", id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5 text-primary" />
              <CardTitle>What We Deliver</CardTitle>
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
                <Button onClick={handleAddService} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                {editing ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => {
                          const updated = services.map(s =>
                            s.id === service.id ? { ...s, title: e.target.value } : s
                          );
                          setServices(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={service.description}
                        onChange={(e) => {
                          const updated = services.map(s =>
                            s.id === service.id ? { ...s, description: e.target.value } : s
                          );
                          setServices(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Icon Name</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => {
                          const updated = services.map(s =>
                            s.id === service.id ? { ...s, icon: e.target.value } : s
                          );
                          setServices(updated);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => handleDeleteService(service.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


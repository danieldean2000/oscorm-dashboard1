"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Save, Image as ImageIcon } from "lucide-react";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  link: string;
  order: number;
  isActive: boolean;
}

export function ServiceCards() {
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([
    {
      id: "1",
      title: "Web Development",
      description: "Custom web solutions tailored to your business",
      longDescription: "We create responsive, fast, and scalable web applications using the latest technologies. Our team specializes in React, Next.js, and modern web frameworks.",
      icon: "🌐",
      image: "/images/web-dev.jpg",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
      link: "/services/web-development",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      longDescription: "Build powerful mobile apps for iOS and Android. We use React Native and Flutter for cross-platform solutions or native development for platform-specific features.",
      icon: "📱",
      image: "/images/mobile-app.jpg",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization", "Push Notifications"],
      link: "/services/mobile-apps",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and services",
      longDescription: "Migrate to the cloud and scale effortlessly. We provide AWS, Azure, and Google Cloud solutions with 24/7 monitoring and support.",
      icon: "☁️",
      image: "/images/cloud.jpg",
      features: ["AWS/Azure/GCP", "Auto Scaling", "24/7 Monitoring", "Backup & Recovery"],
      link: "/services/cloud",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      title: "Digital Marketing",
      description: "Boost your online presence and reach",
      longDescription: "Comprehensive digital marketing strategies including SEO, SEM, social media marketing, and content creation to grow your brand.",
      icon: "📈",
      image: "/images/marketing.jpg",
      features: ["SEO/SEM", "Social Media", "Content Marketing", "Analytics"],
      link: "/services/marketing",
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
      longDescription: "Create stunning user experiences with our expert design team. We focus on user-centered design principles and modern aesthetics.",
      icon: "🎨",
      image: "/images/design.jpg",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      link: "/services/design",
      order: 5,
      isActive: true,
    },
    {
      id: "6",
      title: "Consulting Services",
      description: "Expert advice to transform your business",
      longDescription: "Get strategic guidance from industry experts. We help you make informed decisions about technology, processes, and business growth.",
      icon: "💼",
      image: "/images/consulting.jpg",
      features: ["Strategy Planning", "Technology Audit", "Process Optimization", "Training"],
      link: "/services/consulting",
      order: 6,
      isActive: true,   
    },
  ]);
  const [editingCard, setEditingCard] = useState<string | null>(null);

  const handleCardSave = (cardId: string) => {
    setEditingCard(null);
    console.log("Service card saved:", serviceCards.find(c => c.id === cardId));
  };

  const handleAddCard = () => {
    const newCard: ServiceCard = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      longDescription: "Detailed service description",
      icon: "⭐",
      image: "/images/service-default.jpg",
      features: ["Feature 1", "Feature 2"],
      link: "/services/new",
      order: serviceCards.length + 1,
      isActive: true,
    };
    setServiceCards([...serviceCards, newCard]);
  };

  const handleDeleteCard = (cardId: string) => {
    setServiceCards(serviceCards.filter(c => c.id !== cardId));
    console.log("Service card deleted:", cardId);
  };

  const handleAddFeature = (cardId: string) => {
    const updated = serviceCards.map(card =>
      card.id === cardId
        ? { ...card, features: [...card.features, "New Feature"] }
        : card
    );
    setServiceCards(updated);
  };

  const handleRemoveFeature = (cardId: string, featureIndex: number) => {
    const updated = serviceCards.map(card =>
      card.id === cardId
        ? { ...card, features: card.features.filter((_, i) => i !== featureIndex) }
        : card
    );
    setServiceCards(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle>Service Cards</CardTitle>
            </div>
            <Button onClick={handleAddCard} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Service Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <div key={card.id} className="border rounded-lg p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{card.icon}</span>
                    <Badge variant={card.isActive ? "default" : "secondary"}>
                      {card.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {editingCard === card.id ? (
                      <Button onClick={() => handleCardSave(card.id)} size="sm" variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => setEditingCard(card.id)} size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDeleteCard(card.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {editingCard === card.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Icon (Emoji)</Label>
                      <Input
                        value={card.icon}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, icon: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, title: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Short Description</Label>
                      <Input
                        value={card.description}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, description: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Long Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={card.longDescription}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, longDescription: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={card.image}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, image: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    {/* <div>
                      <Label>Price</Label>
                      <Input
                        value={card.price}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, price: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div> */}
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={card.link}
                        onChange={(e) => {
                          const updated = serviceCards.map(c =>
                            c.id === card.id ? { ...c, link: e.target.value } : c
                          );
                          setServiceCards(updated);
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Features</Label>
                        <Button
                          onClick={() => handleAddFeature(card.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => {
                                const updated = serviceCards.map(c =>
                                  c.id === card.id
                                    ? {
                                        ...c,
                                        features: c.features.map((f, i) =>
                                          i === idx ? e.target.value : f
                                        ),
                                      }
                                    : c
                                );
                                setServiceCards(updated);
                              }}
                            />
                            <Button
                              onClick={() => handleRemoveFeature(card.id, idx)}
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
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                    <div className="space-y-2 mb-3">
                      <p className="text-xs font-medium">Features:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {card.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground">Link: {card.link}</p>
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


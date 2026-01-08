"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Image as ImageIcon, 
  FileText, 
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  Star,
  MessageSquare
} from "lucide-react";

// Dummy Data Types
interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  isActive: boolean;
}

interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  order: number;
  isActive: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  profileImage: string;
  rating: number; // 1-5 stars
  order: number;
  isActive: boolean;
}

interface TestimonialSection {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function HomeManagePage() {
  // Hero Section State
  const [heroSection, setHeroSection] = useState<HeroSection>({
    id: "1",
    title: "Welcome to Our Platform",
    subtitle: "Innovative Solutions",
    description: "We provide cutting-edge solutions for your business needs. Experience the future of technology today.",
    buttonText: "Get Started",
    buttonLink: "/contact",
    backgroundImage: "/images/hero-bg.jpg",
    isActive: true,
  });

  // Slides State
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      title: "Slide 1 - Innovation",
      description: "Discover our innovative approach to solving complex problems",
      image: "/images/slide1.jpg",
      link: "/services",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "Slide 2 - Excellence",
      description: "Achieve excellence with our proven methodologies",
      image: "/images/slide2.jpg",
      link: "/about",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      title: "Slide 3 - Growth",
      description: "Grow your business with our comprehensive solutions",
      image: "/images/slide3.jpg",
      link: "/contact",
      order: 3,
      isActive: true,
    },
  ]);

  // Service Cards State
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([
    {
      id: "1",
      title: "Web Development",
      description: "Custom web solutions tailored to your business needs",
      icon: "🌐",
      link: "/services/web-development",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      icon: "📱",
      link: "/services/mobile-apps",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and services",
      icon: "☁️",
      link: "/services/cloud",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      title: "Consulting",
      description: "Expert advice to transform your business",
      icon: "💼",
      link: "/services/consulting",
      order: 4,
      isActive: true,
    },
  ]);

  // Testimonial Section Header
  const [testimonialSection, setTestimonialSection] = useState<TestimonialSection>({
    id: "1",
    title: "Trusted by Startups & Enterprises",
    description: "See what our clients say about working with Oscorm",
    isActive: true,
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Emily Watson",
      title: "Head of Engineering",
      company: "CloudBase",
      testimonial: "I was skeptical about AI-sourced talent, but Oscorm proved me wrong. The developers we hired are top-tier and seamlessly integrated into our workflow.",
      profileImage: "/images/testimonials/emily-watson.jpg",
      rating: 5,
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      name: "David Kim",
      title: "Founder",
      company: "StartUp X",
      testimonial: "Oscorm handles all the compliance and payroll headaches, letting me focus on building my product. It's a game-changer for international hiring.",
      profileImage: "/images/testimonials/david-kim.jpg",
      rating: 4,
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      name: "Jessica Lee",
      title: "VP of Operations",
      company: "NextGen",
      testimonial: "The platform is intuitive and the support is fantastic. We scale our team up and down with ease thanks to Oscorm's flexible model.",
      profileImage: "/images/testimonials/jessica-lee.jpg",
      rating: 5,
      order: 3,
      isActive: true,
    },
  ]);

  const [editingHero, setEditingHero] = useState(false);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editingTestimonialSection, setEditingTestimonialSection] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);

  const handleHeroSave = () => {
    // Save hero section logic here
    setEditingHero(false);
    console.log("Hero section saved:", heroSection);
  };

  const handleSlideSave = (slideId: string) => {
    setEditingSlide(null);
    console.log("Slide saved:", slides.find(s => s.id === slideId));
  };

  const handleCardSave = (cardId: string) => {
    setEditingCard(null);
    console.log("Card saved:", serviceCards.find(c => c.id === cardId));
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "New Slide",
      description: "Slide description",
      image: "/images/slide-default.jpg",
      link: "/",
      order: slides.length + 1,
      isActive: true,
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (slideId: string) => {
    setSlides(slides.filter(s => s.id !== slideId));
  };

  const handleAddCard = () => {
    const newCard: ServiceCard = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      icon: "⭐",
      link: "/services/new",
      order: serviceCards.length + 1,
      isActive: true,
    };
    setServiceCards([...serviceCards, newCard]);
  };

  const handleDeleteCard = (cardId: string) => {
    setServiceCards(serviceCards.filter(c => c.id !== cardId));
  };

  const handleTestimonialSectionSave = () => {
    setEditingTestimonialSection(false);
    console.log("Testimonial section saved:", testimonialSection);
  };

  const handleTestimonialSave = (testimonialId: string) => {
    setEditingTestimonial(null);
    console.log("Testimonial saved:", testimonials.find(t => t.id === testimonialId));
  };

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: "New Client",
      title: "Position",
      company: "Company Name",
      testimonial: "Testimonial text here...",
      profileImage: "/images/testimonials/default.jpg",
      rating: 5,
      order: testimonials.length + 1,
      isActive: true,
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleDeleteTestimonial = (testimonialId: string) => {
    setTestimonials(testimonials.filter(t => t.id !== testimonialId));
  };

  // Star rating component helper
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage hero section, slides, service cards, and testimonials for your home page
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <CardTitle>Hero Section</CardTitle>
                  </div>
                  {!editingHero ? (
                    <Button onClick={() => setEditingHero(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={handleHeroSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingHero ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={heroSection.title}
                        onChange={(e) => setHeroSection({ ...heroSection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={heroSection.subtitle}
                        onChange={(e) => setHeroSection({ ...heroSection, subtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                        value={heroSection.description}
                        onChange={(e) => setHeroSection({ ...heroSection, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Button Text</Label>
                        <Input
                          value={heroSection.buttonText}
                          onChange={(e) => setHeroSection({ ...heroSection, buttonText: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Button Link</Label>
                        <Input
                          value={heroSection.buttonLink}
                          onChange={(e) => setHeroSection({ ...heroSection, buttonLink: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Background Image URL</Label>
                      <Input
                        value={heroSection.backgroundImage}
                        onChange={(e) => setHeroSection({ ...heroSection, backgroundImage: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-semibold">{heroSection.title}</h3>
                      <p className="text-sm text-muted-foreground">{heroSection.subtitle}</p>
                      <p className="mt-2">{heroSection.description}</p>
                      <Button className="mt-4">{heroSection.buttonText}</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Slides Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle>Slides Management</CardTitle>
                  </div>
                  <Button onClick={handleAddSlide} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slides.map((slide, index) => (
                    <div key={slide.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Slide {index + 1}
                          </span>
                          <Badge variant={slide.isActive ? "default" : "secondary"}>
                            {slide.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {editingSlide === slide.id ? (
                            <Button onClick={() => handleSlideSave(slide.id)} size="sm">
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => setEditingSlide(slide.id)} variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteSlide(slide.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {editingSlide === slide.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={slide.title}
                              onChange={(e) => {
                                const updated = slides.map(s =>
                                  s.id === slide.id ? { ...s, title: e.target.value } : s
                                );
                                setSlides(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={slide.description}
                              onChange={(e) => {
                                const updated = slides.map(s =>
                                  s.id === slide.id ? { ...s, description: e.target.value } : s
                                );
                                setSlides(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={slide.image}
                              onChange={(e) => {
                                const updated = slides.map(s =>
                                  s.id === slide.id ? { ...s, image: e.target.value } : s
                                );
                                setSlides(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Link</Label>
                            <Input
                              value={slide.link}
                              onChange={(e) => {
                                const updated = slides.map(s =>
                                  s.id === slide.id ? { ...s, link: e.target.value } : s
                                );
                                setSlides(updated);
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold">{slide.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{slide.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Image: {slide.image}</p>
                          <p className="text-xs text-muted-foreground">Link: {slide.link}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <CardTitle>Service Cards Management</CardTitle>
                  </div>
                  <Button onClick={handleAddCard} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceCards.map((card) => (
                    <div key={card.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{card.icon}</span>
                          <Badge variant={card.isActive ? "default" : "secondary"}>
                            {card.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {editingCard === card.id ? (
                            <Button onClick={() => handleCardSave(card.id)} size="sm">
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => setEditingCard(card.id)} variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteCard(card.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
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
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
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
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold">{card.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Link: {card.link}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle>Testimonials Section</CardTitle>
                  </div>
                  {!editingTestimonialSection ? (
                    <Button onClick={() => setEditingTestimonialSection(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Header
                    </Button>
                  ) : (
                    <Button onClick={handleTestimonialSectionSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingTestimonialSection ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={testimonialSection.title}
                        onChange={(e) => setTestimonialSection({ ...testimonialSection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Section Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={testimonialSection.description}
                        onChange={(e) => setTestimonialSection({ ...testimonialSection, description: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold">{testimonialSection.title}</h3>
                    <p className="text-muted-foreground mt-1">{testimonialSection.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonials List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle>Testimonials</CardTitle>
                    <Badge variant="secondary">{testimonials.length} Testimonials</Badge>
                  </div>
                  <Button onClick={handleAddTestimonial} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {testimonial.profileImage ? (
                              <img
                                src={testimonial.profileImage}
                                alt={testimonial.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-lg font-semibold">
                                {testimonial.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                            {testimonial.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {editingTestimonial === testimonial.id ? (
                            <Button onClick={() => handleTestimonialSave(testimonial.id)} size="sm" variant="outline">
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => setEditingTestimonial(testimonial.id)} size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {editingTestimonial === testimonial.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Profile Image URL</Label>
                            <Input
                              value={testimonial.profileImage}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, profileImage: e.target.value } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, name: e.target.value } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={testimonial.title}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, title: e.target.value } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={testimonial.company}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, company: e.target.value } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Testimonial</Label>
                            <textarea
                              className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                              value={testimonial.testimonial}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, testimonial: e.target.value } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Rating (1-5 stars)</Label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={testimonial.rating}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, rating: parseInt(e.target.value) || 5 } : t
                                );
                                setTestimonials(updated);
                              }}
                            />
                            <div className="flex gap-1 mt-2">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`active-${testimonial.id}`}
                              checked={testimonial.isActive}
                              onChange={(e) => {
                                const updated = testimonials.map(t =>
                                  t.id === testimonial.id ? { ...t, isActive: e.target.checked } : t
                                );
                                setTestimonials(updated);
                              }}
                              className="rounded"
                            />
                            <Label htmlFor={`active-${testimonial.id}`} className="cursor-pointer">
                              Active (visible on website)
                            </Label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title}, {testimonial.company}
                            </p>
                            <div className="flex gap-1 mt-2">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            "{testimonial.testimonial}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {testimonials.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No testimonials added yet. Click "Add Testimonial" to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Edit, 
  Save,
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2
} from "lucide-react";

// Dummy Data Types
interface HireUsSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
}

interface ContactInfo {
  id: string;
  type: "email" | "phone" | "address" | "hours";
  label: string;
  value: string;
  isActive: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder: string;
  required: boolean;
  options?: string[];
  order: number;
  isActive: boolean;
}

interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function HireUsManagePage() {
  // Hire Us Section Header
  const [hireUsSection, setHireUsSection] = useState<HireUsSection>({
    id: "1",
    title: "Hire Us",
    subtitle: "Let's Work Together",
    description: "Get in touch with us to discuss your project and see how we can help bring your vision to life.",
    isActive: true,
  });

  // Contact Information
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([
    {
      id: "1",
      type: "email",
      label: "Email",
      value: "contact@example.com",
      isActive: true,
    },
    {
      id: "2",
      type: "phone",
      label: "Phone",
      value: "+1 (555) 123-4567",
      isActive: true,
    },
    {
      id: "3",
      type: "address",
      label: "Address",
      value: "123 Business Street, City, State 12345",
      isActive: true,
    },
    {
      id: "4",
      type: "hours",
      label: "Business Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM",
      isActive: true,
    },
  ]);

  // Form Fields
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "1",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
      required: false,
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      label: "Project Type",
      type: "select",
      placeholder: "Select project type",
      required: true,
      options: ["Web Development", "Mobile App", "Design", "Consulting", "Other"],
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us about your project",
      required: true,
      order: 5,
      isActive: true,
    },
  ]);

  // Why Choose Us
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([
    {
      id: "1",
      title: "Expert Team",
      description: "Our team consists of experienced professionals with years of industry expertise",
      icon: "👥",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "Quality Assurance",
      description: "We ensure the highest quality standards in every project we deliver",
      icon: "✅",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      title: "Timely Delivery",
      description: "We respect deadlines and deliver projects on time, every time",
      icon: "⏰",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      title: "24/7 Support",
      description: "Round-the-clock support to assist you whenever you need help",
      icon: "🔄",
      order: 4,
      isActive: true,
    },
  ]);

  const [editingSection, setEditingSection] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingWhy, setEditingWhy] = useState<string | null>(null);

  const handleSectionSave = () => {
    setEditingSection(false);
    console.log("Hire us section saved:", hireUsSection);
  };

  const handleContactSave = (contactId: string) => {
    setEditingContact(null);
    console.log("Contact info saved:", contactInfo.find(c => c.id === contactId));
  };

  const handleFieldSave = (fieldId: string) => {
    setEditingField(null);
    console.log("Form field saved:", formFields.find(f => f.id === fieldId));
  };

  const handleWhySave = (whyId: string) => {
    setEditingWhy(null);
    console.log("Why choose us saved:", whyChooseUs.find(w => w.id === whyId));
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "address":
        return <MapPin className="h-4 w-4" />;
      case "hours":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
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
              <UserPlus className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Hire Us Page Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage hire us page content, contact information, form fields, and why choose us section
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hire Us Section Header */}
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
                    <CardTitle>Page Header Section</CardTitle>
                  </div>
                  {!editingSection ? (
                    <Button onClick={() => setEditingSection(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={handleSectionSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingSection ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={hireUsSection.title}
                        onChange={(e) => setHireUsSection({ ...hireUsSection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={hireUsSection.subtitle}
                        onChange={(e) => setHireUsSection({ ...hireUsSection, subtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                        value={hireUsSection.description}
                        onChange={(e) => setHireUsSection({ ...hireUsSection, description: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">{hireUsSection.title}</h3>
                    <p className="text-lg text-muted-foreground mt-1">{hireUsSection.subtitle}</p>
                    <p className="text-muted-foreground mt-2">{hireUsSection.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <CardTitle>Contact Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactInfo.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getContactIcon(contact.type)}
                          <span className="font-medium">{contact.label}</span>
                          <Badge variant={contact.isActive ? "default" : "secondary"}>
                            {contact.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        {editingContact === contact.id ? (
                          <Button onClick={() => handleContactSave(contact.id)} size="sm" variant="outline">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setEditingContact(contact.id)} size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {editingContact === contact.id ? (
                        <div className="space-y-2">
                          <div>
                            <Label>Value</Label>
                            <Input
                              value={contact.value}
                              onChange={(e) => {
                                const updated = contactInfo.map(c =>
                                  c.id === contact.id ? { ...c, value: e.target.value } : c
                                );
                                setContactInfo(updated);
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">{contact.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Contact Form Fields</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formFields.map((field) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{field.label}</span>
                          <Badge variant={field.isActive ? "default" : "secondary"}>
                            {field.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {field.required && (
                            <Badge variant="outline">Required</Badge>
                          )}
                        </div>
                        {editingField === field.id ? (
                          <Button onClick={() => handleFieldSave(field.id)} size="sm" variant="outline">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setEditingField(field.id)} size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {editingField === field.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Label</Label>
                            <Input
                              value={field.label}
                              onChange={(e) => {
                                const updated = formFields.map(f =>
                                  f.id === field.id ? { ...f, label: e.target.value } : f
                                );
                                setFormFields(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Placeholder</Label>
                            <Input
                              value={field.placeholder}
                              onChange={(e) => {
                                const updated = formFields.map(f =>
                                  f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                );
                                setFormFields(updated);
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => {
                                const updated = formFields.map(f =>
                                  f.id === field.id ? { ...f, required: e.target.checked } : f
                                );
                                setFormFields(updated);
                              }}
                            />
                            <Label>Required Field</Label>
                          </div>
                          {field.type === "select" && field.options && (
                            <div>
                              <Label>Options (comma separated)</Label>
                              <Input
                                value={field.options.join(", ")}
                                onChange={(e) => {
                                  const updated = formFields.map(f =>
                                    f.id === field.id
                                      ? { ...f, options: e.target.value.split(", ") }
                                      : f
                                  );
                                  setFormFields(updated);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Type: <span className="font-medium">{field.type}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Placeholder: {field.placeholder}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <CardTitle>Why Choose Us</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyChooseUs.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <Badge variant={item.isActive ? "default" : "secondary"}>
                            {item.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        {editingWhy === item.id ? (
                          <Button onClick={() => handleWhySave(item.id)} size="sm" variant="outline">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setEditingWhy(item.id)} size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {editingWhy === item.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Icon (Emoji)</Label>
                            <Input
                              value={item.icon}
                              onChange={(e) => {
                                const updated = whyChooseUs.map(w =>
                                  w.id === item.id ? { ...w, icon: e.target.value } : w
                                );
                                setWhyChooseUs(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => {
                                const updated = whyChooseUs.map(w =>
                                  w.id === item.id ? { ...w, title: e.target.value } : w
                                );
                                setWhyChooseUs(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={item.description}
                              onChange={(e) => {
                                const updated = whyChooseUs.map(w =>
                                  w.id === item.id ? { ...w, description: e.target.value } : w
                                );
                                setWhyChooseUs(updated);
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


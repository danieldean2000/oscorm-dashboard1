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
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  FileText,
  Tag
} from "lucide-react";

// FAQ Data Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
}

interface FAQSection {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export default function FAQManagePage() {
  // FAQ Section Header
  const [faqSection, setFaqSection] = useState<FAQSection>({
    id: "1",
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our services, processes, and policies.",
    isActive: true,
  });

  // FAQs State - Sample FAQs for different categories
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How quickly can I deploy a team?",
      answer: "Oscorm offers rapid 48-hour deployment for most services. Our Development & Tech Services can be set up in as little as 24 hours. We ensure all tools, access, and KPIs are configured within two business days.",
      category: "Home / General",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      question: "What makes Oscorm different from other platforms?",
      answer: "Oscorm combines pre-vetted talent with AI-powered oversight. We provide real-time performance dashboards, automated quality assurance, and complete project visibility. Our managed talent approach includes dedicated project management and up to 40% cost savings.",
      category: "Home / General",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      question: "How are experts vetted and matched?",
      answer: "All experts go through a rigorous vetting process including technical assessments, portfolio reviews, and background checks. Our AI-powered matching system analyzes your specific needs and matches you with the most suitable experts based on skills, experience, and project requirements.",
      category: "Hire Experts",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      question: "What's included in the AI oversight?",
      answer: "Our AI oversight includes real-time performance dashboards, automated time tracking with AI verification, intelligent task management with workflow optimization, predictive analytics for performance forecasting, and proactive issue detection. This ensures complete transparency and quality assurance.",
      category: "How it Works",
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      question: "Can I scale or change my team as needed?",
      answer: "Yes, absolutely! Oscorm's flexible model allows you to scale your team up or down based on your needs. You can add or remove team members, adjust project scope, and modify requirements with ease. Our dedicated project manager will help coordinate any changes.",
      category: "How it Works",
      order: 5,
      isActive: true,
    },
    {
      id: "6",
      question: "What services do you offer?",
      answer: "Oscorm offers a comprehensive range of services including AI & Innovation (250+ experts), Marketing Services (180+ experts), Engineering Services (320+ experts), Content Services, Legal Services, Admin Support, Development & Tech (400+ experts, 24-hour setup), Creative Design, Talent Development, Ecommerce Operations, and Finance & Accounting. All services come with 48-hour deployment, AI-powered oversight, and dedicated project management.",
      category: "Services",
      order: 6,
      isActive: true,
    },
    {
      id: "9",
      question: "What is your pricing model?",
      answer: "Oscorm offers transparent pricing with up to 40% savings compared to traditional hiring. We provide flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. All plans include a dedicated project manager, AI oversight dashboard, and 30-day satisfaction guarantee.",
      category: "Pricing",
      order: 9,
      isActive: true,
    },
    {
      id: "10",
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive ongoing support and maintenance packages. This includes bug fixes, updates, security patches, technical assistance, and performance monitoring. Our support team is available to ensure your project continues to run smoothly after deployment.",
      category: "Resources",
      order: 10,
      isActive: true,
    },
  ]);

  // FAQ Categories State - Based on Oscorm Website Pages
  const [categories, setCategories] = useState<FAQCategory[]>([
    {
      id: "1",
      name: "Home / General",
      description: "General questions about Oscorm",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      name: "Services",
      description: "Questions about our services",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      name: "Pricing",
      description: "Questions about pricing and payment plans",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      name: "How it Works",
      description: "Questions about how Oscorm works",
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      name: "Hire Experts",
      description: "Questions about hiring experts",
      order: 5,
      isActive: true,
    },
    {
      id: "6",
      name: "Resources",
      description: "Questions about resources and support",
      order: 6,
      isActive: true,
    },
  ]);

  const [editingSection, setEditingSection] = useState(false);
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const handleSectionSave = () => {
    setEditingSection(false);
    console.log("FAQ section saved:", faqSection);
  };

  const handleFaqSave = (faqId: string) => {
    setEditingFaq(null);
    console.log("FAQ saved:", faqs.find(f => f.id === faqId));
  };

  const handleAddFaq = () => {
    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: "New Question?",
      answer: "New Answer",
      category: "General",
      order: faqs.length + 1,
      isActive: true,
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleDeleteFaq = (faqId: string) => {
    setFaqs(faqs.filter(f => f.id !== faqId));
  };

  const handleCategorySave = (categoryId: string) => {
    setEditingCategory(null);
    console.log("Category saved:", categories.find(c => c.id === categoryId));
  };

  const handleAddCategory = () => {
    const newCategory: FAQCategory = {
      id: Date.now().toString(),
      name: "New Category",
      description: "",
      order: categories.length + 1,
      isActive: true,
    };
    setCategories([...categories, newCategory]);
    setEditingCategory(newCategory.id);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // Remove category from FAQs that use it
    const updatedFaqs = faqs.map(faq => 
      faq.category && categories.find(c => c.id === categoryId)?.name === faq.category
        ? { ...faq, category: undefined }
        : faq
    );
    setFaqs(updatedFaqs);
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  // Get active categories
  const activeCategories = categories.filter(c => c.isActive);

  // Filter FAQs by selected category
  const filteredFaqs = selectedCategoryFilter === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategoryFilter);

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
              <HelpCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">FAQ Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage frequently asked questions and answers for different pages of your website. Each category represents a specific page (Home, Services, Pricing, etc.)
                </p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section Header */}
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
                    <CardTitle>FAQ Section Header</CardTitle>
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
                        value={faqSection.title}
                        onChange={(e) => setFaqSection({ ...faqSection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                        value={faqSection.description}
                        onChange={(e) => setFaqSection({ ...faqSection, description: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">{faqSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{faqSection.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQs List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <CardTitle>FAQs</CardTitle>
                    <Badge variant="secondary">{filteredFaqs.length} Questions</Badge>
                  </div>
                  <Button onClick={handleAddFaq} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="mb-6">
                  <Label className="mb-2 block">Filter by Category / Page</Label>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="w-full md:w-64 px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Categories ({faqs.length})</option>
                    {activeCategories.map((cat) => {
                      const count = faqs.filter(f => f.category === cat.name).length;
                      return (
                        <option key={cat.id} value={cat.name}>
                          {cat.name} ({count})
                        </option>
                      );
                    })}
                    <option value="">Uncategorized ({faqs.filter(f => !f.category).length})</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={faq.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 flex-1 flex-wrap">
                          <span className="text-sm font-medium text-muted-foreground">
                            #{filteredFaqs.findIndex(f => f.id === faq.id) + 1}
                          </span>
                          {faq.category ? (
                            <Badge variant="default" className="text-xs font-semibold">
                              {faq.category}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Uncategorized
                            </Badge>
                          )}
                          <Badge variant={faq.isActive ? "default" : "secondary"}>
                            {faq.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {editingFaq === faq.id ? (
                            <Button onClick={() => handleFaqSave(faq.id)} size="sm" variant="outline">
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => setEditingFaq(faq.id)} size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteFaq(faq.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {editingFaq === faq.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label>Question</Label>
                            <Input
                              value={faq.question}
                              onChange={(e) => {
                                const updated = faqs.map(f =>
                                  f.id === faq.id ? { ...f, question: e.target.value } : f
                                );
                                setFaqs(updated);
                              }}
                              placeholder="Enter your question"
                            />
                          </div>
                          <div>
                            <Label>Answer</Label>
                            <textarea
                              className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                              value={faq.answer}
                              onChange={(e) => {
                                const updated = faqs.map(f =>
                                  f.id === faq.id ? { ...f, answer: e.target.value } : f
                                );
                                setFaqs(updated);
                              }}
                              placeholder="Enter the answer"
                            />
                          </div>
                          <div>
                            <Label>Category / Page (Required)</Label>
                            <select
                              value={faq.category || ""}
                              onChange={(e) => {
                                const updated = faqs.map(f =>
                                  f.id === faq.id ? { ...f, category: e.target.value || undefined } : f
                                );
                                setFaqs(updated);
                              }}
                              className="w-full px-3 py-2 border rounded-md bg-background"
                            >
                              <option value="">Select Category / Page</option>
                              {activeCategories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs text-muted-foreground mt-1">
                              Select the page/category where this FAQ will appear. Categories represent different pages of your website.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`active-${faq.id}`}
                              checked={faq.isActive}
                              onChange={(e) => {
                                const updated = faqs.map(f =>
                                  f.id === faq.id ? { ...f, isActive: e.target.checked } : f
                                );
                                setFaqs(updated);
                              }}
                              className="rounded"
                            />
                            <Label htmlFor={`active-${faq.id}`} className="cursor-pointer">
                              Active (visible on website)
                            </Label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {selectedCategoryFilter === "all" 
                        ? "No FAQs added yet. Click 'Add FAQ' to get started."
                        : `No FAQs found in this category. Click 'Add FAQ' to add one.`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <CardTitle>FAQ Categories / Pages</CardTitle>
                    <Badge variant="secondary">{categories.length} Categories</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowCategoryManager(!showCategoryManager)}
                      variant="outline"
                      size="sm"
                    >
                      {showCategoryManager ? "Hide" : "Manage"}
                    </Button>
                    {showCategoryManager && (
                      <Button onClick={handleAddCategory} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              {showCategoryManager && (
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const faqCount = faqs.filter(f => f.category === category.name).length;
                      return (
                        <div key={category.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 flex-1">
                              <Badge variant={category.isActive ? "default" : "secondary"}>
                                {category.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Badge variant="outline">
                                {faqCount} FAQ{faqCount !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              {editingCategory === category.id ? (
                                <Button
                                  onClick={() => handleCategorySave(category.id)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => setEditingCategory(category.id)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                onClick={() => handleDeleteCategory(category.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {editingCategory === category.id ? (
                            <div className="space-y-3">
                              <div>
                                <Label>Category Name</Label>
                                <Input
                                  value={category.name}
                                  onChange={(e) => {
                                    const oldName = category.name;
                                    const updated = categories.map(c =>
                                      c.id === category.id ? { ...c, name: e.target.value } : c
                                    );
                                    setCategories(updated);
                                    // Update FAQs that use this category
                                    const updatedFaqs = faqs.map(faq =>
                                      faq.category === oldName
                                        ? { ...faq, category: e.target.value }
                                        : faq
                                    );
                                    setFaqs(updatedFaqs);
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Description (Optional)</Label>
                                <Input
                                  value={category.description || ""}
                                  onChange={(e) => {
                                    const updated = categories.map(c =>
                                      c.id === category.id ? { ...c, description: e.target.value } : c
                                    );
                                    setCategories(updated);
                                  }}
                                  placeholder="Category description"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={category.isActive}
                                  onChange={(e) => {
                                    const updated = categories.map(c =>
                                      c.id === category.id ? { ...c, isActive: e.target.checked } : c
                                    );
                                    setCategories(updated);
                                  }}
                                  className="rounded"
                                />
                                <Label className="cursor-pointer">Active</Label>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-semibold text-lg">{category.name}</h4>
                              {category.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                This category represents FAQs for the "{category.name}" page/section
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
              {!showCategoryManager && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {activeCategories.map((category) => {
                      const count = faqs.filter(f => f.category === category.name).length;
                      return (
                        <Badge key={category.id} variant="secondary" className="text-sm">
                          {category.name} ({count})
                        </Badge>
                      );
                    })}
                    {activeCategories.length === 0 && (
                      <p className="text-sm text-muted-foreground">No categories yet</p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


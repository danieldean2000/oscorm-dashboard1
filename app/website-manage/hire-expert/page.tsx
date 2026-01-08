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
  Plus, 
  Trash2, 
  Edit, 
  Save,
  Layers,
  ChevronDown,
  ChevronRight
} from "lucide-react";

// Data Types
interface HireExpert {
  id: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface HireExpertMainCategory {
  id: string;
  hireExpertId: string;
  name: string;
  slug: string;
  icon: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface HireExpertCategory {
  id: string;
  mainCategoryId: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface HireExpertSubCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  features: string[];
  pricing: {
    startingFrom: number;
    billing: string;
  };
  status: "active" | "inactive";
}

export default function HireExpertManagePage() {
  // Hire Expert Services State
  const [hireExperts, setHireExperts] = useState<HireExpert[]>([
    {
      id: "1",
      name: "AI & Innovation Experts",
      slug: "ai-innovation",
      heroTitle: "Hire AI & Innovation Experts",
      heroDescription: "Pre-vetted AI specialists ready to transform your business",
      components: [
        { type: "hero", title: "AI & Innovation Experts" },
        { type: "overview", content: "250+ Experts available" },
      ],
      status: "active",
    },
  ]);

  // Main Categories State
  const [mainCategories, setMainCategories] = useState<HireExpertMainCategory[]>([
    {
      id: "1",
      hireExpertId: "1",
      name: "Machine Learning Engineers",
      slug: "machine-learning-engineers",
      icon: "brain",
      heroTitle: "Hire Machine Learning Engineers",
      heroDescription: "Expert ML engineers for your AI projects",
      components: [
        { type: "cards", title: "Why Hire ML Engineers" },
      ],
      status: "active",
    },
  ]);

  // Categories State
  const [categories, setCategories] = useState<HireExpertCategory[]>([
    {
      id: "1",
      mainCategoryId: "1",
      name: "Deep Learning Specialists",
      slug: "deep-learning-specialists",
      heroTitle: "Deep Learning Specialists",
      heroDescription: "Experts in neural networks and deep learning",
      components: [
        { type: "features", items: ["TensorFlow", "PyTorch", "Keras"] },
      ],
      status: "active",
    },
  ]);

  // Sub Categories State
  const [subCategories, setSubCategories] = useState<HireExpertSubCategory[]>([
    {
      id: "1",
      categoryId: "1",
      name: "Computer Vision Experts",
      slug: "computer-vision-experts",
      heroTitle: "Computer Vision Experts",
      heroDescription: "Specialists in image and video processing",
      features: [
        "Image Recognition",
        "Object Detection",
        "Video Analysis",
      ],
      pricing: {
        startingFrom: 75,
        billing: "hourly",
      },
      status: "active",
    },
  ]);

  // UI State
  const [editingHireExpert, setEditingHireExpert] = useState<string | null>(null);
  const [editingMainCategory, setEditingMainCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<string | null>(null);
  const [expandedHireExperts, setExpandedHireExperts] = useState<Set<string>>(new Set(["1"]));
  const [expandedMainCategories, setExpandedMainCategories] = useState<Set<string>>(new Set(["1"]));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["1"]));

  // Helper Functions
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Hire Expert Handlers
  const handleAddHireExpert = () => {
    const newHireExpert: HireExpert = {
      id: Date.now().toString(),
      name: "New Expert Category",
      slug: "new-expert-category",
      heroTitle: "New Expert Category Title",
      heroDescription: "Expert category description",
      components: [],
      status: "active",
    };
    setHireExperts([...hireExperts, newHireExpert]);
    setEditingHireExpert(newHireExpert.id);
  };

  const handleSaveHireExpert = (hireExpertId: string) => {
    setEditingHireExpert(null);
    console.log("Hire expert saved:", hireExperts.find(he => he.id === hireExpertId));
  };

  const handleDeleteHireExpert = (hireExpertId: string) => {
    setHireExperts(hireExperts.filter(he => he.id !== hireExpertId));
    setMainCategories(mainCategories.filter(mc => mc.hireExpertId !== hireExpertId));
  };

  // Main Category Handlers
  const handleAddMainCategory = (hireExpertId: string) => {
    const newMainCategory: HireExpertMainCategory = {
      id: Date.now().toString(),
      hireExpertId,
      name: "New Main Category",
      slug: "new-main-category",
      icon: "folder",
      heroTitle: "New Main Category Title",
      heroDescription: "Main category description",
      components: [],
      status: "active",
    };
    setMainCategories([...mainCategories, newMainCategory]);
    setEditingMainCategory(newMainCategory.id);
  };

  const handleSaveMainCategory = (mainCategoryId: string) => {
    setEditingMainCategory(null);
    console.log("Main category saved:", mainCategories.find(mc => mc.id === mainCategoryId));
  };

  const handleDeleteMainCategory = (mainCategoryId: string) => {
    setMainCategories(mainCategories.filter(mc => mc.id !== mainCategoryId));
    setCategories(categories.filter(c => c.mainCategoryId !== mainCategoryId));
  };

  // Category Handlers
  const handleAddCategory = (mainCategoryId: string) => {
    const newCategory: HireExpertCategory = {
      id: Date.now().toString(),
      mainCategoryId,
      name: "New Category",
      slug: "new-category",
      heroTitle: "New Category Title",
      heroDescription: "Category description",
      components: [],
      status: "active",
    };
    setCategories([...categories, newCategory]);
    setEditingCategory(newCategory.id);
  };

  const handleSaveCategory = (categoryId: string) => {
    setEditingCategory(null);
    console.log("Category saved:", categories.find(c => c.id === categoryId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
    setSubCategories(subCategories.filter(sc => sc.categoryId !== categoryId));
  };

  // Sub Category Handlers
  const handleAddSubCategory = (categoryId: string) => {
    const newSubCategory: HireExpertSubCategory = {
      id: Date.now().toString(),
      categoryId,
      name: "New Sub Category",
      slug: "new-sub-category",
      heroTitle: "New Sub Category Title",
      heroDescription: "Sub category description",
      features: [],
      pricing: {
        startingFrom: 0,
        billing: "hourly",
      },
      status: "active",
    };
    setSubCategories([...subCategories, newSubCategory]);
    setEditingSubCategory(newSubCategory.id);
  };

  const handleSaveSubCategory = (subCategoryId: string) => {
    setEditingSubCategory(null);
    console.log("Sub category saved:", subCategories.find(sc => sc.id === subCategoryId));
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    setSubCategories(subCategories.filter(sc => sc.id !== subCategoryId));
  };

  const handleAddFeature = (subCategoryId: string) => {
    const updated = subCategories.map(sc =>
      sc.id === subCategoryId
        ? { ...sc, features: [...sc.features, "New Feature"] }
        : sc
    );
    setSubCategories(updated);
  };

  const handleRemoveFeature = (subCategoryId: string, featureIndex: number) => {
    const updated = subCategories.map(sc =>
      sc.id === subCategoryId
        ? { ...sc, features: sc.features.filter((_, i) => i !== featureIndex) }
        : sc
    );
    setSubCategories(updated);
  };

  const toggleHireExpert = (hireExpertId: string) => {
    const newSet = new Set(expandedHireExperts);
    if (newSet.has(hireExpertId)) {
      newSet.delete(hireExpertId);
    } else {
      newSet.add(hireExpertId);
    }
    setExpandedHireExperts(newSet);
  };

  const toggleMainCategory = (mainCategoryId: string) => {
    const newSet = new Set(expandedMainCategories);
    if (newSet.has(mainCategoryId)) {
      newSet.delete(mainCategoryId);
    } else {
      newSet.add(mainCategoryId);
    }
    setExpandedMainCategories(newSet);
  };

  const toggleCategory = (categoryId: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    setExpandedCategories(newSet);
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserPlus className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Hire Expert Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage hire expert categories with hierarchical structure (Experts → Main Categories → Categories → Sub Categories)
                  </p>
                </div>
              </div>
              <Button onClick={handleAddHireExpert} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Expert Category
              </Button>
            </div>
          </motion.div>

          {/* Hire Expert Categories List */}
          <div className="space-y-4">
            {hireExperts.map((hireExpert) => {
              const hireExpertMainCategories = mainCategories.filter(mc => mc.hireExpertId === hireExpert.id);
              const isExpanded = expandedHireExperts.has(hireExpert.id);

              return (
                <Card key={hireExpert.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleHireExpert(hireExpert.id)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <UserPlus className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          {editingHireExpert === hireExpert.id ? (
                            <div className="space-y-2">
                              <Input
                                value={hireExpert.name}
                                onChange={(e) => {
                                  const updated = hireExperts.map(he =>
                                    he.id === hireExpert.id
                                      ? { ...he, name: e.target.value, slug: generateSlug(e.target.value) }
                                      : he
                                  );
                                  setHireExperts(updated);
                                }}
                                placeholder="Expert Category Name"
                                className="font-semibold"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={hireExpert.slug}
                                  onChange={(e) => {
                                    const updated = hireExperts.map(he =>
                                      he.id === hireExpert.id ? { ...he, slug: e.target.value } : he
                                    );
                                    setHireExperts(updated);
                                  }}
                                  placeholder="slug-url"
                                  className="text-sm"
                                />
                                <Badge variant="outline" className="text-xs">
                                  /hire-expert/{hireExpert.slug}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CardTitle className="text-lg">{hireExpert.name}</CardTitle>
                              <p className="text-xs text-muted-foreground mt-1">
                                Slug: /hire-expert/{hireExpert.slug}
                              </p>
                            </div>
                          )}
                        </div>
                        <Badge variant={hireExpert.status === "active" ? "default" : "secondary"}>
                          {hireExpert.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {editingHireExpert === hireExpert.id ? (
                          <Button onClick={() => handleSaveHireExpert(hireExpert.id)} size="sm">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setEditingHireExpert(hireExpert.id)} size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button onClick={() => handleDeleteHireExpert(hireExpert.id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="space-y-4 pt-4">
                      {/* Hire Expert Details */}
                      {editingHireExpert === hireExpert.id ? (
                        <div className="space-y-4 p-4 border rounded-lg">
                          <div>
                            <Label>Hero Title</Label>
                            <Input
                              value={hireExpert.heroTitle}
                              onChange={(e) => {
                                const updated = hireExperts.map(he =>
                                  he.id === hireExpert.id ? { ...he, heroTitle: e.target.value } : he
                                );
                                setHireExperts(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Hero Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={hireExpert.heroDescription}
                              onChange={(e) => {
                                const updated = hireExperts.map(he =>
                                  he.id === hireExpert.id ? { ...he, heroDescription: e.target.value } : he
                                );
                                setHireExperts(updated);
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={hireExpert.status}
                              onChange={(e) => {
                                const updated = hireExperts.map(he =>
                                  he.id === hireExpert.id ? { ...he, status: e.target.value as "active" | "inactive" } : he
                                );
                                setHireExperts(updated);
                              }}
                              className="px-3 py-2 border rounded-md"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg">
                          <p className="font-semibold">{hireExpert.heroTitle}</p>
                          <p className="text-sm text-muted-foreground mt-1">{hireExpert.heroDescription}</p>
                        </div>
                      )}

                      {/* Main Categories */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">Main Categories ({hireExpertMainCategories.length})</h3>
                          <Button onClick={() => handleAddMainCategory(hireExpert.id)} size="sm" variant="outline">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Main Category
                          </Button>
                        </div>

                        {hireExpertMainCategories.map((mainCategory) => {
                          const mainCategoryCategories = categories.filter(c => c.mainCategoryId === mainCategory.id);
                          const isMainCategoryExpanded = expandedMainCategories.has(mainCategory.id);

                          return (
                            <Card key={mainCategory.id} className="ml-6 border-l-2 border-l-primary/20">
                              <CardHeader className="py-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleMainCategory(mainCategory.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      {isMainCategoryExpanded ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                    </Button>
                                    {editingMainCategory === mainCategory.id ? (
                                      <Input
                                        value={mainCategory.name}
                                        onChange={(e) => {
                                          const updated = mainCategories.map(mc =>
                                            mc.id === mainCategory.id
                                              ? { ...mc, name: e.target.value, slug: generateSlug(e.target.value) }
                                              : mc
                                          );
                                          setMainCategories(updated);
                                        }}
                                        className="h-8 text-sm"
                                      />
                                    ) : (
                                      <span className="font-medium text-sm">{mainCategory.name}</span>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      {mainCategory.slug}
                                    </Badge>
                                    <Badge variant={mainCategory.status === "active" ? "default" : "secondary"} className="text-xs">
                                      {mainCategory.status}
                                    </Badge>
                                  </div>
                                  <div className="flex gap-1">
                                    {editingMainCategory === mainCategory.id ? (
                                      <Button onClick={() => handleSaveMainCategory(mainCategory.id)} size="sm" variant="ghost" className="h-7">
                                        <Save className="h-3 w-3" />
                                      </Button>
                                    ) : (
                                      <Button onClick={() => setEditingMainCategory(mainCategory.id)} size="sm" variant="ghost" className="h-7">
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    )}
                                    <Button onClick={() => handleDeleteMainCategory(mainCategory.id)} size="sm" variant="ghost" className="h-7 text-destructive">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>

                              {isMainCategoryExpanded && (
                                <CardContent className="space-y-3 pt-2">
                                  {editingMainCategory === mainCategory.id && (
                                    <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
                                      <div>
                                        <Label className="text-xs">Hero Title</Label>
                                        <Input
                                          value={mainCategory.heroTitle}
                                          onChange={(e) => {
                                            const updated = mainCategories.map(mc =>
                                              mc.id === mainCategory.id ? { ...mc, heroTitle: e.target.value } : mc
                                            );
                                            setMainCategories(updated);
                                          }}
                                          className="h-8 text-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-xs">Hero Description</Label>
                                        <textarea
                                          className="w-full min-h-[60px] px-2 py-1 border rounded-md text-sm"
                                          value={mainCategory.heroDescription}
                                          onChange={(e) => {
                                            const updated = mainCategories.map(mc =>
                                              mc.id === mainCategory.id ? { ...mc, heroDescription: e.target.value } : mc
                                            );
                                            setMainCategories(updated);
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-xs">Icon</Label>
                                        <Input
                                          value={mainCategory.icon}
                                          onChange={(e) => {
                                            const updated = mainCategories.map(mc =>
                                              mc.id === mainCategory.id ? { ...mc, icon: e.target.value } : mc
                                            );
                                            setMainCategories(updated);
                                          }}
                                          className="h-8 text-sm"
                                          placeholder="brain, users, etc."
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Categories */}
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-xs">Categories ({mainCategoryCategories.length})</h4>
                                      <Button onClick={() => handleAddCategory(mainCategory.id)} size="sm" variant="outline" className="h-6 text-xs">
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add
                                      </Button>
                                    </div>

                                    {mainCategoryCategories.map((category) => {
                                      const categorySubCategories = subCategories.filter(sc => sc.categoryId === category.id);
                                      const isCategoryExpanded = expandedCategories.has(category.id);

                                      return (
                                        <Card key={category.id} className="ml-4 border-l-2 border-l-blue-200">
                                          <CardHeader className="py-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2 flex-1">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => toggleCategory(category.id)}
                                                  className="h-5 w-5 p-0"
                                                >
                                                  {isCategoryExpanded ? (
                                                    <ChevronDown className="h-2 w-2" />
                                                  ) : (
                                                    <ChevronRight className="h-2 w-2" />
                                                  )}
                                                </Button>
                                                {editingCategory === category.id ? (
                                                  <Input
                                                    value={category.name}
                                                    onChange={(e) => {
                                                      const updated = categories.map(c =>
                                                        c.id === category.id
                                                          ? { ...c, name: e.target.value, slug: generateSlug(e.target.value) }
                                                          : c
                                                      );
                                                      setCategories(updated);
                                                    }}
                                                    className="h-7 text-xs"
                                                  />
                                                ) : (
                                                  <span className="text-xs font-medium">{category.name}</span>
                                                )}
                                                <Badge variant="outline" className="text-xs px-1">
                                                  {category.slug}
                                                </Badge>
                                              </div>
                                              <div className="flex gap-1">
                                                {editingCategory === category.id ? (
                                                  <Button onClick={() => handleSaveCategory(category.id)} size="sm" variant="ghost" className="h-6">
                                                    <Save className="h-2 w-2" />
                                                  </Button>
                                                ) : (
                                                  <Button onClick={() => setEditingCategory(category.id)} size="sm" variant="ghost" className="h-6">
                                                    <Edit className="h-2 w-2" />
                                                  </Button>
                                                )}
                                                <Button onClick={() => handleDeleteCategory(category.id)} size="sm" variant="ghost" className="h-6 text-destructive">
                                                  <Trash2 className="h-2 w-2" />
                                                </Button>
                                              </div>
                                            </div>
                                          </CardHeader>

                                          {isCategoryExpanded && (
                                            <CardContent className="space-y-2 pt-1">
                                              {editingCategory === category.id && (
                                                <div className="space-y-2 p-2 border rounded-lg bg-muted/20">
                                                  <div>
                                                    <Label className="text-xs">Hero Title</Label>
                                                    <Input
                                                      value={category.heroTitle}
                                                      onChange={(e) => {
                                                        const updated = categories.map(c =>
                                                          c.id === category.id ? { ...c, heroTitle: e.target.value } : c
                                                        );
                                                        setCategories(updated);
                                                      }}
                                                      className="h-7 text-xs"
                                                    />
                                                  </div>
                                                  <div>
                                                    <Label className="text-xs">Hero Description</Label>
                                                    <textarea
                                                      className="w-full min-h-[50px] px-2 py-1 border rounded-md text-xs"
                                                      value={category.heroDescription}
                                                      onChange={(e) => {
                                                        const updated = categories.map(c =>
                                                          c.id === category.id ? { ...c, heroDescription: e.target.value } : c
                                                        );
                                                        setCategories(updated);
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              )}

                                              {/* Sub Categories */}
                                              <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                  <h5 className="font-medium text-xs">Sub Categories ({categorySubCategories.length})</h5>
                                                  <Button onClick={() => handleAddSubCategory(category.id)} size="sm" variant="outline" className="h-5 text-xs">
                                                    <Plus className="h-2 w-2 mr-1" />
                                                    Add
                                                  </Button>
                                                </div>

                                                {categorySubCategories.map((subCategory) => (
                                                  <Card key={subCategory.id} className="ml-2 border-l-2 border-l-green-200">
                                                    <CardHeader className="py-1">
                                                      <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1 flex-1">
                                                          {editingSubCategory === subCategory.id ? (
                                                            <Input
                                                              value={subCategory.name}
                                                              onChange={(e) => {
                                                                const updated = subCategories.map(sc =>
                                                                  sc.id === subCategory.id
                                                                    ? { ...sc, name: e.target.value, slug: generateSlug(e.target.value) }
                                                                    : sc
                                                                );
                                                                setSubCategories(updated);
                                                              }}
                                                              className="h-6 text-xs"
                                                            />
                                                          ) : (
                                                            <span className="text-xs">{subCategory.name}</span>
                                                          )}
                                                          <Badge variant="outline" className="text-xs px-1">
                                                            {subCategory.slug}
                                                          </Badge>
                                                          <Badge variant={subCategory.status === "active" ? "default" : "secondary"} className="text-xs px-1">
                                                            {subCategory.status}
                                                          </Badge>
                                                        </div>
                                                        <div className="flex gap-1">
                                                          {editingSubCategory === subCategory.id ? (
                                                            <Button onClick={() => handleSaveSubCategory(subCategory.id)} size="sm" variant="ghost" className="h-5">
                                                              <Save className="h-2 w-2" />
                                                            </Button>
                                                          ) : (
                                                            <Button onClick={() => setEditingSubCategory(subCategory.id)} size="sm" variant="ghost" className="h-5">
                                                              <Edit className="h-2 w-2" />
                                                            </Button>
                                                          )}
                                                          <Button onClick={() => handleDeleteSubCategory(subCategory.id)} size="sm" variant="ghost" className="h-5 text-destructive">
                                                            <Trash2 className="h-2 w-2" />
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </CardHeader>

                                                    {editingSubCategory === subCategory.id && (
                                                      <CardContent className="space-y-2 pt-1">
                                                        <div className="p-2 border rounded-lg bg-muted/10">
                                                          <div className="space-y-2">
                                                            <div>
                                                              <Label className="text-xs">Hero Title</Label>
                                                              <Input
                                                                value={subCategory.heroTitle}
                                                                onChange={(e) => {
                                                                  const updated = subCategories.map(sc =>
                                                                    sc.id === subCategory.id ? { ...sc, heroTitle: e.target.value } : sc
                                                                  );
                                                                  setSubCategories(updated);
                                                                }}
                                                                className="h-7 text-xs"
                                                              />
                                                            </div>
                                                            <div>
                                                              <Label className="text-xs">Hero Description</Label>
                                                              <textarea
                                                                className="w-full min-h-[50px] px-2 py-1 border rounded-md text-xs"
                                                                value={subCategory.heroDescription}
                                                                onChange={(e) => {
                                                                  const updated = subCategories.map(sc =>
                                                                    sc.id === subCategory.id ? { ...sc, heroDescription: e.target.value } : sc
                                                                  );
                                                                  setSubCategories(updated);
                                                                }}
                                                              />
                                                            </div>
                                                            <div>
                                                              <Label className="text-xs">Features</Label>
                                                              <div className="space-y-1">
                                                                {subCategory.features.map((feature, idx) => (
                                                                  <div key={idx} className="flex gap-1">
                                                                    <Input
                                                                      value={feature}
                                                                      onChange={(e) => {
                                                                        const updated = subCategories.map(sc =>
                                                                          sc.id === subCategory.id
                                                                            ? {
                                                                                ...sc,
                                                                                features: sc.features.map((f, i) => (i === idx ? e.target.value : f)),
                                                                              }
                                                                            : sc
                                                                        );
                                                                        setSubCategories(updated);
                                                                      }}
                                                                      className="h-6 text-xs"
                                                                    />
                                                                    <Button
                                                                      onClick={() => handleRemoveFeature(subCategory.id, idx)}
                                                                      size="sm"
                                                                      variant="ghost"
                                                                      className="h-6 text-destructive"
                                                                    >
                                                                      <Trash2 className="h-2 w-2" />
                                                                    </Button>
                                                                  </div>
                                                                ))}
                                                                <Button
                                                                  onClick={() => handleAddFeature(subCategory.id)}
                                                                  size="sm"
                                                                  variant="outline"
                                                                  className="h-6 text-xs"
                                                                >
                                                                  <Plus className="h-2 w-2 mr-1" />
                                                                  Add Feature
                                                                </Button>
                                                              </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                              <div>
                                                                <Label className="text-xs">Starting From ($)</Label>
                                                                <Input
                                                                  type="number"
                                                                  value={subCategory.pricing.startingFrom}
                                                                  onChange={(e) => {
                                                                    const updated = subCategories.map(sc =>
                                                                      sc.id === subCategory.id
                                                                        ? {
                                                                            ...sc,
                                                                            pricing: { ...sc.pricing, startingFrom: parseInt(e.target.value) || 0 },
                                                                          }
                                                                        : sc
                                                                    );
                                                                    setSubCategories(updated);
                                                                  }}
                                                                  className="h-7 text-xs"
                                                                />
                                                              </div>
                                                              <div>
                                                                <Label className="text-xs">Billing</Label>
                                                                <select
                                                                  value={subCategory.pricing.billing}
                                                                  onChange={(e) => {
                                                                    const updated = subCategories.map(sc =>
                                                                      sc.id === subCategory.id
                                                                        ? { ...sc, pricing: { ...sc.pricing, billing: e.target.value } }
                                                                        : sc
                                                                    );
                                                                    setSubCategories(updated);
                                                                  }}
                                                                  className="w-full h-7 px-2 border rounded-md text-xs"
                                                                >
                                                                  <option value="hourly">Hourly</option>
                                                                  <option value="monthly">Monthly</option>
                                                                  <option value="one-time">One Time</option>
                                                                  <option value="yearly">Yearly</option>
                                                                </select>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </CardContent>
                                                    )}
                                                  </Card>
                                                ))}
                                              </div>
                                            </CardContent>
                                          )}
                                        </Card>
                                      );
                                    })}
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {hireExperts.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No expert categories added yet. Click "Add Expert Category" to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


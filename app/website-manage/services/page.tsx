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
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  FileText,
  Layers,
  ChevronDown,
  ChevronRight
} from "lucide-react";

// Data Types
interface Service {
  id: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface ServiceMainCategory {
  id: string;
  serviceId: string;
  name: string;
  slug: string;
  icon: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface ServiceCategory {
  id: string;
  mainCategoryId: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  components: any[];
  status: "active" | "inactive";
}

interface ServiceSubCategory {
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

export default function ServicesManagePage() {
  // Services State
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Marketing Services",
      slug: "marketing",
      heroTitle: "Grow Your Business with Marketing Experts",
      heroDescription: "End-to-end digital marketing solutions",
      components: [
        { type: "hero", title: "Marketing Services" },
        { type: "overview", content: "We help brands grow online." },
      ],
      status: "active",
    },
  ]);

  // Main Categories State
  const [mainCategories, setMainCategories] = useState<ServiceMainCategory[]>([
    {
      id: "1",
      serviceId: "1",
      name: "Hire Talent",
      slug: "hire-talent",
      icon: "users",
      heroTitle: "Hire Top Marketing Talent",
      heroDescription: "Pre-vetted experts ready to scale your business",
      components: [
        { type: "cards", title: "Why Hire From Us" },
      ],
      status: "active",
    },
  ]);

  // Categories State
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: "1",
      mainCategoryId: "1",
      name: "SEO",
      slug: "seo",
      heroTitle: "Search Engine Optimization",
      heroDescription: "Rank higher and get quality traffic",
      components: [
        { type: "features", items: ["On-page", "Technical", "Off-page"] },
      ],
      status: "active",
    },
  ]);

  // Sub Categories State
  const [subCategories, setSubCategories] = useState<ServiceSubCategory[]>([
    {
      id: "1",
      categoryId: "1",
      name: "Technical SEO",
      slug: "technical-seo",
      heroTitle: "Technical SEO Services",
      heroDescription: "Improve site performance & crawlability",
      features: [
        "Site Audit",
        "Core Web Vitals",
        "Indexing Fixes",
      ],
      pricing: {
        startingFrom: 500,
        billing: "monthly",
      },
      status: "active",
    },
  ]);

  // UI State
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editingMainCategory, setEditingMainCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<string | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(["1"]));
  const [expandedMainCategories, setExpandedMainCategories] = useState<Set<string>>(new Set(["1"]));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["1"]));

  // Helper Functions
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Service Handlers
  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: "New Service",
      slug: "new-service",
      heroTitle: "New Service Title",
      heroDescription: "Service description",
      components: [],
      status: "active",
    };
    setServices([...services, newService]);
    setEditingService(newService.id);
  };

  const handleSaveService = (serviceId: string) => {
    setEditingService(null);
    console.log("Service saved:", services.find(s => s.id === serviceId));
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
    setMainCategories(mainCategories.filter(mc => mc.serviceId !== serviceId));
  };

  // Main Category Handlers
  const handleAddMainCategory = (serviceId: string) => {
    const newMainCategory: ServiceMainCategory = {
      id: Date.now().toString(),
      serviceId,
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
    const newCategory: ServiceCategory = {
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
    const newSubCategory: ServiceSubCategory = {
      id: Date.now().toString(),
      categoryId,
      name: "New Sub Category",
      slug: "new-sub-category",
      heroTitle: "New Sub Category Title",
      heroDescription: "Sub category description",
      features: [],
      pricing: {
        startingFrom: 0,
        billing: "monthly",
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

  const toggleService = (serviceId: string) => {
    const newSet = new Set(expandedServices);
    if (newSet.has(serviceId)) {
      newSet.delete(serviceId);
    } else {
      newSet.add(serviceId);
    }
    setExpandedServices(newSet);
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
                <Layers className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage services with hierarchical categories (Services → Main Categories → Categories → Sub Categories)
                  </p>
                </div>
              </div>
              <Button onClick={handleAddService} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </motion.div>

          {/* Services List */}
          <div className="space-y-4">
            {services.map((service) => {
              const serviceMainCategories = mainCategories.filter(mc => mc.serviceId === service.id);
              const isExpanded = expandedServices.has(service.id);

              return (
                <Card key={service.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleService(service.id)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          {editingService === service.id ? (
                            <div className="space-y-2">
                              <Input
                                value={service.name}
                                onChange={(e) => {
                                  const updated = services.map(s =>
                                    s.id === service.id
                                      ? { ...s, name: e.target.value, slug: generateSlug(e.target.value) }
                                      : s
                                  );
                                  setServices(updated);
                                }}
                                placeholder="Service Name"
                                className="font-semibold"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={service.slug}
                                  onChange={(e) => {
                                    const updated = services.map(s =>
                                      s.id === service.id ? { ...s, slug: e.target.value } : s
                                    );
                                    setServices(updated);
                                  }}
                                  placeholder="slug-url"
                                  className="text-sm"
                                />
                                <Badge variant="outline" className="text-xs">
                                  /services/{service.slug}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CardTitle className="text-lg">{service.name}</CardTitle>
                              <p className="text-xs text-muted-foreground mt-1">
                                Slug: /services/{service.slug}
                              </p>
                            </div>
                          )}
                        </div>
                        <Badge variant={service.status === "active" ? "default" : "secondary"}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {editingService === service.id ? (
                          <Button onClick={() => handleSaveService(service.id)} size="sm">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setEditingService(service.id)} size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button onClick={() => handleDeleteService(service.id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="space-y-4 pt-4">
                      {/* Service Details */}
                      {editingService === service.id ? (
                        <div className="space-y-4 p-4 border rounded-lg">
                          <div>
                            <Label>Hero Title</Label>
                            <Input
                              value={service.heroTitle}
                              onChange={(e) => {
                                const updated = services.map(s =>
                                  s.id === service.id ? { ...s, heroTitle: e.target.value } : s
                                );
                                setServices(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Hero Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={service.heroDescription}
                              onChange={(e) => {
                                const updated = services.map(s =>
                                  s.id === service.id ? { ...s, heroDescription: e.target.value } : s
                                );
                                setServices(updated);
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={service.status}
                              onChange={(e) => {
                                const updated = services.map(s =>
                                  s.id === service.id ? { ...s, status: e.target.value as "active" | "inactive" } : s
                                );
                                setServices(updated);
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
                          <p className="font-semibold">{service.heroTitle}</p>
                          <p className="text-sm text-muted-foreground mt-1">{service.heroDescription}</p>
                        </div>
                      )}

                      {/* Main Categories */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">Main Categories ({serviceMainCategories.length})</h3>
                          <Button onClick={() => handleAddMainCategory(service.id)} size="sm" variant="outline">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Main Category
                          </Button>
                        </div>

                        {serviceMainCategories.map((mainCategory) => {
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
                                          placeholder="users, folder, etc."
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

          {services.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No services added yet. Click "Add Service" to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


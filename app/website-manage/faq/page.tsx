"use client";

import { useState, useEffect } from "react";
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
  Tag,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const API_BASE ="http://localhost:8000";

// FAQ Data Types
interface FAQ {
  id: string; // backend id (stringified)
  question: string; // maps to title
  answer: string; // maps to description
  type: string; // maps directly to backend "type"
  order: number; // local order only
  isActive: boolean; // derived from status + isDeleted
  isNew?: boolean; // not yet saved on backend
}

interface ApiFaq {
  id: number;
  type: string;
  title: string;
  description: string;
  status: "active" | "inactive";
  isDeleted: boolean;
}

interface FAQType {
  id?: number;
  name: string;
}

export default function FAQManagePage() {
  // FAQs State - loaded from API
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  
  // Types State - loaded from API
  const [types, setTypes] = useState<string[]>([]);
  const [newTypeName, setNewTypeName] = useState<string>("");
  const [loadingTypes, setLoadingTypes] = useState<boolean>(false);

  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all"); // all, active, inactive
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savingFaqId, setSavingFaqId] = useState<string | null>(null);
  const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);

  // Load FAQs from backend - extracted as reusable function
  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/faq/admin`);
      if (!res.ok) {
        throw new Error(`Failed to load FAQs (${res.status})`);
      }
      const raw = await res.json();
      console.log('Raw API Response:', raw); // Debug log
      
      // Handle the response structure: { "faqs": { "Category1": [...], "Category2": [...] } }
      let data: ApiFaq[] = [];
      
      if (Array.isArray(raw)) {
        // Direct array response
        data = raw;
      } else if (raw && typeof raw === 'object') {
        // Check for nested structure: { faqs: { type: [...] } }
        if (raw.faqs && typeof raw.faqs === 'object' && !Array.isArray(raw.faqs)) {
          // Flatten all types into a single array
          data = Object.values(raw.faqs).flat() as ApiFaq[];
        } else if (Array.isArray(raw.data)) {
          // Check for { data: [...] }
          data = raw.data;
        } else if (Array.isArray(raw.faqs)) {
          // Check for { faqs: [...] }
          data = raw.faqs;
        }
      }

      console.log('Extracted FAQs Data:', data); // Debug log

      // Filter out deleted items and map to FAQ format
      // Show ALL FAQs (both active and inactive) - only filter isDeleted
      const mappedFaqs: FAQ[] = (data || [])
        .filter((item) => {
          if (!item) return false;
          // Handle both boolean and number (0/1) for isDeleted
          // Database might return 0/1, but interface says boolean
          const deleted = item.isDeleted as any;
          const isDeleted = deleted === true || deleted === 1 || deleted === "1" || deleted === "true";
          return !isDeleted;
        })
        .map((item, index) => {
          const faq: FAQ = {
            id: String(item.id),
            question: item.title || '',
            answer: item.description || '',
            type: item.type || '',
            order: index + 1,
            isActive: item.status === "active",
          };
          console.log(`Mapped FAQ ${item.id}:`, faq); // Debug log
          return faq;
        });

      console.log('Final Mapped FAQs:', mappedFaqs); // Debug log
      setFaqs(mappedFaqs);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to load FAQs from server."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load Types from backend
  const loadTypes = async () => {
    try {
      setLoadingTypes(true);
      const res = await fetch(`${API_BASE}/api/faq/types`);
      if (!res.ok) {
        throw new Error(`Failed to load types (${res.status})`);
      }
      const data = await res.json();
      console.log('Types API Response:', data);
      
      // Handle different response structures
      let typeNames: string[] = [];
      if (Array.isArray(data)) {
        // Direct array of strings or objects
        typeNames = data.map((item: any) => 
          typeof item === 'string' ? item : (item.name || item.type || item)
        );
      } else if (data.types && Array.isArray(data.types)) {
        typeNames = data.types.map((item: any) => 
          typeof item === 'string' ? item : (item.name || item.type || item)
        );
      } else if (data.data && Array.isArray(data.data)) {
        typeNames = data.data.map((item: any) => 
          typeof item === 'string' ? item : (item.name || item.type || item)
        );
      }
      
      setTypes(typeNames.filter(Boolean));
    } catch (err) {
      console.error('Error loading types:', err);
      setError(err instanceof Error ? err.message : "Failed to load types");
    } finally {
      setLoadingTypes(false);
    }
  };

  // Create new type
  const handleCreateType = async () => {
    const trimmedName = newTypeName.trim();
    
    if (!trimmedName) {
      setError("Type name is required");
      return;
    }

    if (types.includes(trimmedName)) {
      setError("Type already exists");
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      
      const payload = { type: trimmedName };
      console.log('Creating type with payload:', payload);
      
      const res = await fetch(`${API_BASE}/api/faq/types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));
      console.log('Type creation response:', responseData);

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to create type (${res.status})`;
        throw new Error(errorMessage);
      }

      // Reload types
      await loadTypes();
      setNewTypeName("");
      setSuccessMessage("Type created successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error creating type:', err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create type. Please try again."
      );
    }
  };

  // Load FAQs and Types on component mount
  useEffect(() => {
    loadFaqs();
    loadTypes();
  }, []);

  const handleFaqSave = async (faqId: string) => {
    const faq = faqs.find((f) => f.id === faqId);
    if (!faq) return;

    // Validation
    if (!faq.question.trim()) {
      setError("Question is required");
      return;
    }
    if (!faq.answer.trim()) {
      setError("Answer is required");
      return;
    }
    if (!faq.type || !faq.type.trim()) {
      setError("Type is required");
      return;
    }

    const payload = {
      type: faq.type.trim(),
      title: faq.question.trim(),
      description: faq.answer.trim(),
      status: faq.isActive ? "active" : "inactive",
    };

    const isNew = faq.isNew || faqId.startsWith("temp-");

    try {
      setError(null);
      setSuccessMessage(null);
      setSavingFaqId(faqId);
      
      const res = await fetch(
        `${API_BASE}/api/faq${isNew ? "" : `/${faqId}`}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to ${isNew ? "create" : "update"} FAQ (${res.status})`
        );
      }

      // Reload FAQs from server to get fresh data
      await loadFaqs();
      
      setSuccessMessage(`FAQ ${isNew ? "created" : "updated"} successfully!`);
      setEditingFaq(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save FAQ. Please try again."
      );
    } finally {
      setSavingFaqId(null);
    }
  };

  const handleAddFaq = () => {
    const tempId = `temp-${Date.now()}`;
    const newFaq: FAQ = {
      id: tempId,
      question: "",
      answer: "",
      type: "",
      order: faqs.length + 1,
      isActive: true,
      isNew: true,
    };
    setFaqs([...faqs, newFaq]);
    setEditingFaq(tempId);
  };

  const handleDeleteFaq = async (faqId: string) => {
    const faq = faqs.find((f) => f.id === faqId);
    if (!faq) return;

    // Confirm deletion
    if (!confirm("Are you sure you want to delete this FAQ?")) {
      return;
    }

    // If it's a new/unsaved FAQ, just remove locally
    if (faq.isNew || faqId.startsWith("temp-")) {
      setFaqs(faqs.filter((f) => f.id !== faqId));
      setSuccessMessage("FAQ removed successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      setDeletingFaqId(faqId);
      
      const res = await fetch(`${API_BASE}/api/faq/${faqId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to delete FAQ (${res.status})`
        );
      }

      // Reload FAQs from server to get fresh data
      await loadFaqs();
      
      setSuccessMessage("FAQ deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete FAQ. Please try again."
      );
    } finally {
      setDeletingFaqId(null);
    }
  };

  // Use types from API, and also include any types from FAQs that might not be in the types list yet
  const allTypeNames = Array.from(
    new Set([
      ...types,
      ...faqs.map((f) => f.type).filter(Boolean) as string[]
    ])
  ).sort();

  // Filter FAQs by selected type and status
  const filteredFaqs = faqs.filter(faq => {
    const typeMatch = selectedTypeFilter === "all" || faq.type === selectedTypeFilter;
    const statusMatch = selectedStatusFilter === "all" 
      ? true 
      : selectedStatusFilter === "active" 
        ? faq.isActive 
        : !faq.isActive;
    return typeMatch && statusMatch;
  });

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

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md flex items-center gap-2"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-6 w-6 p-0"
                onClick={() => setError(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-md flex items-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span>{successMessage}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-6 w-6 p-0"
                onClick={() => setSuccessMessage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Types Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <CardTitle>FAQ Types Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Create New Type */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter new type name (e.g., Home, Services, Pricing)"
                      value={newTypeName}
                      onChange={(e) => setNewTypeName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateType();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleCreateType}
                      disabled={loadingTypes || !newTypeName.trim()}
                    >
                      {loadingTypes ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      Add Type
                    </Button>
                  </div>

                  {/* Types List */}
                  <div>
                    <Label className="mb-2 block">Available Types ({types.length})</Label>
                    {loadingTypes ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Loading types...</span>
                      </div>
                    ) : types.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {types.map((type) => (
                          <Badge key={type} variant="default" className="text-sm px-3 py-1">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No types available. Create a new type above.
                      </p>
                    )}
                  </div>
                </div>
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
                {/* Loading State */}
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading FAQs...</span>
                  </div>
                ) : (
                  <>
                    {/* Filters */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Type Filter */}
                      <div>
                        <Label className="mb-2 block">Filter by Type</Label>
                        <select
                          value={selectedTypeFilter}
                          onChange={(e) => setSelectedTypeFilter(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="all">All Types ({faqs.length})</option>
                          {allTypeNames.map((name) => {
                            const count = faqs.filter(f => f.type === name).length;
                            return (
                              <option key={name} value={name}>
                                {name} ({count})
                              </option>
                            );
                          })}
                          <option value="">No Type ({faqs.filter(f => !f.type).length})</option>
                        </select>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <Label className="mb-2 block">Filter by Status</Label>
                        <select
                          value={selectedStatusFilter}
                          onChange={(e) => setSelectedStatusFilter(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="all">All Status ({faqs.length})</option>
                          <option value="active">Active ({faqs.filter(f => f.isActive).length})</option>
                          <option value="inactive">Inactive ({faqs.filter(f => !f.isActive).length})</option>
                        </select>
                      </div>
                    </div>

                    {/* FAQs List */}
                    <div className="space-y-4">
                      {filteredFaqs.map((faq, index) => (
                        <div key={faq.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 flex-1 flex-wrap">
                          <span className="text-sm font-medium text-muted-foreground">
                            #{filteredFaqs.findIndex(f => f.id === faq.id) + 1}
                          </span>
                          {faq.type ? (
                            <Badge variant="default" className="text-xs font-semibold">
                              {faq.type}
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
                            <>
                              <Button 
                                onClick={() => handleFaqSave(faq.id)} 
                                size="sm" 
                                variant="outline"
                                disabled={savingFaqId === faq.id}
                              >
                                {savingFaqId === faq.id ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                  </>
                                )}
                              </Button>
                              <Button 
                                onClick={() => {
                                  setEditingFaq(null);
                                  // Reload to discard changes
                                  loadFaqs();
                                }} 
                                size="sm" 
                                variant="ghost"
                                disabled={savingFaqId === faq.id}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                onClick={() => setEditingFaq(faq.id)} 
                                size="sm" 
                                variant="outline"
                                disabled={deletingFaqId === faq.id}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteFaq(faq.id)}
                                variant="destructive"
                                size="sm"
                                disabled={deletingFaqId === faq.id}
                              >
                                {deletingFaqId === faq.id ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </>
                                )}
                              </Button>
                            </>
                          )}
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
                            <Label>Type (Required)</Label>
                            <div className="flex gap-2">
                              <select
                                value={faq.type || ""}
                                onChange={(e) => {
                                  const updated = faqs.map(f =>
                                    f.id === faq.id ? { ...f, type: e.target.value || "" } : f
                                  );
                                  setFaqs(updated);
                                }}
                                className="flex-1 px-3 py-2 border rounded-md bg-background"
                              >
                                <option value="">Select Type</option>
                                {allTypeNames.map((name) => (
                                  <option key={name} value={name}>
                                    {name}
                                  </option>
                                ))}
                              </select>
                              <Input
                                type="text"
                                placeholder="Or enter new type"
                                value={faq.type && !allTypeNames.includes(faq.type) ? faq.type : ""}
                                onChange={(e) => {
                                  const updated = faqs.map(f =>
                                    f.id === faq.id ? { ...f, type: e.target.value || "" } : f
                                  );
                                  setFaqs(updated);
                                }}
                                className="flex-1"
                                onBlur={(e) => {
                                  // If user typed something, use it as type
                                  if (e.target.value.trim()) {
                                    const updated = faqs.map(f =>
                                      f.id === faq.id ? { ...f, type: e.target.value.trim() } : f
                                    );
                                    setFaqs(updated);
                                  }
                                }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Select an existing type or enter a new one. Types represent different FAQ groups/pages.
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
                          {selectedTypeFilter === "all" && selectedStatusFilter === "all"
                            ? "No FAQs added yet. Click 'Add FAQ' to get started."
                            : `No FAQs found matching the selected filters. Click 'Add FAQ' to add one.`}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


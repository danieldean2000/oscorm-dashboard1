"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, Users } from "lucide-react";

interface ComparisonRow {
  id: string;
  requirement: string;
  freelancerIcon: string;
  freelancerText: string;
  freelancerColor: string;
  oscormIcon: string;
  oscormText: string;
  oscormColor: string;
}

interface WhyAvoidSection {
  title: string;
  subtitle: string;
  enterpriseTitle: string;
  freelancerTitle: string;
  freelancerBadge: string;
  freelancerFooter: string;
  oscormTitle: string;
  oscormBadge: string;
  oscormFooter: string;
  comparisonData: ComparisonRow[];
}

export function WhyAvoidFreelancers() {
  const [editing, setEditing] = useState(false);
  const [sectionData, setSectionData] = useState<WhyAvoidSection>({
    title: "Why Growing Brands Avoid Freelancers",
    subtitle: "Comparing creative operational models for predictable growth",
    enterpriseTitle: "Enterprise Requirements",
    freelancerTitle: "Freelancer Model",
    freelancerBadge: "Ad-Hoc & Unpredictable",
    freelancerFooter: "High Operational Risk",
    oscormTitle: "Oscorm Dedicated Team",
    oscormBadge: "Strategic Partnership",
    oscormFooter: "Recommended for Growth",
    comparisonData: [
      {
        id: "1",
        requirement: "SLA & Reliability Guarantees",
        freelancerIcon: "✕",
        freelancerText: "No delivery guarantee",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "Reliable long-term structure",
        oscormColor: "green",
      },
      {
        id: "2",
        requirement: "Team Availability & Coverage",
        freelancerIcon: "✕",
        freelancerText: "Unpredictable availability",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "Full-time dedicated specialists",
        oscormColor: "green",
      },
      {
        id: "3",
        requirement: "Time-to-Market Speed",
        freelancerIcon: "✕",
        freelancerText: "Slow & inconsistent output",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "48-hour deployment speed",
        oscormColor: "green",
      },
      {
        id: "4",
        requirement: "Cost Predictability & Control",
        freelancerIcon: "✕",
        freelancerText: "Expensive with hidden costs",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "60-70% more cost-efficient",
        oscormColor: "green",
      },
      {
        id: "5",
        requirement: "Quality Assurance Systems",
        freelancerIcon: "✕",
        freelancerText: "No quality checks",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "PM & QA supervision",
        oscormColor: "green",
      },
      {
        id: "6",
        requirement: "Compliance & Security",
        freelancerIcon: "✕",
        freelancerText: "No compliance / No NDA assurance",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "NDA + ISO compliant",
        oscormColor: "green",
      },
      {
        id: "7",
        requirement: "Project Governance",
        freelancerIcon: "✕",
        freelancerText: "You manage everything",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "Fully managed workflow",
        oscormColor: "green",
      },
      {
        id: "8",
        requirement: "Business Continuity",
        freelancerIcon: "✕",
        freelancerText: "No backup if freelancer disappears",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "Backup & replacement included",
        oscormColor: "green",
      },
      {
        id: "9",
        requirement: "Performance Analytics",
        freelancerIcon: "✕",
        freelancerText: "No tracking or monitoring",
        freelancerColor: "red",
        oscormIcon: "✓",
        oscormText: "Live tracking & reporting",
        oscormColor: "green",
      },
    ],
  });

  const handleSave = () => {
    setEditing(false);
    console.log("Why avoid section saved:", sectionData);
  };

  const handleAddComparisonRow = () => {
    const newRow = {
      id: Date.now().toString(),
      requirement: "New Requirement",
      freelancerIcon: "✕",
      freelancerText: "Freelancer text",
      freelancerColor: "red",
      oscormIcon: "✓",
      oscormText: "Oscorm text",
      oscormColor: "green",
    };
    setSectionData({
      ...sectionData,
      comparisonData: [...sectionData.comparisonData, newRow],
    });
  };

  const handleDeleteComparisonRow = (id: string) => {
    setSectionData({
      ...sectionData,
      comparisonData: sectionData.comparisonData.filter(r => r.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Why Avoid Freelancers</CardTitle>
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
                <Button onClick={handleAddComparisonRow} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
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
              <div className="space-y-2">
                {sectionData.comparisonData.map((row) => (
                  <div key={row.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <Label>Requirement</Label>
                      <Input
                        value={row.requirement}
                        onChange={(e) => {
                          const updated = sectionData.comparisonData.map(r =>
                            r.id === row.id ? { ...r, requirement: e.target.value } : r
                          );
                          setSectionData({ ...sectionData, comparisonData: updated });
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Freelancer Text</Label>
                        <Input
                          value={row.freelancerText}
                          onChange={(e) => {
                            const updated = sectionData.comparisonData.map(r =>
                              r.id === row.id ? { ...r, freelancerText: e.target.value } : r
                            );
                            setSectionData({ ...sectionData, comparisonData: updated });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Oscorm Text</Label>
                        <Input
                          value={row.oscormText}
                          onChange={(e) => {
                            const updated = sectionData.comparisonData.map(r =>
                              r.id === row.id ? { ...r, oscormText: e.target.value } : r
                            );
                            setSectionData({ ...sectionData, comparisonData: updated });
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteComparisonRow(row.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Row
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold">{sectionData.title}</h3>
              <p className="text-muted-foreground mt-2">{sectionData.subtitle}</p>
              <div className="mt-4 space-y-2">
                {sectionData.comparisonData.map((row) => (
                  <div key={row.id} className="border rounded p-3">
                    <p className="font-semibold">{row.requirement}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-red-600">{row.freelancerIcon}</span> {row.freelancerText}
                      </div>
                      <div>
                        <span className="text-green-600">{row.oscormIcon}</span> {row.oscormText}
                      </div>
                    </div>
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


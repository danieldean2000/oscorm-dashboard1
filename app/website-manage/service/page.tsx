"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";

// Helper component to handle both internal and external images
const SafeImage = ({ src, alt, fill, className, ...props }: { src: string; alt: string; fill?: boolean; className?: string; [key: string]: any }) => {
  const isExternal = src.startsWith('http://') || src.startsWith('https://');
  
  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={fill ? { 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        } : undefined}
        {...props}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      {...props}
    />
  );
};
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
  Image as ImageIcon,
  Building2,
  Grid3x3,
  Users,
  TrendingUp,
  Layers,
  Monitor,
  Sliders,
  Award,
  Sparkles,
  FolderOpen
} from "lucide-react";

// Dummy Data Types
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  link: string;
  order: number;
  isActive: boolean;
}

interface ServiceSection {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface TrustedBySection {
  id: string;
  title: string;
  subtitle: string;
  logos: string[];
  isActive: boolean;
}

interface DeliverableService {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

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

interface ProvenStep {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

interface ProvenDeliverySection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  steps: ProvenStep[];
}

interface TrackingFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TrackingSection {
  title: string;
  subtitle: string;
  mainImageSrc: string;
  mainImageAlt: string;
  features: TrackingFeature[];
}

interface EngagementSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  order: number;
}

interface EngagementSection {
  sectionTitle: string;
  slides: EngagementSlide[];
}

interface Certification {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface ToolsSection {
  title: string;
  certifications: Certification[];
}

interface ElevateFeature {
  id: string;
  icon: string;
  title: string;
}

interface ElevatesSection {
  title: string;
  centerImageSrc: string;
  centerImageAlt: string;
  leftFeatures: ElevateFeature[];
  rightFeatures: ElevateFeature[];
}

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

interface WhyOscormFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  bulletPoints: string[];
}

interface WhyOscormSection {
  title: string;
  features: WhyOscormFeature[];
}

export default function ServiceManagePage() {
  // Service Section Header
  const [serviceSection, setServiceSection] = useState<ServiceSection>({
    id: "1",
    title: "Our Services",
    description: "We offer a wide range of services to help your business grow and succeed in the digital world.",
    isActive: true,
  });

  // Service Cards State
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([
    {
      id: "1",
      title: "Web Development",
      description: "Custom web solutions tailored to your business",
      longDescription: "We create responsive, fast, and scalable web applications using the latest technologies. Our team specializes in React, Next.js, and modern web frameworks.",
      icon: "🌐",
      image: "/images/web-dev.jpg",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
      price: "Starting from $999",
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
      price: "Starting from $1,499",
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
      price: "Custom Pricing",
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
      price: "Starting from $499/month",
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
      price: "Starting from $799",
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
      price: "Custom Pricing",
      link: "/services/consulting",
      order: 6,
      isActive: true,
    },
  ]);
  

  // Trusted By Industry Leaders Section
  const [trustedBySection, setTrustedBySection] = useState<TrustedBySection>({
    id: "1",
    title: "Trusted by Industry Leaders",
    subtitle: "Join 500+ forward-thinking companies scaling with Oscorm",
    logos: [
      "/images/home/Industry/sec-0.png",
      "/images/home/Industry/sec-1.png",
      "/images/home/Industry/sec-2.png",
      "/images/home/Industry/sec-3.png",
      "/images/home/Industry/sec-4.png",
      "/images/home/Industry/sec-5.png",
      "/images/home/Industry/sec-6.png",
      "/images/home/Industry/sec-7.png",
    ],
    isActive: true,
  });

  // What We Deliver Section
  const [deliverServices, setDeliverServices] = useState<DeliverableService[]>([
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

  // Why Avoid Freelancers Section
  const [whyAvoidSection, setWhyAvoidSection] = useState<WhyAvoidSection>({
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

  // Proven Delivery Model Section
  const [provenSection, setProvenSection] = useState<ProvenDeliverySection>({
    title: "Our Proven Delivery Model",
    subtitle: "A streamlined 6-step process from consultation to deployment",
    ctaText: "Ready to streamline your operations with expert support?",
    ctaButtonLabel: "Book a Free Consultation",
    steps: [
      {
        id: "1",
        title: "Needs Analysis",
        description: "We begin by understanding your support needs, operational requirements, and service expectations. Whether you need customer support or data processing, everything starts with clarity.",
        image: "/images/services/admin-support/Model-1.png",
        order: 1,
      },
      {
        id: "2",
        title: "Scope Plan",
        description: "Our experts chart the support workflow, service deliverables, schedules, and skill sets needed. This ensures your admin support is designed for efficiency from the start.",
        image: "/images/services/admin-support/Model-2.png",
        order: 2,
      },
      {
        id: "3",
        title: "Solution Offer",
        description: "You receive a customized proposal with pricing options for support services or dedicated teams. We match you with the right specialists, tools, and engagement model.",
        image: "/images/services/admin-support/Model-3.png",
        order: 3,
      },
      {
        id: "4",
        title: "Team Onboarding",
        description: "Once approved, we onboard your dedicated support team with comprehensive training, processes, and integration with your existing systems and workflows.",
        image: "/images/services/admin-support/Model-4.png",
        order: 4,
      },
      {
        id: "5",
        title: "Performance Delivery",
        description: "Your support team delivers on schedule with real-time tracking, quality assurance checks, and regular communication. We ensure consistent excellence at every milestone.",
        image: "/images/services/admin-support/Model-5.png",
        order: 5,
      },
      {
        id: "6",
        title: "Continuous Optimization",
        description: "We monitor support performance analytics, gather feedback, and optimize processes continuously. Your success is our ongoing commitment with regular reviews and improvements.",
        image: "/images/services/admin-support/Model-6.png",
        order: 6,
      },
    ],
  });

  // Real-Time Tracking Section
  const [trackingSection, setTrackingSection] = useState<TrackingSection>({
    title: "Real-Time Tracking System",
    subtitle: "Complete visibility into your support operations",
    mainImageSrc: "/images/services/admin-support/pc.png",
    mainImageAlt: "Real-Time Tracking Dashboard",
    features: [
      {
        id: "1",
        icon: "/images/services/admin-support/Live-Work-Tracking.png",
        title: "Live Work Tracking",
        description: "Monitor support tasks in real-time with screenshots and progress updates",
      },
      {
        id: "2",
        icon: "/images/services/admin-support/AI-Activity-Insights.png",
        title: "AI Activity Insights",
        description: "Smart analytics on support team productivity and performance patterns",
      },
      {
        id: "3",
        icon: "/images/services/admin-support/Task-Level-Transparency.png",
        title: "Task-Level Transparency",
        description: "Detailed progress tracking at individual support task level with milestones",
      },
      {
        id: "4",
        icon: "/images/services/admin-support/PM-Verified-Reports.png",
        title: "PM-Verified Reports",
        description: "Project manager validated support progress reports with quality assurance",
      },
      {
        id: "5",
        icon: "/images/services/admin-support/Time-Output-Logs.png",
        title: "Time & Output Logs",
        description: "Accurate time tracking and support output measurement with analytics",
      },
      {
        id: "6",
        icon: "/images/services/admin-support/Centralized-File-Delivery.png",
        title: "Centralized File Delivery",
        description: "All support files delivered through secure central system with version control",
      },
    ],
  });

  // Engagement Slider Section
  const [engagementSection, setEngagementSection] = useState<EngagementSection>({
    sectionTitle: "Engagement Models Built for Your Needs",
    slides: [
      {
        id: "1",
        title: "Support Retainer",
        subtitle: "A continuous, high-volume support subscription available every month.",
        description: "Submit support requests through your dashboard, and we provide prioritization and delivery in sprints. All tasks go through PM review, QA, and version tracking.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Learn More",
        order: 1,
      },
      {
        id: "2",
        title: "Dedicated Team",
        subtitle: "Full-time, managed support specialists embedded into your workflows.",
        description: "Handpicked support team aligned to your workflows, with PM supervision and real-time reporting to ensure predictable delivery.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Explore Team",
        order: 2,
      },
      {
        id: "3",
        title: "Project-Based Engagement",
        subtitle: "Fixed-scope support projects with clear milestones and deliverables.",
        description: "Structured delivery with kickoff, milestones, and QA gates to ensure every support project meets your quality bar and deadlines.",
        image: "/images/services/admin-support/Engagement1.png",
        cta: "Get Proposal",
        order: 3,
      },
    ],
  });

  // Tools & Technologies Section
  const [toolsSection, setToolsSection] = useState<ToolsSection>({
    title: "Tools & Technologies",
    certifications: [
      {
        id: "1",
        name: "SOC 2",
        image: "/images/services/admin-support/Tools-01.png",
        alt: "SOC 2 Type 2",
      },
      {
        id: "2",
        name: "ISO 27001",
        image: "/images/services/admin-support/Tools-02.png",
        alt: "ISO 27001",
      },
      {
        id: "3",
        name: "HIPAA",
        image: "/images/services/admin-support/Tools-03.png",
        alt: "HIPAA Compliance",
      },
      {
        id: "4",
        name: "CMMI",
        image: "/images/services/admin-support/Tools-04.png",
        alt: "CMMI Level",
      },
      {
        id: "5",
        name: "GDPR",
        image: "/images/services/admin-support/Tools-05.png",
        alt: "GDPR Certified",
      },
      {
        id: "6",
        name: "ISO 9001",
        image: "/images/services/admin-support/Tools-06.png",
        alt: "ISO 9001",
      },
    ],
  });

  // Elevates Every Section
  const [elevatesSection, setElevatesSection] = useState<ElevatesSection>({
    title: "AI That Elevates Every Output",
    centerImageSrc: "/images/services/admin-support/Sytem.png",
    centerImageAlt: "AI Platform Interface",
    leftFeatures: [
      {
        id: "1",
        icon: "/images/services/admin-support/zero.png",
        title: "Auto Layout Optimization",
      },
      {
        id: "2",
        icon: "/images/services/admin-support/zero-2.png",
        title: "Accessibility Intelligence",
      },
      {
        id: "3",
        icon: "/images/services/admin-support/zero-3.png",
        title: "Design QA Automation",
      },
    ],
    rightFeatures: [
      {
        id: "4",
        icon: "/images/services/admin-support/zero-4.png",
        title: "Motion Storyboard Generation",
      },
      {
        id: "5",
        icon: "/images/services/admin-support/zero-5.png",
        title: "Asset Version Diffing",
      },
      {
        id: "6",
        icon: "/images/services/admin-support/zero-5.png",
        title: "Faster Review Cycles",
      },
    ],
  });

  // Portfolio Showcase Section
  const [portfolioSection, setPortfolioSection] = useState<PortfolioSection>({
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

  // Why Oscorm Section
  const [whyOscormSection, setWhyOscormSection] = useState<WhyOscormSection>({
    title: "Why Oscorm for Admin Support?",
    features: [
      {
        id: "1",
        title: "Dedicated Support Team + PM + QA",
        description: "You get a complete support unit instead of just a lone freelancer.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Dedicated Support Specialist to do the actual work",
          "Project Manager for clarity, planning & deadlines",
          "QA Specialist to ensure consistency, brand alignment & error-free delivery",
        ],
      },
      {
        id: "2",
        title: "Cross-Skill Support (Multi-Channel + Data + Research)",
        description: "You don't need to hire multiple freelancers. All under one roof:",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Customer Support",
          "Data Processing",
          "Executive Assistance",
          "Research & Analysis",
          "CRM & Back-Office",
        ],
      },
      {
        id: "3",
        title: "AI QC for Quality Consistency & Accuracy",
        description: "Your support tasks are not just human-reviewed.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "Data accuracy checks",
          "Process consistency",
          "Quality assurance automation",
          "Error detection & prevention",
          "Performance monitoring",
        ],
      },
      {
        id: "4",
        title: "Fast Turnaround & Flexible Team Scale-Up",
        description: "Scale instantly whether you need one specialist or a full 8-member pod.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80",
        bulletPoints: [
          "AI-assisted workflows",
          "In-house teams",
          "Streamlined internal systems",
        ],
      },
    ],
  });

  const [editingSection, setEditingSection] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editingTrustedBy, setEditingTrustedBy] = useState(false);
  const [editingDeliver, setEditingDeliver] = useState(false);
  const [editingWhyAvoid, setEditingWhyAvoid] = useState(false);
  const [editingProven, setEditingProven] = useState(false);
  const [editingTracking, setEditingTracking] = useState(false);
  const [editingEngagement, setEditingEngagement] = useState(false);
  const [editingTools, setEditingTools] = useState(false);
  const [editingElevates, setEditingElevates] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(false);
  const [editingWhyOscorm, setEditingWhyOscorm] = useState(false);

  const handleSectionSave = () => {
    setEditingSection(false);
    console.log("Service section saved:", serviceSection);
  };

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
      price: "Custom Pricing",
      link: "/services/new",
      order: serviceCards.length + 1,
      isActive: true,
    };
    setServiceCards([...serviceCards, newCard]);
  };

  const handleDeleteCard = (cardId: string) => {
    setServiceCards(serviceCards.filter(c => c.id !== cardId));
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

  const handleTrustedBySave = () => {
    setEditingTrustedBy(false);
    console.log("Trusted by section saved:", trustedBySection);
  };

  const handleAddLogo = () => {
    setTrustedBySection({
      ...trustedBySection,
      logos: [...trustedBySection.logos, "/images/home/Industry/sec-new.png"],
    });
  };

  const handleRemoveLogo = (logoIndex: number) => {
    setTrustedBySection({
      ...trustedBySection,
      logos: trustedBySection.logos.filter((_, i) => i !== logoIndex),
    });
  };

  // What We Deliver Handlers
  const handleDeliverSave = () => {
    setEditingDeliver(false);
    console.log("Deliver services saved:", deliverServices);
  };

  const handleAddDeliverService = () => {
    const newService: DeliverableService = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      icon: "Settings",
      isActive: true,
    };
    setDeliverServices([...deliverServices, newService]);
  };

  const handleDeleteDeliverService = (id: string) => {
    setDeliverServices(deliverServices.filter(s => s.id !== id));
  };

  // Why Avoid Handlers
  const handleWhyAvoidSave = () => {
    setEditingWhyAvoid(false);
    console.log("Why avoid section saved:", whyAvoidSection);
  };

  const handleAddComparisonRow = () => {
    const newRow: ComparisonRow = {
      id: Date.now().toString(),
      requirement: "New Requirement",
      freelancerIcon: "✕",
      freelancerText: "Freelancer text",
      freelancerColor: "red",
      oscormIcon: "✓",
      oscormText: "Oscorm text",
      oscormColor: "green",
    };
    setWhyAvoidSection({
      ...whyAvoidSection,
      comparisonData: [...whyAvoidSection.comparisonData, newRow],
    });
  };

  const handleDeleteComparisonRow = (id: string) => {
    setWhyAvoidSection({
      ...whyAvoidSection,
      comparisonData: whyAvoidSection.comparisonData.filter(r => r.id !== id),
    });
  };

  // Proven Delivery Handlers
  const handleProvenSave = () => {
    setEditingProven(false);
    console.log("Proven section saved:", provenSection);
  };

  const handleAddProvenStep = () => {
    const newStep: ProvenStep = {
      id: Date.now().toString(),
      title: "New Step",
      description: "Step description",
      image: "/images/services/admin-support/Model-new.png",
      order: provenSection.steps.length + 1,
    };
    setProvenSection({
      ...provenSection,
      steps: [...provenSection.steps, newStep],
    });
  };

  const handleDeleteProvenStep = (id: string) => {
    setProvenSection({
      ...provenSection,
      steps: provenSection.steps.filter(s => s.id !== id),
    });
  };

  // Tracking Handlers
  const handleTrackingSave = () => {
    setEditingTracking(false);
    console.log("Tracking section saved:", trackingSection);
  };

  const handleAddTrackingFeature = () => {
    const newFeature: TrackingFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/feature-new.png",
      title: "New Feature",
      description: "Feature description",
    };
    setTrackingSection({
      ...trackingSection,
      features: [...trackingSection.features, newFeature],
    });
  };

  const handleDeleteTrackingFeature = (id: string) => {
    setTrackingSection({
      ...trackingSection,
      features: trackingSection.features.filter(f => f.id !== id),
    });
  };

  // Engagement Handlers
  const handleEngagementSave = () => {
    setEditingEngagement(false);
    console.log("Engagement section saved:", engagementSection);
  };

  const handleAddEngagementSlide = () => {
    const newSlide: EngagementSlide = {
      id: Date.now().toString(),
      title: "New Engagement Model",
      subtitle: "Subtitle",
      description: "Description",
      image: "/images/services/admin-support/Engagement-new.png",
      cta: "Learn More",
      order: engagementSection.slides.length + 1,
    };
    setEngagementSection({
      ...engagementSection,
      slides: [...engagementSection.slides, newSlide],
    });
  };

  const handleDeleteEngagementSlide = (id: string) => {
    setEngagementSection({
      ...engagementSection,
      slides: engagementSection.slides.filter(s => s.id !== id),
    });
  };

  // Tools Handlers
  const handleToolsSave = () => {
    setEditingTools(false);
    console.log("Tools section saved:", toolsSection);
  };

  const handleAddCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "New Certification",
      image: "/images/services/admin-support/Tools-new.png",
      alt: "New Certification",
    };
    setToolsSection({
      ...toolsSection,
      certifications: [...toolsSection.certifications, newCert],
    });
  };

  const handleDeleteCertification = (id: string) => {
    setToolsSection({
      ...toolsSection,
      certifications: toolsSection.certifications.filter(c => c.id !== id),
    });
  };

  // Elevates Handlers
  const handleElevatesSave = () => {
    setEditingElevates(false);
    console.log("Elevates section saved:", elevatesSection);
  };

  const handleAddLeftFeature = () => {
    const newFeature: ElevateFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/zero-new.png",
      title: "New Feature",
    };
    setElevatesSection({
      ...elevatesSection,
      leftFeatures: [...elevatesSection.leftFeatures, newFeature],
    });
  };

  const handleAddRightFeature = () => {
    const newFeature: ElevateFeature = {
      id: Date.now().toString(),
      icon: "/images/services/admin-support/zero-new.png",
      title: "New Feature",
    };
    setElevatesSection({
      ...elevatesSection,
      rightFeatures: [...elevatesSection.rightFeatures, newFeature],
    });
  };

  const handleDeleteLeftFeature = (id: string) => {
    setElevatesSection({
      ...elevatesSection,
      leftFeatures: elevatesSection.leftFeatures.filter(f => f.id !== id),
    });
  };

  const handleDeleteRightFeature = (id: string) => {
    setElevatesSection({
      ...elevatesSection,
      rightFeatures: elevatesSection.rightFeatures.filter(f => f.id !== id),
    });
  };

  // Portfolio Handlers
  const handlePortfolioSave = () => {
    setEditingPortfolio(false);
    console.log("Portfolio section saved:", portfolioSection);
  };

  const handleAddPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      brand: "New Brand",
      heading: "New Heading",
      title: "New portfolio item title",
      image: "/images/services/admin-support/portfolio-new.png",
    };
    setPortfolioSection({
      ...portfolioSection,
      items: [...portfolioSection.items, newItem],
    });
  };

  const handleDeletePortfolioItem = (id: string) => {
    setPortfolioSection({
      ...portfolioSection,
      items: portfolioSection.items.filter(i => i.id !== id),
    });
  };

  // Why Oscorm Handlers
  const handleWhyOscormSave = () => {
    setEditingWhyOscorm(false);
    console.log("Why Oscorm section saved:", whyOscormSection);
  };

  const handleAddWhyOscormFeature = () => {
    const newFeature: WhyOscormFeature = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Feature description",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
      bulletPoints: ["Point 1", "Point 2"],
    };
    setWhyOscormSection({
      ...whyOscormSection,
      features: [...whyOscormSection.features, newFeature],
    });
  };

  const handleDeleteWhyOscormFeature = (id: string) => {
    setWhyOscormSection({
      ...whyOscormSection,
      features: whyOscormSection.features.filter(f => f.id !== id),
    });
  };

  const handleAddBulletPoint = (featureId: string) => {
    setWhyOscormSection({
      ...whyOscormSection,
      features: whyOscormSection.features.map(f =>
        f.id === featureId
          ? { ...f, bulletPoints: [...f.bulletPoints, "New point"] }
          : f
      ),
    });
  };

  const handleRemoveBulletPoint = (featureId: string, index: number) => {
    setWhyOscormSection({
      ...whyOscormSection,
      features: whyOscormSection.features.map(f =>
        f.id === featureId
          ? { ...f, bulletPoints: f.bulletPoints.filter((_, i) => i !== index) }
          : f
      ),
    });
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
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Service Page Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage service section header and service cards
                </p>
              </div>
            </div>
          </motion.div>

          {/* Service Section Header */}
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
                    <CardTitle>Service Section Header</CardTitle>
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
                        value={serviceSection.title}
                        onChange={(e) => setServiceSection({ ...serviceSection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                        value={serviceSection.description}
                        onChange={(e) => setServiceSection({ ...serviceSection, description: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">{serviceSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{serviceSection.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Cards */}
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
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => setEditingCard(card.id)} size="sm" variant="outline">
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
                          <div>
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
                          <p className="text-sm font-semibold text-primary mb-2">{card.price}</p>
                          <p className="text-xs text-muted-foreground">Link: {card.link}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trusted By Industry Leaders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle>Trusted by Industry Leaders</CardTitle>
                  </div>
                  {!editingTrustedBy ? (
                    <Button onClick={() => setEditingTrustedBy(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={handleTrustedBySave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingTrustedBy ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={trustedBySection.title}
                        onChange={(e) => setTrustedBySection({ ...trustedBySection, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={trustedBySection.subtitle}
                        onChange={(e) => setTrustedBySection({ ...trustedBySection, subtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Company Logos</Label>
                        <Button onClick={handleAddLogo} size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Logo
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {trustedBySection.logos.map((logo, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <Input
                              value={logo}
                              onChange={(e) => {
                                const updated = trustedBySection.logos.map((l, i) =>
                                  i === idx ? e.target.value : l
                                );
                                setTrustedBySection({ ...trustedBySection, logos: updated });
                              }}
                              placeholder="/images/home/Industry/sec-X.png"
                            />
                            <Button
                              onClick={() => handleRemoveLogo(idx)}
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
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{trustedBySection.title}</h3>
                      <p className="text-muted-foreground mt-2">{trustedBySection.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {trustedBySection.logos.map((logo, idx) => (
                        <div
                          key={idx}
                          className="border rounded-lg p-4 bg-muted/50 flex items-center justify-center h-24"
                        >
                          <span className="text-xs text-muted-foreground truncate w-full text-center">
                            {logo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* What We Deliver Section */}
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
                    {!editingDeliver ? (
                      <Button onClick={() => setEditingDeliver(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleDeliverSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingDeliver && (
                      <Button onClick={handleAddDeliverService} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deliverServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      {editingDeliver ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={service.title}
                              onChange={(e) => {
                                const updated = deliverServices.map(s =>
                                  s.id === service.id ? { ...s, title: e.target.value } : s
                                );
                                setDeliverServices(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={service.description}
                              onChange={(e) => {
                                const updated = deliverServices.map(s =>
                                  s.id === service.id ? { ...s, description: e.target.value } : s
                                );
                                setDeliverServices(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Icon Name</Label>
                            <Input
                              value={service.icon}
                              onChange={(e) => {
                                const updated = deliverServices.map(s =>
                                  s.id === service.id ? { ...s, icon: e.target.value } : s
                                );
                                setDeliverServices(updated);
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => handleDeleteDeliverService(service.id)}
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

          {/* Why Avoid Freelancers Section */}
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
                    {!editingWhyAvoid ? (
                      <Button onClick={() => setEditingWhyAvoid(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleWhyAvoidSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingWhyAvoid && (
                      <Button onClick={handleAddComparisonRow} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Row
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingWhyAvoid ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={whyAvoidSection.title}
                          onChange={(e) => setWhyAvoidSection({ ...whyAvoidSection, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={whyAvoidSection.subtitle}
                          onChange={(e) => setWhyAvoidSection({ ...whyAvoidSection, subtitle: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {whyAvoidSection.comparisonData.map((row) => (
                        <div key={row.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Requirement</Label>
                            <Input
                              value={row.requirement}
                              onChange={(e) => {
                                const updated = whyAvoidSection.comparisonData.map(r =>
                                  r.id === row.id ? { ...r, requirement: e.target.value } : r
                                );
                                setWhyAvoidSection({ ...whyAvoidSection, comparisonData: updated });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Freelancer Text</Label>
                              <Input
                                value={row.freelancerText}
                                onChange={(e) => {
                                  const updated = whyAvoidSection.comparisonData.map(r =>
                                    r.id === row.id ? { ...r, freelancerText: e.target.value } : r
                                  );
                                  setWhyAvoidSection({ ...whyAvoidSection, comparisonData: updated });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Oscorm Text</Label>
                              <Input
                                value={row.oscormText}
                                onChange={(e) => {
                                  const updated = whyAvoidSection.comparisonData.map(r =>
                                    r.id === row.id ? { ...r, oscormText: e.target.value } : r
                                  );
                                  setWhyAvoidSection({ ...whyAvoidSection, comparisonData: updated });
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
                    <h3 className="text-2xl font-bold">{whyAvoidSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{whyAvoidSection.subtitle}</p>
                    <div className="mt-4 space-y-2">
                      {whyAvoidSection.comparisonData.map((row) => (
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

          {/* Proven Delivery Model Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    <CardTitle>Proven Delivery Model</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {!editingProven ? (
                      <Button onClick={() => setEditingProven(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleProvenSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingProven && (
                      <Button onClick={handleAddProvenStep} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Step
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingProven ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={provenSection.title}
                          onChange={(e) => setProvenSection({ ...provenSection, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={provenSection.subtitle}
                          onChange={(e) => setProvenSection({ ...provenSection, subtitle: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {provenSection.steps.map((step) => (
                        <div key={step.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Step Title</Label>
                            <Input
                              value={step.title}
                              onChange={(e) => {
                                const updated = provenSection.steps.map(s =>
                                  s.id === step.id ? { ...s, title: e.target.value } : s
                                );
                                setProvenSection({ ...provenSection, steps: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={step.description}
                              onChange={(e) => {
                                const updated = provenSection.steps.map(s =>
                                  s.id === step.id ? { ...s, description: e.target.value } : s
                                );
                                setProvenSection({ ...provenSection, steps: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={step.image}
                              onChange={(e) => {
                                const updated = provenSection.steps.map(s =>
                                  s.id === step.id ? { ...s, image: e.target.value } : s
                                );
                                setProvenSection({ ...provenSection, steps: updated });
                              }}
                            />
                            {step.image && (
                              <div className="relative w-full h-32 mt-2 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={() => handleDeleteProvenStep(step.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete Step
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">{provenSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{provenSection.subtitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {provenSection.steps.map((step) => (
                        <div key={step.id} className="border rounded-lg p-4">
                          <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-muted">
                            {step.image ? (
                              <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Real-Time Tracking Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    <CardTitle>Real-Time Tracking System</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {!editingTracking ? (
                      <Button onClick={() => setEditingTracking(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleTrackingSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingTracking && (
                      <Button onClick={handleAddTrackingFeature} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingTracking ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={trackingSection.title}
                          onChange={(e) => setTrackingSection({ ...trackingSection, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={trackingSection.subtitle}
                          onChange={(e) => setTrackingSection({ ...trackingSection, subtitle: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Main Image URL</Label>
                        <Input
                          value={trackingSection.mainImageSrc}
                          onChange={(e) => setTrackingSection({ ...trackingSection, mainImageSrc: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Main Image Alt Text</Label>
                        <Input
                          value={trackingSection.mainImageAlt}
                          onChange={(e) => setTrackingSection({ ...trackingSection, mainImageAlt: e.target.value })}
                        />
                      </div>
                      {trackingSection.mainImageSrc && (
                        <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={trackingSection.mainImageSrc}
                            alt={trackingSection.mainImageAlt}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {trackingSection.features.map((feature) => (
                        <div key={feature.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Feature Title</Label>
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const updated = trackingSection.features.map(f =>
                                  f.id === feature.id ? { ...f, title: e.target.value } : f
                                );
                                setTrackingSection({ ...trackingSection, features: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[60px] px-3 py-2 border rounded-md"
                              value={feature.description}
                              onChange={(e) => {
                                const updated = trackingSection.features.map(f =>
                                  f.id === feature.id ? { ...f, description: e.target.value } : f
                                );
                                setTrackingSection({ ...trackingSection, features: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Icon URL</Label>
                            <Input
                              value={feature.icon}
                              onChange={(e) => {
                                const updated = trackingSection.features.map(f =>
                                  f.id === feature.id ? { ...f, icon: e.target.value } : f
                                );
                                setTrackingSection({ ...trackingSection, features: updated });
                              }}
                            />
                            {feature.icon && (
                              <div className="relative w-16 h-16 mt-2 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={feature.icon}
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={() => handleDeleteTrackingFeature(feature.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete Feature
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">{trackingSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{trackingSection.subtitle}</p>
                    <div className="relative w-full h-64 md:h-96 mt-4 mb-6 rounded-lg overflow-hidden bg-muted">
                      {trackingSection.mainImageSrc ? (
                        <Image
                          src={trackingSection.mainImageSrc}
                          alt={trackingSection.mainImageAlt}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Main Image
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {trackingSection.features.map((feature) => (
                        <div key={feature.id} className="border rounded-lg p-4">
                          <div className="relative w-16 h-16 mb-3 rounded-md overflow-hidden bg-muted">
                            {feature.icon ? (
                              <Image
                                src={feature.icon}
                                alt={feature.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No Icon
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Engagement Slider Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    <CardTitle>Engagement Models</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {!editingEngagement ? (
                      <Button onClick={() => setEditingEngagement(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleEngagementSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingEngagement && (
                      <Button onClick={handleAddEngagementSlide} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Slide
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingEngagement ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={engagementSection.sectionTitle}
                        onChange={(e) => setEngagementSection({ ...engagementSection, sectionTitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-4">
                      {engagementSection.slides.map((slide) => (
                        <div key={slide.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Slide Title</Label>
                            <Input
                              value={slide.title}
                              onChange={(e) => {
                                const updated = engagementSection.slides.map(s =>
                                  s.id === slide.id ? { ...s, title: e.target.value } : s
                                );
                                setEngagementSection({ ...engagementSection, slides: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Subtitle</Label>
                            <Input
                              value={slide.subtitle}
                              onChange={(e) => {
                                const updated = engagementSection.slides.map(s =>
                                  s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                                );
                                setEngagementSection({ ...engagementSection, slides: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                              value={slide.description}
                              onChange={(e) => {
                                const updated = engagementSection.slides.map(s =>
                                  s.id === slide.id ? { ...s, description: e.target.value } : s
                                );
                                setEngagementSection({ ...engagementSection, slides: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={slide.image}
                              onChange={(e) => {
                                const updated = engagementSection.slides.map(s =>
                                  s.id === slide.id ? { ...s, image: e.target.value } : s
                                );
                                setEngagementSection({ ...engagementSection, slides: updated });
                              }}
                            />
                            {slide.image && (
                              <div className="relative w-full h-32 mt-2 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={slide.image}
                                  alt={slide.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={() => handleDeleteEngagementSlide(slide.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete Slide
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{engagementSection.sectionTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {engagementSection.slides.map((slide) => (
                        <div key={slide.id} className="border rounded-lg p-4">
                          <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-muted">
                            {slide.image ? (
                              <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold mb-2">{slide.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{slide.subtitle}</p>
                          <p className="text-xs text-muted-foreground">{slide.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tools & Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <CardTitle>Tools & Technologies</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {!editingTools ? (
                      <Button onClick={() => setEditingTools(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleToolsSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingTools && (
                      <Button onClick={handleAddCertification} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certification
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingTools ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={toolsSection.title}
                        onChange={(e) => setToolsSection({ ...toolsSection, title: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {toolsSection.certifications.map((cert) => (
                        <div key={cert.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Certification Name</Label>
                            <Input
                              value={cert.name}
                              onChange={(e) => {
                                const updated = toolsSection.certifications.map(c =>
                                  c.id === cert.id ? { ...c, name: e.target.value } : c
                                );
                                setToolsSection({ ...toolsSection, certifications: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={cert.image}
                              onChange={(e) => {
                                const updated = toolsSection.certifications.map(c =>
                                  c.id === cert.id ? { ...c, image: e.target.value } : c
                                );
                                setToolsSection({ ...toolsSection, certifications: updated });
                              }}
                            />
                            {cert.image && (
                              <div className="relative w-full h-24 mt-2 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={cert.image}
                                  alt={cert.alt}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <Label>Alt Text</Label>
                            <Input
                              value={cert.alt}
                              onChange={(e) => {
                                const updated = toolsSection.certifications.map(c =>
                                  c.id === cert.id ? { ...c, alt: e.target.value } : c
                                );
                                setToolsSection({ ...toolsSection, certifications: updated });
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => handleDeleteCertification(cert.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{toolsSection.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {toolsSection.certifications.map((cert) => (
                        <div key={cert.id} className="border rounded-lg p-4 text-center">
                          <div className="relative w-full h-24 mb-3 rounded-md overflow-hidden bg-muted">
                            {cert.image ? (
                              <Image
                                src={cert.image}
                                alt={cert.alt}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-semibold">{cert.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Elevates Every Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>AI That Elevates Every Output</CardTitle>
                  </div>
                  {!editingElevates ? (
                    <Button onClick={() => setEditingElevates(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={handleElevatesSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingElevates ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={elevatesSection.title}
                        onChange={(e) => setElevatesSection({ ...elevatesSection, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Center Image URL</Label>
                        <Input
                          value={elevatesSection.centerImageSrc}
                          onChange={(e) => setElevatesSection({ ...elevatesSection, centerImageSrc: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Center Image Alt Text</Label>
                        <Input
                          value={elevatesSection.centerImageAlt}
                          onChange={(e) => setElevatesSection({ ...elevatesSection, centerImageAlt: e.target.value })}
                        />
                      </div>
                      {elevatesSection.centerImageSrc && (
                        <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={elevatesSection.centerImageSrc}
                            alt={elevatesSection.centerImageAlt}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Left Features</Label>
                          <Button onClick={handleAddLeftFeature} size="sm" variant="outline">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        {elevatesSection.leftFeatures.map((feature) => (
                          <div key={feature.id} className="border rounded-lg p-3 space-y-2">
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const updated = elevatesSection.leftFeatures.map(f =>
                                  f.id === feature.id ? { ...f, title: e.target.value } : f
                                );
                                setElevatesSection({ ...elevatesSection, leftFeatures: updated });
                              }}
                            />
                            <div className="flex gap-2">
                              <Input
                                value={feature.icon}
                                onChange={(e) => {
                                  const updated = elevatesSection.leftFeatures.map(f =>
                                    f.id === feature.id ? { ...f, icon: e.target.value } : f
                                  );
                                  setElevatesSection({ ...elevatesSection, leftFeatures: updated });
                                }}
                                placeholder="Icon URL"
                              />
                              {feature.icon && (
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                  <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <Button
                                onClick={() => handleDeleteLeftFeature(feature.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Right Features</Label>
                          <Button onClick={handleAddRightFeature} size="sm" variant="outline">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        {elevatesSection.rightFeatures.map((feature) => (
                          <div key={feature.id} className="border rounded-lg p-3 space-y-2">
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const updated = elevatesSection.rightFeatures.map(f =>
                                  f.id === feature.id ? { ...f, title: e.target.value } : f
                                );
                                setElevatesSection({ ...elevatesSection, rightFeatures: updated });
                              }}
                            />
                            <div className="flex gap-2">
                              <Input
                                value={feature.icon}
                                onChange={(e) => {
                                  const updated = elevatesSection.rightFeatures.map(f =>
                                    f.id === feature.id ? { ...f, icon: e.target.value } : f
                                  );
                                  setElevatesSection({ ...elevatesSection, rightFeatures: updated });
                                }}
                                placeholder="Icon URL"
                              />
                              {feature.icon && (
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                  <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <Button
                                onClick={() => handleDeleteRightFeature(feature.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{elevatesSection.title}</h3>
                    <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-muted">
                      {elevatesSection.centerImageSrc ? (
                        <Image
                          src={elevatesSection.centerImageSrc}
                          alt={elevatesSection.centerImageAlt}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Center Image
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        {elevatesSection.leftFeatures.map((feature) => (
                          <div key={feature.id} className="border rounded p-3 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              {feature.icon ? (
                                <Image
                                  src={feature.icon}
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                  No Icon
                                </div>
                              )}
                            </div>
                            <p className="font-semibold">{feature.title}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {elevatesSection.rightFeatures.map((feature) => (
                          <div key={feature.id} className="border rounded p-3 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              {feature.icon ? (
                                <Image
                                  src={feature.icon}
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                  No Icon
                                </div>
                              )}
                            </div>
                            <p className="font-semibold">{feature.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Showcase Section */}
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
                    {!editingPortfolio ? (
                      <Button onClick={() => setEditingPortfolio(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handlePortfolioSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingPortfolio && (
                      <Button onClick={handleAddPortfolioItem} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingPortfolio ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={portfolioSection.title}
                          onChange={(e) => setPortfolioSection({ ...portfolioSection, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={portfolioSection.subtitle}
                          onChange={(e) => setPortfolioSection({ ...portfolioSection, subtitle: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioSection.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Brand</Label>
                            <Input
                              value={item.brand}
                              onChange={(e) => {
                                const updated = portfolioSection.items.map(i =>
                                  i.id === item.id ? { ...i, brand: e.target.value } : i
                                );
                                setPortfolioSection({ ...portfolioSection, items: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Heading</Label>
                            <Input
                              value={item.heading}
                              onChange={(e) => {
                                const updated = portfolioSection.items.map(i =>
                                  i.id === item.id ? { ...i, heading: e.target.value } : i
                                );
                                setPortfolioSection({ ...portfolioSection, items: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => {
                                const updated = portfolioSection.items.map(i =>
                                  i.id === item.id ? { ...i, title: e.target.value } : i
                                );
                                setPortfolioSection({ ...portfolioSection, items: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={item.image}
                              onChange={(e) => {
                                const updated = portfolioSection.items.map(i =>
                                  i.id === item.id ? { ...i, image: e.target.value } : i
                                );
                                setPortfolioSection({ ...portfolioSection, items: updated });
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
                            onClick={() => handleDeletePortfolioItem(item.id)}
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
                    <h3 className="text-2xl font-bold">{portfolioSection.title}</h3>
                    <p className="text-muted-foreground mt-2">{portfolioSection.subtitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      {portfolioSection.items.map((item) => (
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

          {/* Why Oscorm Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle>Why Oscorm</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {!editingWhyOscorm ? (
                      <Button onClick={() => setEditingWhyOscorm(true)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleWhyOscormSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                    {editingWhyOscorm && (
                      <Button onClick={handleAddWhyOscormFeature} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingWhyOscorm ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={whyOscormSection.title}
                        onChange={(e) => setWhyOscormSection({ ...whyOscormSection, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-6">
                      {whyOscormSection.features.map((feature) => (
                        <div key={feature.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <Label>Feature Title</Label>
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const updated = whyOscormSection.features.map(f =>
                                  f.id === feature.id ? { ...f, title: e.target.value } : f
                                );
                                setWhyOscormSection({ ...whyOscormSection, features: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <textarea
                              className="w-full min-h-[60px] px-3 py-2 border rounded-md"
                              value={feature.description}
                              onChange={(e) => {
                                const updated = whyOscormSection.features.map(f =>
                                  f.id === feature.id ? { ...f, description: e.target.value } : f
                                );
                                setWhyOscormSection({ ...whyOscormSection, features: updated });
                              }}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={feature.image}
                              onChange={(e) => {
                                const updated = whyOscormSection.features.map(f =>
                                  f.id === feature.id ? { ...f, image: e.target.value } : f
                                );
                                setWhyOscormSection({ ...whyOscormSection, features: updated });
                              }}
                            />
                            {feature.image && (
                              <div className="relative w-full h-48 mt-2 rounded-md overflow-hidden bg-muted">
                                <SafeImage
                                  src={feature.image}
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Bullet Points</Label>
                              <Button
                                onClick={() => handleAddBulletPoint(feature.id)}
                                size="sm"
                                variant="outline"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Point
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {feature.bulletPoints.map((point, idx) => (
                                <div key={idx} className="flex gap-2">
                                  <Input
                                    value={point}
                                    onChange={(e) => {
                                      const updated = whyOscormSection.features.map(f =>
                                        f.id === feature.id
                                          ? {
                                              ...f,
                                              bulletPoints: f.bulletPoints.map((p, i) =>
                                                i === idx ? e.target.value : p
                                              ),
                                            }
                                          : f
                                      );
                                      setWhyOscormSection({ ...whyOscormSection, features: updated });
                                    }}
                                  />
                                  <Button
                                    onClick={() => handleRemoveBulletPoint(feature.id, idx)}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDeleteWhyOscormFeature(feature.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete Feature
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{whyOscormSection.title}</h3>
                    <div className="space-y-6">
                      {whyOscormSection.features.map((feature) => (
                        <div key={feature.id} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="relative w-full h-64 rounded-md overflow-hidden bg-muted">
                              {feature.image ? (
                                <SafeImage
                                  src={feature.image}
                                  alt={feature.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                              <p className="text-muted-foreground mb-3">{feature.description}</p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {feature.bulletPoints.map((point, idx) => (
                                  <li key={idx}>{point}</li>
                                ))}
                              </ul>
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
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


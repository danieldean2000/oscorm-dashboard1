"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Users,
  Settings,
  BarChart3,
  Tag,
  MessageSquare,
  Home,
  Briefcase,
  UserPlus,
  Globe,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MenuItem {
  icon: any;
  label: string;
  href?: string;
  roles: string[];
  subItems?: { label: string; href: string }[];
}

const adminMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", roles: ["admin", "blog_user"] },
  { icon: FileText, label: "Posts", href: "/posts", roles: ["admin", "blog_user"] },
  { icon: PlusCircle, label: "New Post", href: "/posts/new", roles: ["admin", "blog_user"] },
  { icon: Tag, label: "Categories", href: "/categories", roles: ["admin"] },
  { icon: MessageSquare, label: "Comments", href: "/comments", roles: ["admin"] },
  { icon: Users, label: "Users", href: "/users", roles: ["admin"] },
  { icon: Globe, label: "Website Manage", href: "/website-manage", roles: ["admin"] },
  {
    icon: Briefcase,
    label: "Service Page",
    href: "/website-manage/service",
    roles: ["admin"],
    subItems: [
      { label: "Service", href: "/website-manage/service" },
      { label: "Main Category", href: "/website-manage/service/main-category" },
      { label: "Category", href: "/website-manage/service/category" },
      { label: "Sub Category", href: "/website-manage/service/sub-category" },
    ],
  },
  { icon: Home, label: "Home Page", href: "/website-manage/home", roles: ["admin"] },
  { icon: UserPlus, label: "Hire Us Page", href: "/website-manage/hire-us", roles: ["admin"] },
  { icon: HelpCircle, label: "FAQ Page", href: "/website-manage/faq", roles: ["admin"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  // Auto-open dropdown if current path matches a sub-item
  useEffect(() => {
    const openSet = new Set<string>();
    adminMenuItems.forEach((item) => {
      if (item.subItems && item.href) {
        const hasActiveSubItem = item.subItems.some((subItem) => 
          pathname === subItem.href || pathname.startsWith(subItem.href + "/")
        );
        if (hasActiveSubItem) {
          openSet.add(item.href);
        }
      }
    });
    setOpenDropdowns(openSet);
  }, [pathname]);

  // Filter menu items based on user role
  const menuItems = adminMenuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  const handleLogout = () => {
    logout();
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  const isDropdownOpen = (href: string) => openDropdowns.has(href);

  const isSubItemActive = (subItemHref: string) => {
    return pathname === subItemHref || pathname.startsWith(subItemHref + "/");
  };

  const isParentActive = (item: MenuItem) => {
    if (item.subItems) {
      return item.subItems.some((subItem) => isSubItemActive(subItem.href));
    }
    if (!item.href) return false;
    return pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-3 top-3 sm:left-4 sm:top-4 z-50 lg:hidden h-9 w-9 sm:h-10 sm:w-10 bg-background/80 backdrop-blur-sm border shadow-sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 sm:w-80 lg:w-72 border-r bg-card shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col p-3 sm:p-4 overflow-y-auto">
          {/* Logo & User Info */}
          <div className="mb-6 sm:mb-8 px-3 sm:px-4 pt-16 sm:pt-20 lg:pt-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Content Management
            </p>
            {user && (
              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="text-xs sm:text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role === "blog_user" ? "Blog User" : "Admin"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isActive = isParentActive(item);
              const isOpen = hasSubItems && isDropdownOpen(item.href || "");

              return (
                <motion.div
                  key={item.href || item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    {hasSubItems ? (
                      <>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          onClick={() => toggleDropdown(item.href || "")}
                          className={cn(
                            "w-full justify-between gap-3 text-sm lg:text-base",
                            isActive && "bg-secondary"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 transition-transform" />
                          )}
                        </Button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-1 space-y-1 border-l pl-4">
                                {item.subItems?.map((subItem) => {
                                  const isSubActive = isSubItemActive(subItem.href);
                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <Button
                                        variant={isSubActive ? "secondary" : "ghost"}
                                        className={cn(
                                          "w-full justify-start gap-3 text-sm lg:text-base",
                                          isSubActive && "bg-secondary"
                                        )}
                                      >
                                        <span className="text-sm lg:text-base">{subItem.label}</span>
                                      </Button>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 text-sm lg:text-base",
                            isActive && "bg-secondary",
                            item.href?.startsWith("/website-manage") && item.href !== "/website-manage" && "ml-4"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t pt-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sm lg:text-base text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Logout</span>
            </Button>
            <div className="px-4 text-xs text-muted-foreground">
              <p>© 2024 Blog Dashboard</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}


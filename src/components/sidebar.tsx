"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Section {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  sponsorsLabel?: string;
}

export function Sidebar({
  sections,
  activeSection,
  onNavigate,
  isOpen,
  onClose,
  sponsorsLabel = "Sponsors",
}: SidebarProps) {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith("/es");
  const handleNavigate = (id: string) => {
    onNavigate(id);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 w-[280px] h-screen bg-sidebar border-r border-sidebar-border z-50",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl text-primary tracking-tight">3x10</h1>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {sponsorsLabel}
                </span>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <Separator className="mb-6" />

            {/* Navigation */}
            <nav>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleNavigate(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-all",
                        "border border-transparent",
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground"
                          : "text-foreground/80 hover:border-primary/30 hover:text-primary",
                      )}
                    >
                      <span className="text-xs mr-2 opacity-50">
                        {section.icon}
                      </span>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <Separator className="my-6" />

            {/* Footer */}
            <div className="text-xs text-muted-foreground">
              <Link
                href={isSpanish ? "/" : "/es"}
                className="hover:text-primary transition-colors"
              >
                {isSpanish ? "English →" : "Español →"}
              </Link>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function LandingContent() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: "hero", labelKey: "sidebar.hero", icon: "→" },
    { id: "program", labelKey: "sidebar.program", icon: "→" },
    { id: "target", labelKey: "sidebar.target", icon: "→" },
    { id: "sponsorship", labelKey: "sidebar.sponsorship", icon: "→" },
    { id: "dates", labelKey: "sidebar.dates", icon: "→" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    ["hero", "program", "target", "sponsorship", "dates"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sections={sections.map((s) => ({ ...s, label: t(s.labelKey) }))}
        activeSection={activeSection}
        onNavigate={scrollTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sponsorsLabel={t("sidebar.sponsors")}
      />

      <header className="fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-sidebar-border z-30 flex items-center px-4 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="text-xl text-primary tracking-tight ml-3">3x10</h1>
      </header>

      <main className="flex-1 lg:ml-[280px] p-4 lg:p-8 max-w-4xl pt-20 lg:pt-8">
        {/* Hero */}
        <section id="hero" className="mb-16 pt-8">
          <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
            {t("hero.title")}
          </h2>
          <p className="text-lg text-primary mb-2">{t("hero.tagline")}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {t("hero.subtitle")}
          </p>
          <p className="text-sm font-medium mb-4">{t("hero.cta")}</p>
          <p className="text-sm text-muted-foreground mb-2">
            {t("hero.problem")}
          </p>
          <p className="text-sm font-medium mb-6">{t("hero.solution")}</p>
          <div className="w-full h-56 sm:h-72 border-2 border-dashed border-primary/40 flex items-center justify-center text-primary/60 text-sm overflow-hidden">
            <img
              src="/images/banana%20house.png"
              alt={t("hero.imageAlt")}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Program */}
        <section id="program" className="mb-16">
          <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
            [{t("program.title")}]
          </h2>
          <p className="text-sm leading-relaxed mb-4">{t("program.intro")}</p>
          <p className="text-sm font-medium mb-2">{t("program.whatHappens")}</p>
          <ul className="space-y-2 text-sm mb-4">
            {(t("program.items", { returnObjects: true }) as string[]).map(
              (item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ),
            )}
          </ul>
          <p className="text-sm text-muted-foreground">{t("program.venue")}</p>
        </section>

        <Separator className="mb-16" />

        {/* Target */}
        <section id="target" className="mb-16">
          <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
            [{t("target.title")}]
          </h2>
          <p className="text-sm leading-relaxed mb-4">{t("target.intro")}</p>
          <p className="text-sm font-medium mb-2">{t("target.profile")}</p>
          <ul className="space-y-2 text-sm mb-4">
            {(t("target.items", { returnObjects: true }) as string[]).map(
              (item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ),
            )}
          </ul>
          <p className="text-sm text-muted-foreground mb-1">
            {t("target.notRequired")}
          </p>
          <p className="text-sm font-medium">{t("target.required")}</p>
        </section>

        <Separator className="mb-16" />

        {/* Sponsorship */}
        <section id="sponsorship" className="mb-16">
          <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
            [{t("sponsorship.title")}]
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("sponsorship.intro")}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="border-border">
              <CardHeader className="border-b border-border pb-4">
                <div className="text-center">
                  <span className="text-2xl block mb-2">◇</span>
                  <CardTitle className="text-primary uppercase text-sm tracking-wider">
                    {t("sponsorship.basic.name")}
                  </CardTitle>
                  <p className="text-2xl mt-2">
                    {t("sponsorship.basic.price")}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {t("sponsorship.basic.currency")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-xs space-y-2">
                  {(
                    t("sponsorship.basic.items", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground mb-2">
                  {t("sponsorship.basic.confirmed")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="px-3 py-1 border border-dashed border-primary/40 text-xs text-primary/60">
                    {t("sponsorship.placeholder")}
                  </div>
                  <div className="px-3 py-1 border border-dashed border-primary/40 text-xs text-primary/60">
                    {t("sponsorship.placeholder")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader className="border-b border-primary pb-4 bg-primary/5">
                <div className="text-center">
                  <span className="text-2xl block mb-2">◆</span>
                  <CardTitle className="text-primary uppercase text-sm tracking-wider">
                    {t("sponsorship.partner.name")}
                  </CardTitle>
                  <p className="text-2xl mt-2">
                    {t("sponsorship.partner.price")}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {t("sponsorship.partner.currency")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-xs space-y-2">
                  {(
                    t("sponsorship.partner.items", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground mb-2">
                  {t("sponsorship.partner.confirmed")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="px-3 py-1 border border-dashed border-primary/40 text-xs text-primary/60">
                    {t("sponsorship.placeholder")}
                  </div>
                  <div className="px-3 py-1 border border-dashed border-primary/40 text-xs text-primary/60">
                    {t("sponsorship.placeholder")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary border-2 bg-primary/5">
              <CardHeader className="border-b border-primary pb-4">
                <div className="text-center">
                  <span className="text-2xl block mb-2">★</span>
                  <CardTitle className="text-primary uppercase text-sm tracking-wider">
                    {t("sponsorship.exclusive.name")}
                  </CardTitle>
                  <p className="text-2xl mt-2">
                    {t("sponsorship.exclusive.price")}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {t("sponsorship.exclusive.currency")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-xs space-y-2">
                  {(
                    t("sponsorship.exclusive.items", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground mb-2">
                  {t("sponsorship.exclusive.confirmed")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="px-4 py-2 border border-dashed border-primary/40 text-xs text-primary/60">
                    {t("sponsorship.placeholder")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Dates */}
        <section id="dates" className="mb-16">
          <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
            [{t("dates.title")}]
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-primary text-sm uppercase tracking-wider mb-2">
                  {t("dates.first.label")}
                </h3>
                <Badge className="mb-4">{t("dates.placeholder")}</Badge>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {(
                    t("dates.first.items", { returnObjects: true }) as string[]
                  ).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-primary text-sm uppercase tracking-wider mb-2">
                  {t("dates.last.label")}
                </h3>
                <Badge variant="secondary" className="mb-4">
                  {t("dates.placeholder")}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {t("dates.last.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>{t("footer.tagline")}</p>
        </footer>
      </main>
    </div>
  );
}

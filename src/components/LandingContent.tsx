"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImpactSection } from "@/components/ImpactSection";

export function LandingContent() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const sections = [
    { id: "hero", labelKey: "sidebar.hero", icon: "→" },
    { id: "program", labelKey: "sidebar.program", icon: "→" },
    { id: "target", labelKey: "sidebar.target", icon: "→" },
    { id: "impact", labelKey: "sidebar.impact", icon: "→" },
    { id: "sponsorship", labelKey: "sidebar.sponsorship", icon: "→" },
    { id: "dates", labelKey: "sidebar.dates", icon: "→" },
    { id: "contact", labelKey: "sidebar.contact", icon: "→" },
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

    ["hero", "program", "target", "impact", "sponsorship", "dates", "contact"].forEach((id) => {
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
      {lightboxImage && (
        <button
          type="button"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-default"
          aria-label="Close"
        >
          <img
            src={encodeURI(lightboxImage)}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </button>
      )}
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
          <p className="text-xs text-muted-foreground mt-4">
            {t("contact.lowKey")}{" "}
            <a
              href="https://www.linkedin.com/in/natochi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="mailto:ernesto@indies.cl"
              className="text-primary hover:underline"
            >
              ernesto@indies.cl
            </a>
          </p>
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

        {/* Impact */}
        <ImpactSection lightboxImage={lightboxImage} setLightboxImage={setLightboxImage} />

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
                <Badge className="mb-4">{t("dates.datesTbd")}</Badge>
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
                  {t("dates.datesTbd")}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {t("dates.last.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Contact */}
        <section id="contact" className="mb-16">
          <h2 className="text-2xl text-primary mb-2 uppercase tracking-wider">
            [{t("contact.title")}]
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("contact.subtitle")} {t("contact.reachOut")}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/natochi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors border-2 border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t("contact.linkedinLabel")}
            </a>
            <a
              href="mailto:ernesto@indies.cl"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              ernesto@indies.cl
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

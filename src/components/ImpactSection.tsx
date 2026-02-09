"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { impactoImages } from "@/data/impacto";
import { Separator } from "@/components/ui/separator";

const IMPACTO_PATH = "/impacto/";

interface ImpactSectionProps {
  lightboxImage: string | null;
  setLightboxImage: (image: string | null) => void;
}

export function ImpactSection({ lightboxImage, setLightboxImage }: ImpactSectionProps) {
  const { t } = useTranslation();
  const impactDesktopRef = useRef<HTMLDivElement>(null);
  const impactMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = impactDesktopRef.current;
    const mobile = impactMobileRef.current;
    if (!desktop && !mobile) return;

    let rafId: number;
    let lastTime = 0;
    const speedMobile = 45; // px/sec
    const speedDesktop = 35; // px/sec

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (desktop) {
        const next = desktop.scrollTop + speedDesktop * dt;
        if (next >= desktop.scrollHeight - desktop.clientHeight - 20) {
          desktop.scrollTo({ top: 0, behavior: "auto" });
        } else {
          desktop.scrollTop = next;
        }
      }
      if (mobile) {
        const next = mobile.scrollLeft + speedMobile * dt;
        if (next >= mobile.scrollWidth - mobile.clientWidth - 20) {
          mobile.scrollTo({ left: 0, behavior: "auto" });
        } else {
          mobile.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame((now) => {
      lastTime = now;
      tick(now);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <section id="impact" className="mb-16">
        <h2 className="text-2xl text-primary mb-6 uppercase tracking-wider">
          {t("impact.distribution.title")}
        </h2>
        <p className="text-sm leading-relaxed mb-6">
          {t("impact.intro")}
        </p>

        <div className="mb-10 p-4 border border-primary/30 bg-card/50">
          <h3 className="text-primary text-sm uppercase tracking-wider mb-4">
            {t("impact.distribution.strategyTitle")}
          </h3>
          <p className="text-sm font-medium mb-2">{t("impact.distribution.preEvent")}</p>
          <p className="text-sm font-medium mb-2">{t("impact.distribution.communityPartners")}</p>
          <ul className="space-y-2 text-sm mb-4">
            {(t("impact.distribution.partners", { returnObjects: true }) as string[]).map(
              (item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
          <p className="text-sm font-medium">{t("impact.distribution.post")}</p>
        </div>

        {impactoImages.length > 0 && (
        <>
        <div className="lg:hidden relative -mx-4 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div
            ref={impactMobileRef}
            className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 px-4"
          >
            {[...impactoImages, ...impactoImages].map((filename, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxImage(`${IMPACTO_PATH}${filename}`)}
                className="shrink-0 w-[280px] h-[350px] border-2 border-primary/50 relative overflow-hidden bg-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-[0_0_24px_rgba(225,255,118,0.3)]"
              >
                <Image
                  src={`${IMPACTO_PATH}${encodeURIComponent(filename)}`}
                  alt={`Impacto ${(idx % impactoImages.length) + 1}`}
                  fill
                  sizes="280px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          <div
            ref={impactDesktopRef}
            className="h-[28rem] overflow-y-auto overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2"
          >
            <div className="flex flex-col gap-4 pb-4">
              {[
                ...Array.from({ length: Math.ceil(impactoImages.length / 3) }, (_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-3 gap-4 shrink-0 px-1">
                    {impactoImages.slice(rowIndex * 3, rowIndex * 3 + 3).map((filename, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        type="button"
                        onClick={() => setLightboxImage(`${IMPACTO_PATH}${filename}`)}
                        className="relative w-full aspect-[4/3] border-2 border-primary/50 overflow-hidden bg-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:shadow-[0_0_24px_rgba(225,255,118,0.3)]"
                      >
                        <Image
                          src={`${IMPACTO_PATH}${encodeURIComponent(filename)}`}
                          alt={`Impacto ${rowIndex * 3 + colIndex + 1}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </button>
                    ))}
                  </div>
                )),
                ...Array.from({ length: Math.ceil(impactoImages.length / 3) }, (_, rowIndex) => (
                  <div key={`dup-${rowIndex}`} className="grid grid-cols-3 gap-4 shrink-0 px-1">
                    {impactoImages.slice(rowIndex * 3, rowIndex * 3 + 3).map((filename, colIndex) => (
                      <button
                        key={`dup-${rowIndex}-${colIndex}`}
                        type="button"
                        onClick={() => setLightboxImage(`${IMPACTO_PATH}${filename}`)}
                        className="relative w-full aspect-[4/3] border-2 border-primary/50 overflow-hidden bg-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:shadow-[0_0_24px_rgba(225,255,118,0.3)]"
                      >
                        <Image
                          src={`${IMPACTO_PATH}${encodeURIComponent(filename)}`}
                          alt={`Impacto ${rowIndex * 3 + colIndex + 1}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </button>
                    ))}
                  </div>
                )),
              ]}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          {t("impact.albumLink")}{" "}
          <a
            href="#"
            className="text-primary font-medium underline underline-offset-2 decoration-primary hover:opacity-90"
          >
            {t("impact.albumLinkHere")}
          </a>
          .
        </p>
        </>
        )}
      </section>
      <Separator className="mb-16" />
    </>
  );
}

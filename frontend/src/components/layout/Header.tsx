"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { SectionSlider } from "@/navigation/SectionSlider";
import { SectionTab } from "@/types/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { triggerCatalogDownload } from "../../lib/catalogDownload";

const tabs: SectionTab[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

const HEADER_OFFSET = 96;
const PROGRAMMATIC_SCROLL_LOCK_MS = 1200;
const ACTIVE_LINE_EXTRA_PX = 12;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const programmaticScrollUntilRef = useRef(0);
  const programmaticTargetRef = useRef<string | null>(null);
  const visibleRatiosRef = useRef<Record<string, number>>({});
  const lastSetActiveRef = useRef<string>("hero");

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleTabClick = useCallback(
    (tab: SectionTab) => {
      setActiveSection((prev) => (prev === tab.id ? prev : tab.id));
      lastSetActiveRef.current = tab.id;

      programmaticTargetRef.current = tab.id;
      programmaticScrollUntilRef.current =
        Date.now() + PROGRAMMATIC_SCROLL_LOCK_MS;

      scrollToSection(tab.id);
      setMobileMenuOpen(false);
    },
    [scrollToSection],
  );

  const handleCatalogDownload = useCallback(() => {
    triggerCatalogDownload("header");
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuMounted(true);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionEls = tabs
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const rootMarginTop = -(HEADER_OFFSET + ACTIVE_LINE_EXTRA_PX);
    const rootMargin = `${rootMarginTop}px 0px -55% 0px`;

    const pickActiveFromRatios = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (nearBottom) {
        const lastId = tabs[tabs.length - 1]?.id;
        if (lastId && lastSetActiveRef.current !== lastId) {
          lastSetActiveRef.current = lastId;
          setActiveSection(lastId);
        }
        return;
      }

      const now = Date.now();
      const lockActive = now < programmaticScrollUntilRef.current;
      const lockedTarget = programmaticTargetRef.current;

      if (lockActive && lockedTarget) {
        if (lastSetActiveRef.current !== lockedTarget) {
          lastSetActiveRef.current = lockedTarget;
          setActiveSection(lockedTarget);
        }
        return;
      } else if (!lockActive) {
        programmaticTargetRef.current = null;
      }

      let bestId: string | null = null;
      let bestRatio = -1;

      for (const t of tabs) {
        const r = visibleRatiosRef.current[t.id] ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestId = t.id;
        }
      }

      if (!bestId || bestRatio <= 0.001) {
        const activeLineY = HEADER_OFFSET + ACTIVE_LINE_EXTRA_PX;
        let closestId = tabs[0].id;
        let closestDist = Number.POSITIVE_INFINITY;

        for (const t of tabs) {
          const el = document.getElementById(t.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - activeLineY);
          if (dist < closestDist) {
            closestDist = dist;
            closestId = t.id;
          }
        }
        bestId = closestId;
      }

      if (bestId && lastSetActiveRef.current !== bestId) {
        lastSetActiveRef.current = bestId;
        setActiveSection(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibleRatiosRef.current[id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        }
        pickActiveFromRatios();
      },
      {
        root: null,
        threshold: thresholds,
        rootMargin,
      },
    );

    visibleRatiosRef.current = {};
    for (const t of tabs) visibleRatiosRef.current[t.id] = 0;

    for (const el of sectionEls) observer.observe(el);

    pickActiveFromRatios();

    const onResize = () => pickActiveFromRatios();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-pr_dg/95 lg:bg-pr_dg/90 lg:backdrop-blur">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[130px]">
          <div className="hidden h-[80px] items-center justify-between gap-8 lg:flex lg:h-[96px]">
            <Logo />
            <SectionSlider
              tabs={tabs}
              activeId={activeSection}
              onChange={handleTabClick}
            />
            <Button variant="header" onClick={handleCatalogDownload}>
              Request Catalog
            </Button>
          </div>

          <div className="flex h-[70px] max-[537px]:h-[62px] items-center justify-between sm:h-[80px] md:h-[96px] lg:hidden">
            <Logo />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="relative rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-6 w-6">
                  <Menu
                    size={24}
                    className={cn(
                      "absolute inset-0 text-white transition-all duration-200 ease-out",
                      mobileMenuOpen
                        ? "opacity-0 rotate-90 scale-75"
                        : "opacity-100 rotate-0 scale-100",
                    )}
                  />
                  <X
                    size={24}
                    className={cn(
                      "absolute inset-0 text-white transition-all duration-200 ease-out",
                      mobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-75",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuMounted && (
        <div
          className={cn(
            "fixed inset-x-0 top-[70px] z-40 border-b border-white/10 bg-pr_dg/95 max-[537px]:top-[62px] sm:top-[80px] md:top-[96px] lg:hidden",
            mobileMenuOpen ? "mobile-menu-enter" : "mobile-menu-exit",
          )}
          onAnimationEnd={() => {
            if (!mobileMenuOpen) setMobileMenuMounted(false);
          }}
        >
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[130px]">
            <div className="border-b border-white/10 py-4">
              <SectionSlider
                tabs={tabs}
                activeId={activeSection}
                onChange={handleTabClick}
              />
            </div>
            <div className="py-4">
              <Button
                variant="header"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCatalogDownload();
                }}
              >
                Request Catalog
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

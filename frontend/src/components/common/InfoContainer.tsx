import React, { ReactNode } from "react";

// Type definitions for theme values
type ThemeColor =
  | "pr_dg"
  | "pr_lg"
  | "pr_y"
  | "pr_w"
  | "pr_dr"
  | "sr_dg"
  | "sr_lg"
  | "sr_w"
  | "sr_g";

type ThemeGradient = "gy-gradient" | "gw-gradient";

type ThemeSize = "hero" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";

/**
 * B5 — heading level. This component used to hard-code <h1> for its title,
 * which gave the homepage seven of them (hero + every section + every card) and
 * left the real page heading indistinguishable from a card label.
 *
 * The default is now <h2>: a section heading, which is what almost every use of
 * this component actually is. A page's single <h1> is written out by that page.
 */
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface InfoContainerProps {
  title: string;
  children: ReactNode;
  /** Heading element for `title`. Defaults to "h2". */
  as?: HeadingLevel;
  titleColor?: ThemeColor | string;
  contentColor?: ThemeColor | string;
  titleSize?: ThemeSize | string;
  contentSize?: ThemeSize | string;
  textAlign?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  containerGap?: string;
  reveal?: boolean;
  revealDelay?: number;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  title,
  children,
  as: Heading = "h2",
  titleColor,
  contentColor,
  titleSize,
  contentSize,
  textAlign = "left",
  className = "",
  titleClassName = "",
  contentClassName = "",
  containerGap = "",
  reveal = false,
  revealDelay,
}) => {
  // Get alignment class
  const alignmentClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
      ? "text-right"
      : "text-left";

  // Helper to get theme class if it exists
  const getThemeClass = (
    type: "color" | "size" | "gradient",
    value?: string
  ) => {
    if (!value) return "";

    // Size classes
    if (type === "size") {
      const sizeClasses: Record<string, string> = {
        hero: "display-hero",
        xxl: "display-xxl",
        xl: "display-xl",
        lg: "display-lg",
        md: "display-md",
        sm: "display-sm",
        xs: "display-xs",
        xxs: "display-xxs",
      };
      return sizeClasses[value] || "";
    }

    // Color classes
    if (type === "color") {
      const colorClasses: Record<string, string> = {
        pr_dg: "text-pr_dg",
        pr_lg: "text-pr_lg",
        pr_y: "text-pr_y",
        pr_w: "text-pr_w",
        pr_dr: "text-pr_dr",
        sr_dg: "text-sr_dg",
        sr_lg: "text-sr_lg",
        sr_w: "text-sr_w",
        sr_g: "text-sr_g",
      };
      return colorClasses[value] || "";
    }

    // Gradient classes
    if (type === "gradient") {
      const gradientClasses: Record<string, string> = {
        "gy-gradient": "text-gy-gradient",
        "gw-gradient": "text-gw-gradient",
      };
      return gradientClasses[value] || "";
    }

    return "";
  };

  // Helper to check if value is a CSS variable
  const isCssVariable = (value: string) => value.startsWith("var(--");

  // Get styles for a given value (for custom colors/gradients)
  const getStyle = (value?: string): React.CSSProperties => {
    if (!value) return {};

    // Check if it's a gradient
    const isGradient =
      value.includes("gradient") ||
      value.includes("linear-gradient") ||
      value.includes("radial-gradient");

    if (isGradient) {
      const gradientClass = getThemeClass("gradient", value);
      if (gradientClass) return {}; // Will use CSS class

      // Custom gradient
      return {
        background: value,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }

    // Check if it's a theme color or custom color
    const themeClass = getThemeClass("color", value);
    if (!themeClass && value && !isCssVariable(value)) {
      return { color: value }; // Custom color
    }

    if (isCssVariable(value)) {
      return { color: value }; // CSS variable
    }

    return {};
  };

  // Build class strings with proper spacing
  const titleClasses = [
    getThemeClass("size", titleSize),
    getThemeClass("color", titleColor),
    getThemeClass("gradient", titleColor),
    titleClassName,
    getThemeClass("gradient", titleColor) || titleColor?.includes("gradient")
      ? "bg-clip-text text-transparent"
      : "",
    !getThemeClass("size", titleSize) && !titleClassName.includes("font-")
      ? "font-bold"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    getThemeClass("size", contentSize),
    getThemeClass("color", contentColor),
    getThemeClass("gradient", contentColor),
    contentClassName,
    getThemeClass("gradient", contentColor) ||
    contentColor?.includes("gradient")
      ? "bg-clip-text text-transparent"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const revealStyle =
    revealDelay !== undefined
      ? ({ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties)
      : undefined;

  return (
    <div
      data-reveal={reveal ? "" : undefined}
      style={revealStyle}
      className={`flex flex-col ${containerGap} ${alignmentClass} ${className}`}
    >
      <Heading className={titleClasses} style={getStyle(titleColor)}>
        {title}
      </Heading>
      <div className={contentClasses} style={getStyle(contentColor)}>
        {children}
      </div>
    </div>
  );
};

export default InfoContainer;

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SIZES = {
  nav: { width: 140, height: 48, className: "h-10 w-auto sm:h-11" },
  footer: { width: 160, height: 56, className: "h-14 w-auto" },
  hero: { width: 220, height: 80, className: "h-16 w-auto sm:h-20" },
} as const;

type LeagueLogoSize = keyof typeof SIZES;

interface LeagueLogoProps {
  size?: LeagueLogoSize;
  className?: string;
  /** Wrap in a home link (for header branding). */
  link?: boolean;
}

export default function LeagueLogo({
  size = "nav",
  className,
  link = false,
}: LeagueLogoProps) {
  const { width, height, className: sizeClass } = SIZES[size];

  const image = (
    <Image
      src="/images/league-logo.png"
      alt="Mongolian Basketball Association — The League"
      width={width}
      height={height}
      className={cn(sizeClass, "object-contain", className)}
      priority={size === "nav"}
    />
  );

  if (link) {
    return (
      <Link
        href="/"
        className="shrink-0 rounded-md transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-mba-red"
      >
        {image}
      </Link>
    );
  }

  return image;
}

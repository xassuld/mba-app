"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-mba-surfaceHover",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-mba-border bg-mba-surface p-4">
      <Skeleton className="mb-3 h-32 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="rounded-2xl border border-mba-border bg-mba-surface p-8">
      <Skeleton className="mb-4 h-6 w-32" />
      <div className="flex justify-between gap-8">
        <Skeleton className="h-20 w-32" />
        <Skeleton className="h-16 w-24" />
        <Skeleton className="h-20 w-32" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <HeroSkeleton />
      <div className="grid gap-4 md:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

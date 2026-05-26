import { cn } from "@/lib/utils";

export default function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-display text-2xl font-bold uppercase tracking-wide text-mba-text sm:text-3xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

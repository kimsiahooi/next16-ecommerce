import { Skeleton } from "@/components/ui/skeleton";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="mb-6 flex items-center gap-2">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-30" />
    </div>
  );
}

import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href} className={item.active ? "active" : ""}>
                  {item.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

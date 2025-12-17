import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import SearchInput from "./search-input";
import { Button } from "./ui/button";

export const categories = [
  { id: 1, name: "Electronics", href: "/categories/electronics" },
  { id: 2, name: "Fashion", href: "/categories/fashion" },
  { id: 3, name: "Home", href: "/categories/home" },
];

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <div className="flex items-center gap-6">
            <Link className="text-2xl font-bold max-md:hidden" href="/">
              Store
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {category.name}
                </Link>
              ))}
            </nav>
            {/* Mobile Nav */}
            <MobileNav />
          </div>
        </div>

        <div className="w-full mx-4 md:mx-8 max-md:hidden">
          <SearchInput />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="size-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

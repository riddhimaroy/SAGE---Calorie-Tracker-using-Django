import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Leaf, BookOpen, BarChart3 } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Today", icon: Leaf },
    { href: "/log", label: "Daily Log", icon: BookOpen },
    { href: "/weekly", label: "Weekly View", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight transition-opacity hover:opacity-80">
          <Leaf className="w-6 h-6" />
          <span>SAGE</span>
        </Link>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline-block">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

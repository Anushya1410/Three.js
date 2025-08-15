import { useTheme } from "./theme-provider";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-primary">3D Showcase</div>
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                data-testid="nav-products"
              >
                Products
              </a>
              <a
                href="#"
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                data-testid="nav-gallery"
              >
                Gallery
              </a>
              <a
                href="#"
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                data-testid="nav-about"
              >
                About
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Cart</span>
              <div className="relative">
                <ShoppingCart className="w-6 h-6" data-testid="icon-cart" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

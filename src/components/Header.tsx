import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-5xl px-8 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-accent transition-colors"
          aria-label="AdWhiz Home"
        >
          <Sparkles className="w-6 h-6" />
          <span>AdWhiz</span>
        </Link>
        
        <nav className="flex items-center gap-6" role="navigation">
          <Link
            to="/ad-generator"
            className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2 ${
              isActive("/ad-generator") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Ad Generator
          </Link>
          <Link
            to="/analytics"
            className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2 ${
              isActive("/analytics") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
};

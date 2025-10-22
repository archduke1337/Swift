import { useEffect, useState } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Start with undefined to avoid reading window/localStorage during SSR.
  const [isDark, setIsDark] = useState<boolean>(() => false);

  // On mount, read saved preference or system preference and apply it.
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      if (stored === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
        return;
      }
      if (stored === 'light') {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
        return;
      }
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(Boolean(prefersDark));
      if (prefersDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch (err) {
      // noop in restricted environments
      console.error('Failed to initialize theme:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (err) {
      // ignore in restricted environments, but log for debugging
      console.error('Failed to persist/apply theme:', err);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(v => !v);

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-theme-all ${
        isScrolled 
          ? 'bg-surface-alpha-100 shadow-theme backdrop-blur-md' 
          : 'bg-surface-100'
      }`} 
      role="banner"
    >
      {error && (
        <div className="bg-error/10 text-error px-4 py-2 text-sm text-center animate-slide-down">
          {error}
        </div>
      )}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold text-swift-teal cursor-pointer hover:text-swift-teal-light hover-lift transition-theme" 
                onClick={() => {
                  try {
                    scrollToSection('hero');
                  } catch (err) {
                    setError('Failed to scroll to section');
                    setTimeout(() => setError(null), 3000);
                  }
                }}
              >
                <Zap className="w-6 h-6 mr-2 inline animate-pulse" aria-hidden="true" />
                SwiftFormat
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <button 
                  onClick={() => {
                    try {
                      scrollToSection('converter');
                    } catch (err) {
                      setError('Failed to navigate to section');
                      setTimeout(() => setError(null), 3000);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-theme hover-lift"
                >
                  Convert
                </button>
                <button 
                  onClick={() => {
                    try {
                      scrollToSection('features');
                    } catch (err) {
                      setError('Failed to navigate to section');
                      setTimeout(() => setError(null), 3000);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-theme hover-lift"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    try {
                      scrollToSection('about');
                    } catch (err) {
                      setError('Failed to navigate to section');
                      setTimeout(() => setError(null), 3000);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-theme hover-lift"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    try {
                      scrollToSection('blog');
                    } catch (err) {
                      setError('Failed to navigate to section');
                      setTimeout(() => setError(null), 3000);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-theme hover-lift"
                >
                  Blog
                </button>
                <button 
                  onClick={() => {
                    try {
                      scrollToSection('donate');
                    } catch (err) {
                      setError('Failed to navigate to section');
                      setTimeout(() => setError(null), 3000);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-theme hover-lift"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  try {
                    scrollToSection('converter');
                  } catch (err) {
                    setError('Failed to navigate to converter');
                    setTimeout(() => setError(null), 3000);
                  }
                }}
                className="bg-swift-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-swift-teal-light active:bg-swift-teal-dark transition-theme hover-lift focus:outline-none focus:ring-2 focus:ring-swift-teal focus:ring-offset-2 shadow-theme hover:shadow-theme-md" 
                aria-label="Start converting files"
              >
                Start Converting
              </button>

              <button
                onClick={() => {
                  try {
                    toggleTheme();
                  } catch (err) {
                    setError('Failed to toggle theme');
                    setTimeout(() => setError(null), 3000);
                  }
                }}
                aria-pressed={isDark}
                aria-label="Toggle color theme"
                className="p-2 rounded-md hover:bg-surface-200 active:bg-surface-300 transition-theme hover-grow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swift-teal"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-warning transition-theme animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground transition-theme animate-spin-slow" />
                )}
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-700 hover:text-swift-teal focus:outline-none focus:ring-2 focus:ring-swift-teal p-2" 
              aria-expanded={isMenuOpen}
              aria-label="Open main menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface-100 border-t border-border shadow-theme-lg">
              <button 
                onClick={() => {
                  try {
                    scrollToSection('converter');
                  } catch (err) {
                    setError('Failed to navigate to section');
                    setTimeout(() => setError(null), 3000);
                  }
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-surface-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-theme"
              >
                Convert
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('donate')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Support
              </button>
              <div className="px-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle color theme"
                >
                  {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
                  <span className="text-sm">Toggle theme</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

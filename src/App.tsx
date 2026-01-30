import { ThemeProvider } from "@/components/theme-provider"
import viteLogo from "/vite.svg";
import { Link, Outlet } from "react-router-dom";
import { Search, Menu, X, Bell, Settings, User } from "lucide-react";
import { useState, useEffect } from "react";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen w-full flex relative">
        
        {/* Sidebar Navigation - Hidden on mobile (md breakpoint) */}
        <aside className="md:hidden flex flex-col w-64 border-r border-border bg-card/30 backdrop-blur-xl fixed left-0 top-0 h-screen z-30">
          {/* Logo Section */}
          <div className="p-6 border-b border-border">
           
            <Link to="/react-vite-supreme" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:bg-primary/30 transition-all duration-300" />
                <img 
                  src={viteLogo} 
                  className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110" 
                  alt="Vite logo" 
                />
              </div>
              <span className="font-semibold text-lg text-foreground">Dashboard</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              to="/react-vite-supreme/page1"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground"
            >
              <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span>Home</span>
            </Link>
            <Link
              to="/react-vite-supreme/page2"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
              <span>About Us</span>
            </Link>
            <Link
              to="/react-vite-supreme/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
              <span>Not Found</span>
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-0" style={{ marginLeft: window.innerWidth > 767 ? '256px' : '0' }}>
          {/* Top Header Bar */}
          <header className={`sticky top-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5' 
              : 'bg-background/50 backdrop-blur-sm border-b border-border/50'
          }`}>
            <div className="px-4 sm:px-6 slg:px-8 h-16 flex items-center justify-between gap-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:flex hidden p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="sm:hidden flex items-center flex-1 max-w-md">
                <div className="relative w-full group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full pl-10 pr-16 py-2 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-muted border border-border rounded text-muted-foreground hidden slg:inline-block">
                    Ctrl K
                  </kbd>
                </div>
              </div>

              {/* Mobile Search Icon */}
              <button className="sm:flex hidden p-2 rounded-lg hover:bg-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Right Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-2 rounded-lg hover:bg-accent transition-colors relative">
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                </button>
                <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                  <Settings className="w-5 h-5 text-foreground" />
                </button>
                   <ModeToggle />
                <button className="ml-1 flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="sm:hidden text-sm font-medium text-foreground">User</span>
                </button>
              
              </div>
            </div>
          </header>

          {/* Mobile Sidebar Overlay */}
          <div className={`md:block hidden fixed inset-0 z-50 transition-all duration-300 ${
            isMobileMenuOpen ? 'visible' : 'invisible'
          }`}>
            <div 
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className={`absolute left-0 top-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="p-6 border-b border-border flex items-center justify-between">
                <Link to="/react-vite-supreme" className="flex items-center gap-3">
                  <img src={viteLogo} className="w-8 h-8" alt="Vite logo" />
                  <span className="font-semibold text-lg text-foreground">Dashboard</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                <Link
                  to="/react-vite-supreme/page1"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Home</span>
                </Link>
                <Link
                  to="/react-vite-supreme/page2"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  </div>
                  <span>About Us</span>
                </Link>
                <Link
                  to="/react-vite-supreme/contact"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  </div>
                  <span>Not Found</span>
                </Link>
              </nav>
            </aside>
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 slg:p-8 h-full">
            <Outlet />
          </main>
        </div>

        {/* Ambient background effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl" style={{ animationDelay: '1s', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
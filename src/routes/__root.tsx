import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  SC
                </span>
              </div>
              <span className="text-xl font-bold">Seller Console</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" asChild>
                <Link
                  to="/"
                  className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  activeProps={{
                    className: 'bg-accent text-accent-foreground',
                  }}
                >
                  Leads
                </Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link
                  to="/opportunities"
                  className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  activeProps={{
                    className: 'bg-accent text-accent-foreground',
                  }}
                >
                  Opportunities
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      <Toaster richColors position="top-right" />
    </div>
  ),
});

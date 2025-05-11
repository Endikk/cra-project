import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Building2, LogIn, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Mon Entreprise</span>
          </Link>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tableau de Bord
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Menu mobile overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed inset-x-4 top-20 rounded-lg bg-background border shadow-lg p-6">
              <div className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-muted-foreground hover:text-foreground transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Tableau de Bord
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleLogout}
                      className="flex items-center gap-2 justify-start"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-2 w-full justify-start"
                    >
                      <LogIn className="h-4 w-4" />
                      Connexion
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
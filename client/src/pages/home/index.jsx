import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Building2, Users, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEmployeeAccess = () => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    } else {
      navigate({ to: '/login' });
    }
  };

  const handleManagerAccess = () => {
    // TODO: Implémenter l'accès manager quand ce sera disponible
    alert('L\'accès manager sera bientôt disponible !');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 flex flex-col items-center justify-center p-4 sm:p-6">
      <header className="mb-6 sm:mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Building2 className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 sm:mb-3">
          Suivi de Temps (CRA)
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground">
          Bienvenue sur votre application de gestion du temps !
        </p>
      </header>

      <main className="w-full max-w-4xl bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <div className="text-center mb-6">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Cette application vous permettra de suivre vos activités et projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-primary/5 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-2 sm:mb-3 text-center">Espace Employé</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center">
              Connectez-vous pour enregistrer vos heures, déclarer vos activités et consulter vos saisies.
            </p>
            <Button 
              onClick={handleEmployeeAccess}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isAuthenticated ? 'Accéder au tableau de bord' : 'Se connecter'}
            </Button>
          </div>

          <div className="bg-secondary/5 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-2 sm:mb-3 text-center">Espace Manager</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center">
              Accédez au tableau de bord pour visualiser l'activité de vos équipes et valider les feuilles de temps.
            </p>
            <Button 
              onClick={handleManagerAccess}
              variant="outline"
              className="w-full border-secondary text-secondary hover:bg-secondary/5"
            >
              Bientôt disponible
            </Button>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Version 1.0.0 - En développement actif
          </p>
        </div>
      </main>

      <footer className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mon Entreprise. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

export default HomePage; 
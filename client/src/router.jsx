import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router';
import { Root } from './Root';
import LoginPage from './pages/login';
import EmployeeDashboardPage from './pages/employee';
import HomePage from './pages/home';

// Route racine
const rootRoute = createRootRoute({
  component: Root,
});

// Route de login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: LoginPage,
  beforeLoad: async ({ context }) => {
    const token = localStorage.getItem('token');
    if (token) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

// Route du dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: EmployeeDashboardPage,
  beforeLoad: async ({ context }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({ to: '/login' });
    }
  },
});

// Route d'accueil
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  beforeLoad: async ({ context }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({ to: '/login' });
    }
  },
});

// Configuration des routes
const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  indexRoute,
]);

// Création du routeur
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: {
      user: null,
      isAuthenticated: false,
    },
  },
}); 
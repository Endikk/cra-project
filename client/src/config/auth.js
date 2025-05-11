// Configuration des routes protégées
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/employee',
  '/admin'
];

// Configuration des rôles utilisateur
export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  USER: 'user'
};

// Configuration des permissions par rôle
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['*'], // Accès à tout
  [USER_ROLES.EMPLOYEE]: [
    '/dashboard',
    '/profile',
    '/employee'
  ],
  [USER_ROLES.USER]: [
    '/dashboard',
    '/profile'
  ]
};

// Configuration des endpoints d'API
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  VERIFY_TOKEN: '/api/auth/verify-token'
};

// Configuration du stockage local
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  REFRESH_TOKEN: 'auth_refresh_token',
  SAVED_EMAIL: 'auth_saved_email'
};

// Durée de validité du token (en secondes)
export const TOKEN_EXPIRY = 3600; // 1 heure

// Configuration des messages d'erreur
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou mot de passe incorrect',
  SESSION_EXPIRED: 'Votre session a expiré, veuillez vous reconnecter',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource',
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  SERVER_ERROR: 'Erreur interne du serveur'
}; 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Vérifier la validité du token avec le backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      // TODO: Appeler votre API de connexion ici
      // Exemple de réponse simulée
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'fake-jwt-token',
            user: {
              id: 1,
              email,
              name: 'Utilisateur Test'
            }
          });
        }, 1000);
      });

      if (rememberMe) {
        localStorage.setItem('token', response.token);
      } else {
        sessionStorage.setItem('token', response.token);
      }

      setUser(response.user);
      navigate({ to: '/dashboard' });
      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return {
        success: false,
        error: 'Email ou mot de passe incorrect'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate({ to: '/login' });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
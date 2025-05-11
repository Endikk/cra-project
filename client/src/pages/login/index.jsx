import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password, rememberMe);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden max-w-5xl">
        {/* Section gauche avec l'image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/800x600/?login,technology')" }}
        ></div>

        {/* Section droite avec le formulaire */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-extrabold text-gray-800">Bienvenue</CardTitle>
              <CardDescription className="text-gray-600">Connectez-vous à votre compte pour continuer</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-700"
                  >
                    Se souvenir de moi
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connexion en cours...</span>
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Pas encore de compte ?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Créer un compte
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
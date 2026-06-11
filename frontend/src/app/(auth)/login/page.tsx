"use client";

import { useState } from "react";
import Link from "next/link";
import useFormState from "@/hooks/useFormState";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appStore } from "@/store";
import ResetPasswordModal from "@/components/ResetPasswordModal";

export default function LoginPage() {
  const { formState, setFormState } = useFormState({ email: "", password: "" });
  const { fetchData } = useFetchData();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLoader = appStore((state) => state.showLoader);
  const hideLoader = appStore((state) => state.hideLoader);

  const setUser = appStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    showLoader();
    const { status, response, message } = await fetchData("loginUser", formState);

    if (status) {
      const { _id, email, role } = response.data;
      const token = response.token;

      toast.success("Usuario correcto");
      setUser({ token, userData: { _id, email, role } });
      hideLoader();
      setIsLoading(false);
      router.push("home");
    } else {
      toast.error(message || "Usuario incorrecto");
      hideLoader();
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassword = async (email: string) => {
    const { status } = await fetchData("resetPassword",  {email} );
    if (status) {
      toast.success("Una contraseña ha sido enviada a su correo");
    } else {
      toast.error("Error al enviar el enlace");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Inicio de sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Ingrese su email"
              required
              value={formState.email}
              onChange={setFormState}
              // error={emailError}
            />
          </div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              required
              value={formState.password}
              onChange={setFormState}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-sm">Mostrar contraseña</span>
          </div>

          <Button
            type="submit"
            className="w-full relative"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1"></div>
          </Button>
        </form>

        <div className="text-center">
          <span
            onClick={openModal}
            className="cursor-pointer text-sm text-blue-600 hover:underline"
            role="button"
          >
            ¿Ha olvidado su contraseña?
          </span>
        </div>
        <div className="text-center text-sm">
          ¿Eres nuevo en este sitio?{" "}
          <Link
            href="/register"
            className="m-2 text-black font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </div>
      </div>
      <ResetPasswordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}

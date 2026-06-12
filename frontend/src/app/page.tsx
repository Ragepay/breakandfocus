"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeBackground from "@/img/home.png";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: "⏱️",
    title: "Técnicas probadas",
    desc: "Pomodoro, 52/17 y Pausa Activa. Elegí la que mejor se adapte a vos.",
  },
  {
    icon: "🔔",
    title: "Alarma que te avisa",
    desc: "Suena al terminar cada bloque de enfoque y descanso. No mires el reloj.",
  },
  {
    icon: "🎨",
    title: "Tu espacio, tu estilo",
    desc: "Personalizá tiempos, colores y fondos. Todo se guarda en tu navegador.",
  },
  {
    icon: "🚀",
    title: "Sin cuenta, sin fricción",
    desc: "Entrá y empezá a concentrarte. Gratis y al instante.",
  },
];

export default function Landing() {
  // Fondo personalizado guardado en localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("bgImage");
    const savedColor = localStorage.getItem("bgColor");
    if (savedImage) {
      document.body.style.backgroundImage = `url(${savedImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    } else if (savedColor) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = savedColor;
    }
  }, []);

  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HomeBackground}
            alt="Persona enfocada trabajando"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-xl">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              Productividad sin estrés
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0859A3] leading-tight">
              Concentrate, descansá y rendí más con{" "}
              <span className="text-emerald-500">Break&amp;Focus</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Un temporizador inteligente que alterna enfoque y pausas activas.
              Estudiá con foco real y dejá que la alarma te avise cuándo parar.
            </p>
            <div className="mt-8">
              <Link href="/home">
                <Button className="group bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-6 px-8 rounded-xl shadow-lg shadow-emerald-500/30 inline-flex items-center gap-2">
                  Empezar ahora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Gratis
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Sin crear cuenta
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Empezás en 1 clic
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-[#0859A3] mb-12">
            Todo lo que necesitás para enfocarte
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 bg-[#DFF7F2] p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#0859A3] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-emerald-500 to-blue-400 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para trabajar mejor y sentirte bien?
          </h2>
          <p className="mb-8 text-white/90">
            Transformá tu forma de estudiar y trabajar, un bloque de enfoque a la vez.
          </p>
          <Link href="/home">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg py-6 px-8 rounded-xl shadow-lg">
              Empezar a concentrarme
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: 1,
    title: "Elegí tu técnica",
    desc: "Pomodoro, 52/17 o Pausa Activa. O ajustá los minutos de enfoque y descanso a tu medida con el lápiz.",
  },
  {
    n: 2,
    title: "Tocá «Comenzar»",
    desc: "El temporizador arranca tu bloque de enfoque y el anillo se va completando mientras trabajás.",
  },
  {
    n: 3,
    title: "Concentrate hasta la alarma",
    desc: "Trabajá sin distracciones. No mires el reloj: cuando el bloque termina, suena una alarma.",
  },
  {
    n: 4,
    title: "Tomá tu descanso",
    desc: "La app cambia sola a modo descanso. Estirá, respirá o relajá la vista hasta que vuelva a sonar.",
  },
  {
    n: 5,
    title: "Repetí y rendí más",
    desc: "Volvés al enfoque y seguís. Cada ciclo completo suma, sin agotarte.",
  },
];

export default function ComoFunciona() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[#0859A3] mb-3">Cómo funciona</h1>
      <p className="text-gray-600 mb-10">
        Break&amp;Focus se basa en algo simple y comprobado: alternar bloques de
        concentración con pausas. Así mantenés el foco sin quemarte.
      </p>

      <ol className="space-y-5">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center">
              {s.n}
            </span>
            <div>
              <h2 className="font-bold text-[#0859A3]">{s.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl bg-[#DFF7F2] p-6">
        <h3 className="font-bold text-[#0859A3] mb-1">¿Por qué funciona?</h3>
        <p className="text-sm text-gray-600">
          El cerebro sostiene la atención mejor en intervalos. Las pausas
          programadas reducen la fatiga, evitan la procrastinación y hacen que
          rindas más en menos tiempo, cuidando tu bienestar.
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link href="/home">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-6 px-8 rounded-xl shadow-lg">
            Empezar ahora
          </Button>
        </Link>
      </div>
    </main>
  );
}

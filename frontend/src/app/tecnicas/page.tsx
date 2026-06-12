"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const techniques = [
  {
    name: "Pomodoro",
    focus: 25,
    brk: 5,
    longBreak: 15,
    desc: "Trabajá en bloques de 25 minutos de concentración plena seguidos de 5 de descanso. Cada 4 ciclos, una pausa larga de 15 minutos. Ideal para combatir la procrastinación y sostener el foco sin agotarte.",
  },
  {
    name: "Técnica 52/17",
    focus: 52,
    brk: 17,
    longBreak: 30,
    desc: "52 minutos de concentración profunda y 17 de descanso. Pensada para tareas largas que requieren foco sostenido, con pausas amplias que renuevan tu energía y previenen el cansancio.",
  },
  {
    name: "Pausa Activa",
    focus: 25,
    brk: 5,
    longBreak: 15,
    desc: "Bloques de enfoque con pausas para mover el cuerpo: estiramientos, respiración o una caminata corta. Reduce el estrés y la fatiga física de estar muchas horas sentado.",
  },
];

export default function Tecnicas() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[#0859A3] mb-3">Las técnicas</h1>
      <p className="text-gray-600 mb-10">
        Elegí el método que mejor se adapte a tu forma de trabajar. Todos alternan
        enfoque y descanso para que rindas más sin agotarte.
      </p>
      <div className="space-y-6">
        {techniques.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-gray-100 bg-[#DFF7F2] p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-[#0859A3]">{t.name}</h2>
              <span className="text-sm bg-white rounded-full px-3 py-1 text-emerald-700 font-semibold">
                {t.focus} min enfoque · {t.brk} min descanso · {t.longBreak} min pausa larga
              </span>
            </div>
            <p className="text-gray-600">{t.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/home">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-6 px-8 rounded-xl shadow-lg">
            Probar ahora
          </Button>
        </Link>
      </div>
    </main>
  );
}

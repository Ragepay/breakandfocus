"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import services from "@/services";
import { Configuration } from "@/components/ui/userMenu/Configuration";
import { UserMenu } from "@/components/ui/userMenu/UserMenu";
import Message from "@/components/Message";
import { Edit2 } from "lucide-react";
import { appStore } from "@/store";
{
  /*import WelcomeModal from "@/components/ui/WelcomeModal"; */
}

const factor = 60; // 1 = seconds | 60 = minute

function Home() {
  const [timer, setTimer] = useState(25 * factor);
  const [breakTime, setBreakTime] = useState(5 * factor);
  const [currentTechnique, setCurrentTechnique] = useState<Technique >();
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [session, setSession] = useState(1);
  const [buttonText, setButtonText] = useState("Meditar");
  // const [fetchError, setFetchError] = useState<string | null>(null);
  const fetchCalled = useRef(false);
  const sessionStartRef = useRef<number | null>(null);

  const localTechniques = useMemo(() => [{
    name: "Pomodoro",
    _id: "613b1fcf8f1d1e2f4a12b3c7",
    focus_time: 25,
    break_time: 5,
    long_break_time: 15,
    cycles_before_long_break: 0,
    active_pause: false,
    description: "Maximiza tu productividad con intervalos de enfoque y descansos estratégicos. La Técnica Pomodoro divide tu tiempo de trabajo en sesiones de 25 minutos de concentración plena, seguidas de 5 minutos de descanso. Este ciclo te ayuda a mantener la motivación, reducir la procrastinación y evitar el agotamiento, permitiéndote lograr más en menos tiempo mientras cuidas tu bienestar mental. Luego de 4 ciclos, tendrás un descanso largo de 15 minutos.",
  },
  {
    name: "Técnica 52/17",
    _id: "613b1fcf8f1d1e2f4a12b3c8",
    focus_time: 52,
    break_time: 17,
    long_break_time: 30,
    cycles_before_long_break: 3,
    active_pause: false,
    description: "Optimiza tu rendimiento con sesiones largas y descansos estratégicos. La Técnica 52/17 propone trabajar durante 52 minutos de concentración profunda, seguidos de 17 minutos de descanso. Este método te permite mantener un enfoque sostenido en tareas importantes, mientras los descansos regulares te ayudan a renovarenergías y prevenir el agotamiento. A su vez, luego de 3 ciclos 52/17, tendrás en descanso largo de 30'"
  },
  {
    name: "Pausa Activa",
    _id: "613b1fcf8f1d1e2f4a12b3c9",
    focus_time: 25,
    break_time: 5,
    long_break_time: 15,
    cycles_before_long_break: 4,
    active_pause: true,
    description : "Recarga tu energía en pocos minutos. Realizar breves ejercicios durante la jornada laboral ayuda a reducir el estrés, mejorar la concentración y evitar la fatiga. Dedica unos minutos a estiramientos, respiración profunda o movimientos ligeros para revitalizar tu cuerpo y mente. ¡Incorpora estas pausas en tu rutina diaria para mantener un equilibrio saludable entre trabajo y bienestar!"
  }], []);

  const showSystemNotification = useCallback((message: string) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: "Descansa tus ojos. Estira tus piernas. Respira. Relájate.",
      });
    }
  }, []);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  interface Technique {
    name: string;
    _id: string;
    focus_time: number;
    break_time: number;
    long_break_time: number;
    cycles_before_long_break: number;
    active_pause: boolean;
    description: string;
  }

  const [techniques, setTechniques] = useState([] as Technique[]);
  // Calling the API to update timerConfigs
  useEffect(() => {
    if (!fetchCalled.current) {
      fetchCalled.current = true; // Garantiza que no se realicen múltiples llamadas

      const fetchData = async () => {
        try {
          const response = await services.getTechniques();
          const fetched = Object.values(response.data.data) as Technique[];
          setTechniques(fetched.length > 0 ? fetched : localTechniques);
        } catch {
          setTechniques(localTechniques);
        }
      };

      fetchData();
    }
  }, [localTechniques]);

  // Auto-selecciona la primera técnica para que "Comenzar" quede habilitado de entrada
  useEffect(() => {
    if (!currentTechnique && techniques.length > 0) {
      const t = techniques[0];
      setCurrentTechnique(t);
      setTimer(t.focus_time * factor);
      setBreakTime(t.break_time * factor);
      setIsWorkTime(true);
    }
  }, [techniques, currentTechnique]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };


  const toggleTimer = () => {
    if (!currentTechnique) return;
    setIsRunning((prev) => !prev);
  };


  const buttonOptions = useMemo(
    () => ["Meditar", "Estiramientos", "Respirar"],
    []
  );

  const getRandomButtonText = useCallback(() => {
    return buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
  }, [buttonOptions]);

  const { user } = appStore.getState();
  const userId = user?.userData?._id
  const techniqueid = currentTechnique?._id

  useEffect(() => {

    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timer > 0) {
      // Marca el inicio real de la sesión de enfoque (una sola vez por ciclo)
      if (isWorkTime && sessionStartRef.current === null) {
        sessionStartRef.current = Date.now();
      }
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isWorkTime) {
      // Terminó el enfoque -> arranca el break (en segundos: minutos * factor)
      setIsWorkTime(false);
      if (currentTechnique && session < currentTechnique.cycles_before_long_break) {
        setTimer((currentTechnique.break_time ?? 5) * factor);
        setBreakTime((currentTechnique.break_time ?? 5) * factor);
        setButtonText(getRandomButtonText());
        showSystemNotification("¡Es hora de tu break corto!");
      } else {
        setTimer((currentTechnique?.long_break_time ?? 15) * factor);
        setBreakTime((currentTechnique?.long_break_time ?? 15) * factor);
        setButtonText("Es hora de un largo descanso");
        showSystemNotification("¡Es hora de tu break largo!");
        setSession(1);
      }
      setShowNotification(true);
      setIsRunning(false); // Pausa hasta cerrar la notificación
    } else if (timer === 0 && !isWorkTime) {
      // Terminó el break -> vuelve al enfoque y registra la sesión (tiempos en segundos)
      setIsWorkTime(true);
      setTimer((currentTechnique?.focus_time ?? 25) * factor);
      setSession(session + 1);
      setIsRunning(false);

      const focusSeconds = (currentTechnique?.focus_time ?? 25) * factor;
      const breakSeconds = breakTime;
      const startTime = sessionStartRef.current ?? Date.now();
      const endTime = Date.now();
      sessionStartRef.current = null;

      if (userId && techniqueid) {
        services
          .createSession({
            user_id: userId,
            technique_id: techniqueid,
            start_time: new Date(startTime),
            end_time: new Date(endTime),
            expected_total_time: focusSeconds + breakSeconds,
            real_focus_time: focusSeconds,
            real_break_time: breakSeconds,
            real_break_count: 1,
            finished: true,
            score: 1,
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer, isWorkTime, getRandomButtonText, showSystemNotification, breakTime, currentTechnique, session, userId, techniqueid]);

  const closeNotification = () => {
    setShowNotification(false);
    setIsRunning(true);
  };

  //UserMenu -> Configuration
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  //modal
  // const [isModalOpen, setIsModalOpen] = useState(true); // Inicialmente el modal está abierto

  // const handleCloseModal = () => {
  // // setIsModalOpen(false); // Cerrar el modal
  // };

  function handleTime(technique: Technique): void {
    setCurrentTechnique(technique);
    // console.log(currentTechnique)
    setTimer(technique.focus_time * factor);
    setBreakTime(technique.break_time * factor);
    setIsWorkTime(true);
  }
  return (
    <div className="min-h-screen  flex flex-col items-center justify-around p-4">
      <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50" onClick={toggleUserMenu}>
        <Edit2 className="h-7 w-7 text-blue-500" />
      </button>
      <UserMenu
        isMenuOpen={isUserMenuOpen}
        toggleUserMenu={toggleUserMenu}
      >
        <Configuration toggleOptions={toggleUserMenu} />
      </UserMenu>
      <main className="text-2xl md:container md:mx-auto px-4 py-8 max-w-2xl ">


        {/* Techniques container */}

        <div className="flex flex-col justify-center mb-6 space-x-6 bg-transparent">
          <div className="flex justify-evenly  border-b-2 border-blue-500">

            {techniques.map((technique) => (
              <button
                key={technique.name}
                className={`text-lg pb-2 ${
                  currentTechnique?.name === technique.name
                    ? "border-b-4 border-blue-500 "
                    : "text-gray-800"
                }`}
                onClick={() => handleTime(technique)}
                title={technique.description}
              >
                {technique.name}
              </button>
            ))}
          </div>

        </div>


        {/* Timer container */}

        <div className="text-center mt-10 ">
          {(() => {
            const total = isWorkTime
              ? (currentTechnique?.focus_time ?? 25) * factor
              : breakTime || 1;
            const pct = Math.max(0, Math.min(1, 1 - timer / total));
            const R = 130;
            const CIRC = 2 * Math.PI * R;
            return (
              <div className="relative mx-auto mb-8 w-[300px] h-[300px]">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r={R} fill="none" stroke="#e5e7eb" strokeWidth="16" />
                  <circle
                    cx="150" cy="150" r={R} fill="none"
                    stroke={isWorkTime ? "#3b82f6" : "#22c55e"}
                    strokeWidth="16" strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - pct)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-6xl font-extrabold text-gray-800">{formatTime(timer)}</p>
                  <span className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-400">
                    {isWorkTime ? "Enfoque" : "Descanso"}
                  </span>
                </div>
              </div>
            );
          })()}
          <button
            onClick={toggleTimer}
            disabled={!currentTechnique}
            className={`text-center mt-5 mb-7 bg-gradient-to-b from-green-400 to-blue-400 text-white font-semibold
                        text-2xl p-4 rounded-full shadow-lg h-[180px] w-[180px] transition-opacity
                        ${!currentTechnique ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isRunning ? "PAUSE" : "COMENZAR"}
          </button>
          <p className="text-xl font-semibold text-blue-600 mt-5">
            {!currentTechnique
              ? "Selecciona una técnica para empezar"
              : isWorkTime
              ? "¡Es hora de Enfocarse!"
              : "Es hora de tu break"}
          </p>
        </div>
      </main>

      {/* Show Message component */}

      {showNotification && <Message buttonText={buttonText} closeNotification={closeNotification} />
      }
      {/*<WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />*/}
    </div>
  );
}
export default Home;
import {
  PersonalInfoIcon,
  StatsSummaryIcon,
} from "@/svg/navigator-drawer-icons";
import { NavHeader } from "./NavHeader";
import { NavLink } from "./NavLink";
import { Divider } from "./Divider";
import { appStore } from "@/store";

type Props = {
  toggleDrawer: () => void;
};

export const NavigationItems = ({ toggleDrawer }: Props) => {
  const modalSettings = appStore((state) => state.modalSettings);
  const setModalSettings = appStore((state) => state.setModalSettings);

  const controlDisplay = (value: string) => {
    toggleDrawer();
    setModalSettings({
      ...modalSettings,
      [value]: true,
    });
  };

  // Solo se exponen las funciones que están terminadas.
  // El resto (preferencias, historial, gráficos, exportar y toda la sección
  // de configuración) sigue existiendo en el código pero se oculta del nav
  // para no mostrar pantallas "En construcción" en el demo.
  return (
    <nav className="w-full py-[18px] px-[12px]">
      <NavHeader title="Perfil de usuario" />
      <NavLink
        title={"Información personal"}
        icon={<PersonalInfoIcon />}
        controlDisplay={() => controlDisplay("profileInfo")}
      />
      <Divider />
      <NavHeader title="Estadísticas" />
      <NavLink
        title={"Resúmen de Productividad"}
        icon={<StatsSummaryIcon />}
        controlDisplay={() => controlDisplay("statsSummary")}
      />
    </nav>
  );
};

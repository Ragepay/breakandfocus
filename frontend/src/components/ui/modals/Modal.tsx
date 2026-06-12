import { AnimatePresence, motion } from "framer-motion";
import { appStore } from "@/store";
import { CrossIcon } from "@/svg/modal/CrossIcon";
import {
  ConfigPreferences,
  Export,
  Faq,
  Notifications,
  ProfileInfo,
  Security,
  StatsChars,
  StatsSummary,
  SupportContact,
  TutorialsAndGuides,
  UsageHistory,
} from ".";

const modalVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
  },
  visible: {
    clipPath: "circle(100% at 50% 50%)",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const Modal = () => {
  const modalSettings = appStore((state) => state.modalSettings);
  const resetModalSettings = appStore((state) => state.resetModalSettings);

  const areAllModalSettingsFalse = () => {
    return Object.values(modalSettings).every((value) => value === false);
  };

  return (
    <AnimatePresence>
      {areAllModalSettingsFalse() ? null : (
        <motion.div
          className="fixed
                     inset-0 flex
                     items-center
                     justify-center
                     bg-black
                     bg-opacity-50
                     z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white rounded-3xl flex flex-col mx-auto overflow-hidden shadow-xl"
            style={{ width: "auto", maxWidth: "90vw", maxHeight: "85vh" }}
            variants={modalVariants}
          >
            {/* Barra fija con la X (no se solapa con el contenido) */}
            <div className="flex justify-end p-3 border-b border-gray-100 shrink-0">
              <button
                onClick={resetModalSettings}
                aria-label="Cerrar"
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <CrossIcon />
              </button>
            </div>
            {/* Contenido scrolleable */}
            <div className="overflow-y-auto px-6 pb-6 pt-4 md:px-8">
              {modalSettings.profileInfo && <ProfileInfo />}
              {modalSettings.configPreferences && <ConfigPreferences />}
              {modalSettings.usageHistory && <UsageHistory />}
              {modalSettings.statsSummary && <StatsSummary />}
              {modalSettings.statsChars && <StatsChars />}
              {modalSettings.export && <Export />}
              {modalSettings.notifications && <Notifications />}
              {modalSettings.security && <Security />}
              {modalSettings.faq && <Faq />}
              {modalSettings.supportContact && <SupportContact />}
              {modalSettings.tutorialsAndGuides && <TutorialsAndGuides />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

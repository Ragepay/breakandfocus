"use client";

import ProfileInfoForm from "@/components/ProfileInfo";
import { PersonalInfoIcon } from "@/svg/navigator-drawer-icons";

export const ProfileInfo = () => {
  return (
    <div className="w-full max-w-[560px] px-2 md:px-6">
      <div className="h-[40px] flex items-center gap-3 mb-2">
        <div className="text-[#09BCB4]">
          <PersonalInfoIcon />
        </div>
        <h2 className="text-[20px] tracking-[1px] text-[#0859A3]">
          Información personal
        </h2>
      </div>

      <div className="pt-[24px]">
        <ProfileInfoForm />
      </div>
    </div>
  );
};

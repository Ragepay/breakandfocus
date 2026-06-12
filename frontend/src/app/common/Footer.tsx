import Link from "next/link";
import { XLogo } from "@/svg/XLogo";
import { InstagramLogo } from "@/svg/InstagramLogo";
import { YouTubeLogo } from "@/svg/YouTubeLogo";
import { LinkedinLogo } from "@/svg/LinkedinLogo";

const socials = [
  { href: "https://x.com", label: "X (Twitter)", Logo: XLogo },
  { href: "https://instagram.com", label: "Instagram", Logo: InstagramLogo },
  { href: "https://youtube.com", label: "YouTube", Logo: YouTubeLogo },
  { href: "https://linkedin.com", label: "LinkedIn", Logo: LinkedinLogo },
];

export default function Footer() {
  return (
    <footer className="border-t border-t-[1px] border-t-[#D9D9D9] bg-[#DFF7F2] xl:mx-[40px]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Redes (abren la red en una pestaña nueva) */}
          <div className="flex space-x-4">
            {socials.map(({ href, label, Logo }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Logo />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>

          {/* Navegación interna (todos los links funcionan) */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-[#0859A3]">Break&amp;Focus</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Empezar ahora
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[#0859A3]">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/tecnicas"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Conocé las técnicas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-funciona"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Cómo funciona
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Cierre simple, sin formularios que no hacen nada */}
          <div className="md:max-w-[320px]">
            <h3 className="font-semibold mb-2 text-[#0859A3]">Break&amp;Focus</h3>
            <p className="text-[14px] font-roboto text-[#1E1E1E]">
              Gestioná tu tiempo de forma inteligente: enfoque, pausas y a rendir mejor.
            </p>
            <p className="text-[12px] font-roboto text-gray-500 mt-4">
              © {2025} Break&amp;Focus. Hecho para concentrarte mejor.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

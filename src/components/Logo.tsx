import { useTheme } from "next-themes";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

interface LogoProps {
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function Logo({
  alt = "Indian Dreams logo",
  className = "h-8 w-auto object-contain",
  loading = "lazy",
}: LogoProps) {
  const { theme, systemTheme } = useTheme();
  const resolved = theme === "system" ? systemTheme : theme;
  const src = resolved === "dark" ? logoDark : logoLight;

  return <img src={src} alt={alt} className={className} loading={loading} />;
}

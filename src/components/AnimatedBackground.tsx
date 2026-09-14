import { useLocation } from "react-router-dom";

const accountRoutes = ["/login", "/signup", "/forgot-password", "/offer", "/payment"];

const AnimatedBackground = () => {
  const { pathname } = useLocation();
  const isAccount = accountRoutes.some((route) => pathname.startsWith(route));
  const isLearning = pathname.startsWith("/dashboard")
    || pathname.startsWith("/guides")
    || pathname.startsWith("/lesson")
    || pathname.startsWith("/challenge")
    || pathname.startsWith("/ai-tools")
    || pathname.startsWith("/certificate")
    || pathname.startsWith("/mini-games")
    || pathname.startsWith("/profile");

  return (
    <div
      className={`heritage-scene ${isAccount ? "heritage-scene--account" : ""} ${isLearning ? "heritage-scene--learning" : ""}`}
      aria-hidden="true"
    >
      <div className="heritage-scene__geometry" />
      <div className="heritage-scene__silk heritage-scene__silk--one" />
      <div className="heritage-scene__silk heritage-scene__silk--two" />
      <div className="heritage-scene__path heritage-scene__path--one" />
      <div className="heritage-scene__path heritage-scene__path--two" />
      <div className="heritage-scene__glint heritage-scene__glint--one" />
      <div className="heritage-scene__glint heritage-scene__glint--two" />
      <div className="heritage-scene__glint heritage-scene__glint--three" />
    </div>
  );
};

export default AnimatedBackground;
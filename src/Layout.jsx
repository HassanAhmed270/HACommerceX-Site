import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "./components/site/Navbar.jsx";
import { AnimatedBackground } from "./components/site/AnimatedBackground.jsx";
import { Footer } from "./components/site/Footer.jsx";

export function Layout() {
  return (
    <div
      className="relative min-h-screen w-full bg-background text-foreground"
      style={{ backfaceVisibility: "hidden" }}
    >
      <Toaster />
      <AnimatedBackground />
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Toaster } from "sonner";
import { Navbar } from "./components/site/Navbar.jsx";
import { AnimatedBackground } from "./components/site/AnimatedBackground.jsx";
import { Hero } from "./components/site/Hero.jsx";
import { About } from "./components/site/About.jsx";
import { Services } from "./components/site/Services.jsx";
import { HowWeWork } from "./components/site/HowWeWork.jsx";
import { Portfolio } from "./components/site/Portfolio.jsx";
import { Clients } from "./components/site/Clients.jsx";
import { Contact } from "./components/site/Contact.jsx";
import { Footer } from "./components/site/Footer.jsx";

export default function App() {
  return (
    <div
      className="relative min-h-screen w-full bg-background text-foreground"
      style={{ backfaceVisibility: "hidden" }}
    >
      <Toaster />
      <AnimatedBackground />
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Services />
        <HowWeWork />
        <Portfolio />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

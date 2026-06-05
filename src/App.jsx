import { Toaster } from "sonner";
import { Navbar } from "./components/site/Navbar.jsx";
import { AnimatedBackground } from "./components/site/AnimatedBackground.jsx";
import { Hero } from "./components/site/Hero.jsx";
import { About } from "./components/site/About.jsx";
import { Services } from "./components/site/Services.jsx";
import { Features } from "./components/site/Features.jsx";
import { Portfolio } from "./components/site/Portfolio.jsx";
import { Partners } from "./components/site/Partners.jsx";
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
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="partners">
          <Partners />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

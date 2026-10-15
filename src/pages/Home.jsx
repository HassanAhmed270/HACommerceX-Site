import { Seo } from "../components/Seo.jsx";
import { Hero } from "../components/site/Hero.jsx";
import { About } from "../components/site/About.jsx";
import { Services } from "../components/site/Services.jsx";
import { HowWeWork } from "../components/site/HowWeWork.jsx";
import { Portfolio } from "../components/site/Portfolio.jsx";
import { Clients } from "../components/site/Clients.jsx";
import { Contact } from "../components/site/Contact.jsx";

export function Home() {
  return (
    <>
      <Seo
        path="/"
        title="HACommerceX | MERN Stack Web Development, Karachi"
        description="Karachi-based MERN stack developers building e-commerce stores, POS systems, admin dashboards and business websites for clients in Pakistan and worldwide."
      />
      <Hero />
      <About />
      <Services />
      <HowWeWork />
      <Portfolio />
      <Clients />
      <Contact />
    </>
  );
}

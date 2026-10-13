import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Filosofia from "../../components/Filosofia/Filosofia";
import Estancias from "../../components/Estancias/Estancias";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Filosofia />
        <Estancias />
      </main>

      <Footer />
    </>
  );
}
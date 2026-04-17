import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Testimonial />
      <Footer />
    </div>
  )
}
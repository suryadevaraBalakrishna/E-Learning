import Image from "next/image";
import HeroBanner from "./components/HomeComponents/HeroBanner";
import Services from "./components/HomeComponents/Services";
import AboutUs from "./components/HomeComponents/AboutUs";
import ExpertInstructors from "./components/HomeComponents/ExpertInstructors";
import Category from "./components/HomeComponents/Category";


export default function Home() {
  return (
    <>
    <HeroBanner/>
    <Services/>
    <AboutUs/>
    <Category/>
    <ExpertInstructors/>
    </>
  );
}

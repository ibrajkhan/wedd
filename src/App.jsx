import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import CarouselEffect from "./components/Carousel";
import Main from "./components/Main";
import Program from "./components/Program";
import Rsvp from "./components/Rsvp";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomCard from "./components/CustomeCard";
import OurStory from "./components/OurStory";
import BookingFlight from "./components/BookingFlight";
import Try from "./components/Try";
import Family from "./components/Family";
import weddingMusic from "./assets/Music/wedding.mp3";
import Headers from "./components/Headers";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const audio = new Audio(weddingMusic);
  //   audio.loop = true;
  //   audio.play().catch((error) => {
  //     console.log("Auto-play was prevented:", error);
  //   });

  //   // Clean up the audio when the component unmounts
  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, []);
  return (
    <>
      {/* <Try /> */}
      <Header />
      {/* <Headers /> */}
      <CarouselEffect />
      <Main />
      <Rsvp />
      <WhatsAppButton />
      {/* <Family /> */}
    </>
  );
}

export default App;

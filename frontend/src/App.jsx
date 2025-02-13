import React, { useState, useEffect, useRef } from "react";
import { StickyNavbar } from "./components/Header";
import MapComponent from "./components/Map";
import logo2 from './assets/images/logo2-transparent.png'
import logo1 from './assets/images/logo1-transparent.png'
import logo3 from './assets/images/logo3-transparent.png'
import { Typography } from "@material-tailwind/react";
import anime from "animejs";
import socket from "./socket";
function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const textRef = useRef();
  useEffect(()=>{
    socket.on("locationUpdate", (data) => {
      console.log(data);
      setLocation(data);
    }); 
    return () => {
      socket.off("locationUpdate");
    };
  },[])
  useEffect(() => {
    anime.timeline()
      .add({
        targets: ".ml15 .word",
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i,
      })

  }, []);
  return (
    <>
      <StickyNavbar />
      <div className="container p-8 mx-auto">
        <div className="flex w-full justify-center items-center">
        <img src={logo2} alt="logo" className="hover:scale-105 transition-transform hover:cursor-pointer" style={{ height: 600 }} />
          <h1 className="ml15 flex flex-col gap-10">
            <span className="word font-holtwood text-gray-800 hover:text-orange-600 transition-colors">iii</span>
            
            <span className="word font-holtwood text-gray-800 hover:text-orange-600 transition-colors">eapp</span>

            <span className="word font-holtwood text-gray-800 hover:text-orange-600 transition-colors">entrep</span>
          </h1>
         
          
        </div>
        <div className="my-12">
          <h1 className="text-3xl font-bold underline text-center mb-4 font-holtwood text-orange-600">Locate your bag!</h1>
          <MapComponent location={location}/>
        </div>
        <div className="flex flex-col justify-center items-center">
            <Typography variant="h3" className="font-holtwood font-bold underline text-center mb-4 text-orange-600">About Us</Typography>

        </div>

      </div>

    </>
  );
}

export default App;

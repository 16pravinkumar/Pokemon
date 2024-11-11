
import { useEffect } from "react";
import { useState } from "react";

const DynamicDesktopSize = () => {
  const [currentSize, setCurrentSize] = useState(window.screen.width);

  const changeDesktopSize = () => {
    setCurrentSize(window.innerWidth);
  };

 
  useEffect(() => {
    window.addEventListener("resize", changeDesktopSize);
  
    return () => {
     window.removeEventListener('resize', changeDesktopSize)
    }
  }, [currentSize])
  

  return (
    <div className="bg-blue-700 w-100 h-[100vh] flex justify-center items-center flex-col">
      <h1 className=" font-extrabold text-2xl text-white">
        Change Your Desktop Size Dynamically
      </h1>
      <div className="">
        <h1 className="font-extrabold text-2xl text-white">{currentSize}</h1>
      </div>
    </div>
  );
};
export default DynamicDesktopSize;

import { useEffect } from "react";
import { useState } from "react";

const CounterUsingUseEffect = () => {
  const [counter, setCounter] = useState(0);

  useEffect(()=>{
   const interval =  setInterval(()=>{
      setCounter(prevCounter => prevCounter + 1);
    },1000)

    return () => clearInterval(interval)
  },[])

  return (
    <div className="bg-blue-700 w-100 h-[100vh] flex justify-center items-center flex-col">
      <h1 className=" font-extrabold text-2xl text-white">{counter}</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       
      >
        Increment
      </button>
    </div>
  );
};
export default CounterUsingUseEffect;

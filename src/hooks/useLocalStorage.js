// import { useEffect, useState } from "react";

// export function useLocalStorage(key,initialData){
//    const [data,setData]=useState(initialData)
//    useEffect(()=>{
//     const existingData=JSON.parse(localStorage.getItem(key))
//     if(existingData){
//         setData(existingData)
//     }else{
//         localStorage.setItem(key,JSON.stringify(initialData))
//     }
//    },[])
//    const updateLocalStorage=(newData)=>{
//     if(typeof newData === "function"){
//         localStorage.setItem(key,JSON.stringify(newData(data)))
//     }else{
//         localStorage.setItem(key,JSON.stringify(newData))
//     }
    
//     setData(newData)
//    }
//    return[data,updateLocalStorage]
// }

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    try {
      const existingData = localStorage.getItem(key);
      if (existingData !== null) {
        setData(JSON.parse(existingData));
      } else {
        localStorage.setItem(key, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
      // In case JSON.parse fails, we can just use the initialData
      setData(initialData);
    }
  }, []);// Empty dependency array ensures this runs only once on mount

  const updateLocalStorage = (newData) => {
    try {
      if (typeof newData === "function") {
        const updatedData = newData(data);
        localStorage.setItem(key, JSON.stringify(updatedData));
        setData(updatedData);
      } else {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData);
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  };

  return [data, updateLocalStorage];
}

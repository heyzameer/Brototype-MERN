import { MENU_API } from "./constants";
import { useEffect, useState } from "react";

const useRestuarantMenu =  (resId)=>{
    const [resInfo,setResInfo] = useState(null)

   useEffect(() => {
       const fetchMenu = async () => {
         try {
           const response = await fetch(`${MENU_API}${resId}`);
           const json = await response.json();
           setResInfo(json.data);
         } catch (error) {
           console.error("Failed to fetch menu:", error);
         }
       };
   
       fetchMenu();
     },[]);
     return resInfo;
}

export default useRestuarantMenu;
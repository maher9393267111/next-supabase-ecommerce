import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { supabase } from "../helper/functions";
import { toast } from "react-toastify";
import  {findUser} from '../helper/functions'
import { useRouter } from "next/router";

const authContext = createContext();


export const useglobal = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentuser, setUser] = useState({});
  const [userinfo, setUserinfo] = useState({});
const [productid , setProductid] = useState('')
  const [name, setName] = useState("maher");
  const [refreshcart , setRefreshcart] = useState(false)
const [cart, setCart] = useState([])
  const router = useRouter();

  const authuser = supabase?.auth.user();
  console.log("??????????", authuser);



  // ----modal

  const value = {
    name,
    setUserinfo,
    userinfo,
    productid , 
    setProductid ,
    refreshcart , setRefreshcart ,
    cart, setCart
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;

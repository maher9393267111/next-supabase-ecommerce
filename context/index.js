

import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

import {toast} from 'react-toastify';

import {useRouter} from 'next/router';
const authContext = createContext();

export const useglobal = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentuser, setUser] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
const [onotherUser, setOnotherUser] = useState(null);
 const [userownChats, setUserChats] = useState([]);
 const [name, setName] = useState('maher');

const router = useRouter();




 
 



  useEffect(() => {
  

   
  }, []);

  // ----modal





  







 













  const value = {
  
    name
   
   
 
  
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
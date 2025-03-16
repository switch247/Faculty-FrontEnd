// utils/auth.js
export const setToken = (token) => {
   if (typeof window !== "undefined") {
     localStorage.setItem("token", token);
     console.log("Token set:", token); // Debugging
   }
 };
 
 export const getToken = () => {
   if (typeof window !== "undefined") {
     return localStorage.getItem("token");
   }
   return null;
 };
 
 export const removeToken = () => {
   if (typeof window !== "undefined") {
     localStorage.removeItem("token");
     console.log("Token removed"); // Debugging
   }
 };
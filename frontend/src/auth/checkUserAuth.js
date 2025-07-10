import { redirect } from "react-router-dom";
import checkToken from "./checkToken";
// Login page should not display to logged in users
// Check if user is logged in
export default function checkUserAuth() {
  const isAuth = checkToken();
  
  if (isAuth) {
    return redirect("/products");
  };
  
  return;
};

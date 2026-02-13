import { SignedOut, SignedIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";

function App() {

  const {isSignedIn, isLoaded} = useUser();

  // this will get rid of the flickering effect
  if(!isLoaded) return null;

  return (
    <>
    <Routes>
      {/* <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} /> */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} /> */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      {/* <Route path="/problems" element={<ProblemsPage /> } /> */}
    </Routes>
    <Toaster />
    </>
  );
}

export default App;

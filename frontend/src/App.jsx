import { SignedOut, SignedIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import { Toaster } from "react-hot-toast";

function App() {

  const {isSignedIn} = useUser();

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;

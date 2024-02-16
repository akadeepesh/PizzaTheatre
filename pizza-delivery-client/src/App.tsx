import React from "react";
import { ThemeProvider } from "@material-tailwind/react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Landing from "./components/Landing";

const Layout = () => {
  return (
    <>
      <Routes>{/* <Route path="/" element={<Landing />}></Route> */}</Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

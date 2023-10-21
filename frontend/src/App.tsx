import React from "react";

import MainRouter from "./routers";
import { BrowserRouter } from "react-router-dom";

import './sass/style.sass'


const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
          <MainRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;

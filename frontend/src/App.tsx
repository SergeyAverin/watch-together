import React from "react";

import { BrowserRouter } from "react-router-dom";

import MainRouter from "./routers";
import { UserProvider } from "./providers/UserProvIder";

import './sass/style.sass'


const App: React.FC = () => {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;

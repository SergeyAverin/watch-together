import React from "react";

import { BrowserRouter } from "react-router-dom";

import MainRouter from "./routers";
import { UserIdProvider } from "./providers/UserIdProvIder";

import './sass/style.sass'


const App: React.FC = () => {
  return (
    <div>
      <UserIdProvider>
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
      </UserIdProvider>
    </div>
  );
};

export default App;

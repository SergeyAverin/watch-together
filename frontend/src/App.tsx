import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainRouter from "./routers";
import { UserProvider } from "./providers/UserProvIder";
import { store } from "@redux/store";

import "./sass/style.sass";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
};

export default App;

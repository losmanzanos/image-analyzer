import { Switch, Route } from "react-router-dom";

import "./App.css";
import Upload from "./components/upload/Upload";
import Header from "./components/header/header";

import Error from "./components/error/Error";
// import EditEntry from "../EditEntry/EditEntry";
import About from "./components/About/About";
import Info from "./components/Info/Info";

import PublicOnlyRoute from "./components/Utils/PublicOnlyRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";

import LoginPage from "../src/routes/LoginPage/LoginPage";
import RegistrationPage from "../src/routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../src/routes/NotFoundPage/NotFoundPage";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <Error>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/about" component={Info} />
            {/* <Route path="/gratitude/:id" component={EditEntry} /> */}
            <PublicOnlyRoute path="/login" component={LoginPage} />
            <PublicOnlyRoute path="/register" component={RegistrationPage} />
            <PrivateRoute path="/gallery" component={Upload} />
            <Route component={NotFoundPage} />
          </Switch>

          {/* <Upload /> */}
        </div>
      </Error>
    </AppProvider>
  );
}

export default App;

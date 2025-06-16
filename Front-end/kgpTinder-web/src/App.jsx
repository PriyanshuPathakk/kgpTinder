import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connectons from "./components/Connectons";
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="feed" element= {<Feed/>}/>
            <Route path="profile" element= {<Profile/>}/>
            <Route path="connections" element= {<Connectons/>}/>
            <Route path="requests" element = {<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

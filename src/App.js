import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              className="app__logo"
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Routes>
                  <Route path="/chats/view" element={<ChatView />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/" exact element={<WebcamCapture />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

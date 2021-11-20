import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import CloseIcon from "@mui/icons-material/Close";
import "./Preview.css";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import firebase from "firebase/compat/app";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const history = useNavigate();
  const dispatch = useDispatch();
  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.userName,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history("/chats");
          });
      }
    );
  };

  useEffect(() => {
    if (!cameraImage) {
      history("/");
    }
  }, [cameraImage, history]);

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <div className="preview__toolbarRight"></div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;

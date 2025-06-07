import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotify } from "../redux/actions";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Notify() {
  const notifyMessage = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notifyMessage) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(hideNotify());  
      }, 3000);
    }
  }, [notifyMessage, dispatch]);

  return (
    <>
      {show && (
        <ToastContainer position="top-center" className="p-3">
          <Toast
            className={`${
              notifyMessage.type === "success"
                ? "bg-success text-white"
                : notifyMessage.type === "danger"
                ? "bg-danger text-white"
                : notifyMessage.type === "warning"
                ? "bg-warning text-dark"
                : "bg-info text-dark"
            } shadow-lg rounded`}
          >
            <Toast.Body>{notifyMessage.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
}

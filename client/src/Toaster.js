import React,{useState} from "react";
import Toast from "react-bootstrap/Toast";

const Toaster = ({ message }) => {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Error</strong>
        <small>few sec ago</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Toaster;

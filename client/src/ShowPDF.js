import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ShowPDF = ({fileUrl,loading,setFileUrl,setFile,setResult}) => {
  return (
    <div className="showpdf" style={{marginTop:"30px"}}>
      <embed className="Resume" src={fileUrl} type="application/pdf"/>
      {loading ? (
        <Spinner animation="grow" variant="primary" />
      ) : (
        <Button
          onClick={() => {
            setFileUrl("");
            setFile(null);
            setResult(false);
          }}
          variant="outline-danger"
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default ShowPDF;

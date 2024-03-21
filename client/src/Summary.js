import React from "react";
import Container from 'react-bootstrap/Container';

const SummaryData = ({ summary ,title}) => {
  return (
    <Container fluid style={{padding:"1rem",display: "flex", flexDirection: "column",alignItems:"center"}}>
      <h2>{title}</h2>
      <div className="result">
        <p className="resultText">
          {summary || ""}
        </p>
      </div>
    </Container>
  );
};

export default SummaryData;

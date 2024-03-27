import "./App.css";
import { useEffect, useState } from "react";
import SummaryData from "./Summary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import ShowPDF from "./ShowPDF";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Toaster from "./Toaster";

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileEnter, setFileEnter] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [JD, setJD] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setEM] = useState("");
  const [title, setTitle] = useState("");

  const generateEmail = async () => {
    if (file) {
      if (apiKey === "") {
        setError(true);
        setEM("Enter your open API key");
        return;
      }
      setLoading(true);
      var data = new FormData();
      data.append("file", file);
      data.append("apiKey", apiKey);
      const res = await fetch(process.env.DOMAIN_NAME + "/api/email", {
        method: "POST",
        body: data,
      });

      let respData = await res.json();
      console.log(respData);
      if (respData.error) {
        console.log(respData.error);
      } else {
        setSummary(respData.summary);
        setTitle("Email to Recruiter");
        setResult(true);
      }

      setLoading(false);
    } else {
      setError(true);
      setEM("Please enter your resume");
    }
  };

  const generateCV = async () => {
    if (file) {
      if (apiKey === "") {
        setError(true);
        setEM("Enter your open API key");
        return;
      }
      setLoading(true);
      var data = new FormData();
      data.append("file", file);
      data.append("apiKey", apiKey);
      const res = await fetch(process.env.DOMAIN_NAME + "/api/generateCv", {
        method: "POST",
        body: data,
      });

      let respData = await res.json();
      if (respData.error) {
        console.log(respData.error);
      } else {
        setSummary(respData.summary);
        setTitle("Suggestions");
        setResult(true);
      }

      setLoading(false);
    } else {
      setError(true);
      setEM("Suggestions");
    }
  };

  const findKeywords = async () => {
    if (file) {
      if (JD === "") {
        setError(true);
        setEM("Enter Job Description");
        return;
      }
      if (apiKey === "") {
        setError(true);
        setEM("Enter your open API key");
        return;
      }
      setLoading(true);
      var data = new FormData();
      data.append("file", file);
      data.append("JD", JD);
      data.append("apiKey", apiKey);
      const res = await fetch(process.env.DOMAIN_NAME + "/api/Scanner", {
        method: "POST",
        body: data,
      });

      let respData = await res.json();
      console.log(respData);
      if (respData.error) {
        console.log(respData.error);
      } else {
        setSummary(respData.summary);
        setTitle("Missing Keywords");
        setResult(true);
      }
      setLoading(false);
    } else {
      setError(true);
      setEM("Please enter your resume");
    }
  };

  const modifyResume = async () => {
    if (file) {
      if (JD === "") {
        setError(true);
        setEM("Enter Job Description");
        return;
      }
      if (apiKey === "") {
        setError(true);
        setEM("Enter your open API key");
        return;
      }
      setLoading(true);
      var data = new FormData();
      data.append("file", file);
      data.append("JD", JD);
      data.append("apiKey", apiKey);
      const res = await fetch(process.env.DOMAIN_NAME + "/api/modify", {
        method: "POST",
        body: data,
      });

      let respData = await res.json();
      console.log(respData);
      if (respData.error) {
        console.log(respData.error);
      } else {
        setSummary(respData.summary);
        setTitle("Modified CV");
        setResult(true);
      }
      setLoading(false);
    } else {
      setError(true);
      setEM("Please enter your resume");
    }
  };

  return (
    <div className="App">
      <div
        style={{
          fontWeight: "800",
          fontSize: "2.5rem",
          position: "fixed",
          top: "0",
          left: "5px",
        }}
      >
        <span style={{ color: "blue" }}>R</span>scanner
      </div>
      {error && <Toaster message={errorMessage} />}
      {!result ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    let blobUrl = URL.createObjectURL(file);
                    setFileUrl(blobUrl);
                    setFile(file);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className="Upload"
        >
          {!fileUrl ? (
            <>
              <label htmlFor="file">
                Click to upload or drag and drop
                <FontAwesomeIcon
                  icon={faUpload}
                  style={{ color: "blue", margin: "0 6px" }}
                />
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  //console.log(e.target.files);
                  let files = e.target.files;
                  if (files && files[0]) {
                    let blobUrl = URL.createObjectURL(files[0]);
                    setFile(files[0]);
                    setFileUrl(blobUrl);
                  }
                }}
              />
              <label htmlFor="file" className="btn-2">
                upload
              </label>
            </>
          ) : (
            <>
              <Container className="main" style={{ display: "flex" }}>
                <Card className="JD">
                  <Card.Body style={{ display: "grid" }}>
                    <Card.Title>Enter Job Description</Card.Title>
                    <Form.Control
                      as="textarea"
                      className="text"
                      value={JD}
                      onChange={(e) => setJD(e.target.value)}
                      placeholder="Enter JD"
                    />{" "}
                    <Button
                      style={{ marginTop: "7px" }}
                      variant="outline-info"
                      onClick={findKeywords}
                    >
                      Find Missing Keywords
                    </Button>
                    <Button
                      style={{ marginTop: "7px" }}
                      variant="outline-info"
                      onClick={modifyResume}
                    >
                      Generate Modified Resume
                    </Button>
                  </Card.Body>
                </Card>
                <ShowPDF
                  loading={loading}
                  fileUrl={fileUrl}
                  setFileUrl={setFileUrl}
                  setFile={setFile}
                  setResult={setResult}
                />
              </Container>
              <Container fluid className="todo">
                <InputGroup className="mb-3" style={{ width: "50vw" }}>
                  <InputGroup.Text
                    style={{ color: "white", backgroundColor: "#30373e" }}
                    id="basic-addon1"
                  >
                    Enter Open AI API key
                  </InputGroup.Text>
                  <Form.Control
                    style={{ color: "white", backgroundColor: "#212529" }}
                    placeholder="API key"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    aria-label="apiKey"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="outline-info"
                  onClick={generateEmail}
                >
                  Generate an email to recruiter
                </Button>
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="outline-info"
                  onClick={generateCV}
                >
                  Scan my Resume for improvement
                </Button>
              </Container>
            </>
          )}
        </div>
      ) : (
        <div className="uploaded">
          <ShowPDF
            loading={loading}
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            setFile={setFile}
            setResult={setResult}
          />
          {summary && <SummaryData summary={summary} title={title} />}
        </div>
      )}
    </div>
  );
}

export default App;

const { OpenAI } = require("openai");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const PdfParse = require("pdf-parse");

const app = express();
app.use(express.json());


const prompt =
  ["Write a short email in 200words to recruiter for any poentential opening of relevant field based on my Resume. Also tell them that you have attached your resume in email.Only return email.",
"Now based on this data find missing keywords in my resume based on given job description. Return only keywords which are either languages, tools/technologies, frameworks or databases and no subheading.Note: only show missing keywords dont show keywords which i have in my resume and show in points",
"Suggest some improvement based on my Resume to attract the recruiter.Also give short and crisp  example from my resume to enhance any word or keywords or line .Dont tell me what I have just tell me what I can modify. Answer in 300 words"];


const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
});

app.use(cors());
app.post("/Scanner", upload.single("file"), async (req, res) => {
  const JD = req.body.JD;
  const openai = new OpenAI({
    apiKey: req.body.apiKey,
  });
  try {
    if (req.file) {
      const data = await extractTextFromPDF(req.file);
      //console.log(data);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${data} Job Description:${JD} ${prompt[1]}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // console.log(response.choices[0].message);
      let message = response.choices[0].message.content;
      return res.send({summary:message});
    }
  } catch (err) {
    console.log(err);
    return res.send({ error: "Something went wrong Please try again later!" });
  }
});

app.post("/email", upload.single("file"), async (req, res) => {
  const openai = new OpenAI({
    apiKey: req.body.apiKey,
  });
  try {
    if (req.file) {
      const data = await extractTextFromPDF(req.file);
     // console.log(data);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${prompt[0]} ${data}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // console.log(response.choices[0].message);
      let message = response.choices[0].message.content;
      return res.send({ summary: message });
    }
  } catch (err) {
    console.log(err);
    return res.send({ error: "Something went wrong Please try again later!" });
  }
});

app.post("/modify", upload.single("file"), async (req, res) => {
  const openai = new OpenAI({
    apiKey: req.body.apiKey,
  });
  try {
    if (req.file) {
      const data = await extractTextFromPDF(req.file);
      //console.log(data);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${prompt[2]} ${data}`,
          },
        ],
        temperature: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
       console.log(response.choices[0].message);
      let message = response.choices[0].message.content;
      return res.send({ summary: message });
    }
  } catch (err) {
    console.log(err);
    return res.send({ error: "Something went wrong Please try again later!" });
  }
});

const extractTextFromPDF = async (file) => {
  try {
    const data = await PdfParse(file.buffer);
    return data.text;
  } catch (error) {
    throw new Error("Error extracting text from PDF:" + error);
  }
};

app.listen(5000, () => {
  console.log("SERVER STARTED");
});

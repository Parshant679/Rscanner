const { OpenAI } = require("openai");
const extractTextFromPDF = require("../utility/pdfFunctions");

const pdfCtrl = {
  scanPdf: async (req, res) => {
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
              content: `${data} Job Description:${JD} ${process.env.MISSING_KEYWORD_PROMPT} `,
            },
          ],
          temperature: 1,
          max_tokens: 512,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(response.choices[0].message);
        let message = response.choices[0].message.content;
        return res.send({ summary: message });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        error: "Something went wrong Please try again later!",
      });
    }
  },
  modifyPdf: async (req, res) => {
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
              content: `${data} Job Description:${JD} ${process.env.IMPROVEMENT_PROMPT} `,
            },
          ],
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(response.choices[0].message);
        let message = response.choices[0].message.content;
        return res.send({ summary: message });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        error: "Something went wrong Please try again later!",
      });
    }
  },
};

module.exports = pdfCtrl;

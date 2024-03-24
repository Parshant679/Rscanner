const { OpenAI } = require("openai");
const extractTextFromPDF = require("../utility/pdfFunctions");
const CvCtrl = {
  modifyCv: async (req, res) => {
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
              content: `${process.env.RESUME_BUILDER_PROMPT}  my resume : ${data}`,
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
      return res.send({
        error: "Something went wrong Please try again later!",
      });
    }
  },
};

module.exports = CvCtrl;

const PdfParse = require("pdf-parse");
const extractTextFromPDF = async (file) => {
  try {
    const data = await PdfParse(file.buffer);
    return data.text;
  } catch (error) {
    throw new Error("Error extracting text from PDF:" + error);
  }
};
module.exports = extractTextFromPDF;

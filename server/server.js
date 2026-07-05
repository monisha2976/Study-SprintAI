require("dotenv").config();

console.log(
  "API Key loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("StudySprint AI Backend Running 🚀");
});

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    // -------------------------------
    // ✅ SAFE PDF PARSING (FIXED)
    // -------------------------------
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    let pdfData;

    try {
      pdfData = await pdf(dataBuffer);
    } catch (err) {
      console.log("PDF PARSE FAILED:", err);

      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "Invalid or unsupported PDF file"
      });
    }

    // -------------------------------
    // GEMINI MODEL
    // -------------------------------
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI Study Assistant.

Analyze the uploaded notes carefully.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT explain anything.

Return EXACTLY in this format:

{
  "summary":"A concise summary.",

  "planner":"A detailed 5-day study plan.",

  "mcqs":[
    {
      "question":"Question here",
      "options":[
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer":"The exact correct option"
    }
  ]
}

Rules:
- Generate exactly 10 MCQs.
- Every MCQ must have exactly 4 options.
- "answer" MUST exactly match one option.
- Questions should test understanding.

Notes:

${pdfData.text}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("========== GEMINI RESPONSE ==========");
    console.log(text);
    console.log("=====================================");

    // -------------------------------
    // CLEAN RESPONSE
    // -------------------------------
    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    cleaned = cleaned.substring(start, end + 1);

    // -------------------------------
    // SAFE JSON PARSE (FIXED)
    // -------------------------------
    let aiResponse;

    try {
      aiResponse = JSON.parse(cleaned);
    } catch (err) {
      console.log("JSON PARSE FAILED:");
      console.log(cleaned);

      return res.status(500).json({
        message: "AI returned invalid JSON format"
      });
    }

    // -------------------------------
    // CLEANUP FILE
    // -------------------------------
    fs.unlinkSync(req.file.path);

    res.json(aiResponse);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "AI generation failed",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
# 🚀 StudySprint AI

StudySprint AI is an AI-powered study assistant that helps students learn more efficiently by transforming PDF notes into concise summaries, interactive quizzes, and personalized study plans.

## 📌 Overview

Students often spend hours reading lengthy notes before exams. StudySprint AI simplifies this process by allowing users to upload their study material in PDF format and instantly receive:

* 📄 AI-generated summaries
* 📝 Multiple-choice quizzes
* 📅 Personalized study planner

The application uses Google's Gemini AI model to analyze educational content and generate intelligent learning resources.

---

## ✨ Features

### 📂 PDF Upload

* Upload study notes in PDF format.
* Secure file handling using Multer.

### 🤖 AI-Powered Summary

* Generates a concise summary of uploaded notes.
* Highlights important concepts for quick revision.

### 📝 Interactive Quiz

* Automatically creates 10 multiple-choice questions.
* Four options for every question.
* Instant answer validation.
* Displays the correct answer for incorrect responses.
* Calculates quiz score automatically.

### 📅 AI Study Planner

* Generates a structured 5-day study plan.
* Helps students organize revision effectively.

### 🎯 User-Friendly Interface

* Simple and clean UI.
* Responsive design.
* Easy PDF upload process.
* Real-time loading indicator while AI processes the notes.

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Multer
* pdf-parse
* Google Gemini API

### Deployment

* Frontend: Render
* Backend: Render

---

## 📂 Project Structure

```text
StudySprintAI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd StudySprintAI
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=AQ.Ab8RN6IwT2gwi7LCQhLFa-NegRJPZbCT6uNb9IY0OjUI1_jF4g
```

Run the backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🚀 How It Works

1. User uploads a PDF.
2. Backend extracts text from the PDF.
3. Gemini AI analyzes the content.
4. AI generates:

   * Summary
   * 10 MCQs
   * 5-Day Study Planner
5. Results are displayed on the frontend.

---

## 📸 Key Functionalities

* Upload educational PDFs
* AI-generated summaries
* Interactive MCQ quiz
* Automatic score calculation
* AI-generated study planner
* Fast and responsive user interface

---

## 🔒 Environment Variables

Create a `.env` file in the backend folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 💡 Future Enhancements

* User authentication
* Study history
* Download summary as PDF
* Flashcard generation
* OCR support for scanned PDFs
* Multi-language support
* Difficulty-level selection for quizzes
* Progress tracking dashboard

---

## 👩‍💻 Author

**Monisha Nakka**

---

## 📄 License

This project is developed for educational and learning purposes.

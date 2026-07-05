import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [planner, setPlanner] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://study-sprintai-1.onrender.com/upload",
        formData
      );

      setSummary(res.data.summary || "");
      setMcqs(res.data.mcqs || []);
      setPlanner(res.data.planner || []);

      setSelectedAnswers({});
      setScore(0);

    } catch (err) {
  console.log("FULL ERROR:", err.response?.data || err.message);
  alert(err.response?.data?.message || err.message);
}

    setLoading(false);
  };

  const chooseAnswer = (questionIndex, option, answer) => {

    if (selectedAnswers[questionIndex]) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });

    if (option === answer) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-6xl font-bold text-center">
        🚀 StudySprint AI
      </h1>

      <p className="text-center text-slate-300 mt-3">
        Upload Notes → AI Summary → Quiz → Study Planner
      </p>

      <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-xl mt-10">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadFile}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl w-full mt-5"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

      {summary && (

        <div className="max-w-5xl mx-auto bg-slate-800 mt-10 p-8 rounded-xl">

          <h2 className="text-3xl font-bold mb-5">
            📄 Summary
          </h2>

          <p className="text-slate-300 whitespace-pre-line">
            {summary}
          </p>

        </div>

      )}

      {mcqs.length > 0 && (

        <div className="max-w-5xl mx-auto bg-slate-800 mt-10 p-8 rounded-xl">

          <h2 className="text-3xl font-bold mb-6">
            📝 Quiz
          </h2>

          {mcqs.map((q, i) => (

            <div
              key={i}
              className="bg-slate-700 p-5 rounded-xl mb-6"
            >

              <h3 className="font-bold mb-4">
                {i + 1}. {q.question}
              </h3>

              {q.options.map((option, index) => {

                const selected = selectedAnswers[i];

                let bg = "bg-slate-600 hover:bg-blue-600";

                if (selected) {

                  if (option === q.answer) {
                    bg = "bg-green-600";
                  }

                  else if (option === selected) {
                    bg = "bg-red-600";
                  }
                }

                return (

                  <button
                    key={index}
                    disabled={selected}
                    onClick={() =>
                      chooseAnswer(i, option, q.answer)
                    }
                    className={`block w-full text-left rounded-lg p-3 mb-2 transition ${bg}`}
                  >
                    {option}
                  </button>

                );

              })}

              {selectedAnswers[i] && (

                <div className="mt-3">

                  {selectedAnswers[i] === q.answer ? (

                    <p className="text-green-400 font-bold">
                      ✅ Correct!
                    </p>

                  ) : (

                    <div>

                      <p className="text-red-400 font-bold">
                        ❌ Wrong!
                      </p>

                      <p className="text-yellow-300">
                        Correct Answer: <b>{q.answer}</b>
                      </p>

                    </div>

                  )}

                </div>

              )}

            </div>

          ))}

          <div className="text-center mt-10">

            <h2 className="text-3xl font-bold text-green-400">
                🎯 Score : {score} / {mcqs.length}
            </h2>

          </div>

        </div>

      )}

      {planner && (

        <div className="max-w-5xl mx-auto bg-slate-800 mt-10 p-8 rounded-xl">

          <h2 className="text-3xl font-bold mb-5">
            📅 Study Planner
          </h2>

          <p className="text-slate-300 whitespace-pre-line">
            {planner}
          </p>

        </div>

      )}

    </div>
  );
}

export default App;
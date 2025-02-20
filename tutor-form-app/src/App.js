import { useState, useRef } from "react";
import { motion } from "framer-motion";

const questions = [
  { id: "name", question: "What's your name?", type: "text" },
  { id: "email", question: "What's your email?", type: "email" },
  { id: "age", question: "How old are you?", type: "number" },
  { id: "feedback", question: "Any feedback for us?", type: "textarea" },
  { id: "experience", question: "Do you have prior experience?", type: "select", options: ["Yes", "No"] },
  { id: "details", question: "Please describe your experience.", type: "textarea", condition: (formData) => formData.experience === "Yes" },
  { id: "resume", question: "Upload your resume (PDF/DOCX)", type: "file", accept: ".pdf,.docx" }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (questions[step].type === "file") {
      setFormData({ ...formData, [questions[step].id]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [questions[step].id]: e.target.value });
    }
  };

  const handleNext = () => {
    let nextStep = step + 1;
    while (questions[nextStep] && questions[nextStep].condition && !questions[nextStep].condition(formData)) {
      nextStep++;
    }
    if (nextStep < questions.length) {
      setStep(nextStep);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && questions[step].type !== "file") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-orange-500 via-blue-500 to-white-500 text-white px-14">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="w-1/3 min-w-[350px] px-12 py-16 bg-gray-800 bg-opacity-70 rounded-3xl shadow-lg text-center"
      >
        <div className="text-lg text-gray-200 mb-6">
          {step + 1} / {questions.length}
        </div>

        <h2 className="text-4xl font-semibold mb-10">{questions[step].question}</h2>

        {questions[step].type === "textarea" ? (
          <textarea
            ref={inputRef}
            className="w-full bg-transparent border-b border-grey-500 focus:outline-none focus:border-white text-lg py-4"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={formData[questions[step].id] || ""}
            autoFocus
          />
        ) : questions[step].type === "select" ? (
          <select
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-lg py-4"
            onChange={handleChange}
            value={formData[questions[step].id] || ""}
          >
            {questions[step].options.map((option) => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        ) : questions[step].type === "file" ? (
          <input
            type="file"
            accept={questions[step].accept}
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-lg py-4"
            onChange={handleChange}
          />
        ) : (
          <input
            ref={inputRef}
            type={questions[step].type}
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-lg py-4"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={formData[questions[step].id] || ""}
            autoFocus
          />
        )}

        <div className="mt-12 flex justify-between">
          {step > 0 && (
            <button className="text-white bg-orange-500 px-10 py-4 text-lg rounded-full hover:text-orange text-lg" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}

          <button className="text-white bg-blue-500 px-10 py-4 text-lg rounded-full hover:bg-blue-600" onClick={handleNext}>
            {step < questions.length - 1 ? "Next →" : "Submit"}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-12 h-4 bg-gray-700 rounded-full">
          <motion.div
            className="h-4 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

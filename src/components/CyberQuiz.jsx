
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const quizData = {
  en: [
    {
      question: "What should you do if an unknown person asks for your OTP?",
      options: [
        "Share the OTP",
        "Never share the OTP",
        "Send it on WhatsApp",
        "Post it on social media"
      ],
      answer: 1,
      explanation: "OTP is private. Never share it with anyone."
    },
    {
      question: "Which number is used to report financial cyber fraud in India?",
      options: ["100", "101", "1930", "1098"],
      answer: 2,
      explanation: "Call 1930 to report financial cyber fraud in India."
    },
    {
      question: "Which is an example of a strong password?",
      options: ["123456", "password", "Jitesh123", "T!ger#82Moon"],
      answer: 3,
      explanation: "Use a mix of uppercase, lowercase, numbers and special characters."
    },
    {
      question: "What should you do with a suspicious link?",
      options: [
        "Click immediately",
        "Forward it to friends",
        "Verify it before opening",
        "Enter your password"
      ],
      answer: 2,
      explanation: "Suspicious links may steal personal or banking information."
    },
    {
      question: "What is the purpose of Two-Factor Authentication?",
      options: [
        "Increase internet speed",
        "Add an extra layer of account security",
        "Increase phone storage",
        "Remove your password"
      ],
      answer: 1,
      explanation: "2FA adds another verification step during login."
    }
  ],

  hi: [
    {
      question: "Agar koi anjaan vyakti aapse OTP maange toh kya karna chahiye?",
      options: [
        "OTP share kar dena chahiye",
        "OTP kabhi share nahi karna chahiye",
        "WhatsApp par bhej dena chahiye",
        "Social media par post kar dena chahiye"
      ],
      answer: 1,
      explanation: "OTP private hota hai. Ise kisi ke saath share mat karein."
    },
    {
      question: "India mein financial cyber fraud report karne ka number kya hai?",
      options: ["100", "101", "1930", "1098"],
      answer: 2,
      explanation: "Financial cyber fraud report karne ke liye 1930 par call karein."
    },
    {
      question: "Strong password ka example kaunsa hai?",
      options: ["123456", "password", "Jitesh123", "T!ger#82Moon"],
      answer: 3,
      explanation: "Password mein capital letters, small letters, numbers aur special characters ka mix rakhein."
    },
    {
      question: "Suspicious link milne par kya karna chahiye?",
      options: [
        "Turant click karna chahiye",
        "Friends ko forward karna chahiye",
        "Open karne se pehle verify karna chahiye",
        "Apna password enter karna chahiye"
      ],
      answer: 2,
      explanation: "Fake links aapki personal aur banking information chura sakte hain."
    },
    {
      question: "Two-Factor Authentication (2FA) ka kya fayda hai?",
      options: [
        "Internet speed badhana",
        "Account ko extra security dena",
        "Phone storage badhana",
        "Password hata dena"
      ],
      answer: 1,
      explanation: "2FA login ke waqt password ke alawa ek extra verification step deta hai."
    }
  ]
};

function CyberQuiz() {
  const { language } = useLanguage();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const questions = quizData[language] || quizData.en;
  const question = questions[current];

  const text = language === "hi"
    ? {
        title: "साइबर सुरक्षा प्रश्नोत्तरी",
        description: "अपनी साइबर सुरक्षा जानकारी जांचें।",
        question: "प्रश्न",
        score: "स्कोर",
        correct: "सही जवाब! 🎉",
        incorrect: "गलत जवाब!",
        next: "अगला प्रश्न →",
        result: "अंतिम स्कोर देखें",
        completed: "क्विज पूरा हुआ! 🎉",
        excellent: "बहुत बढ़िया! आपकी साइबर सुरक्षा की जानकारी अच्छी है।",
        good: "अच्छा प्रयास! सीखते रहें और सतर्क रहें।",
        practice: "अभ्यास जारी रखें और फिर से कोशिश करें।",
        retry: "दोबारा कोशिश करें"
      }
    : {
        title: "Cyber Safety Quiz",
        description: "Test your cyber safety knowledge.",
        question: "Question",
        score: "Score",
        correct: "Correct answer! 🎉",
        incorrect: "Incorrect answer!",
        next: "Next Question →",
        result: "See Final Score",
        completed: "Quiz Completed! 🎉",
        excellent: "Excellent! You have good cyber safety knowledge.",
        good: "Good job! Keep learning and stay alert.",
        practice: "Keep practising and try again.",
        retry: "Try Again"
      };

  function checkAnswer(index) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((previous) => previous + 1);
      setSelected(null);
    }
  }

  function restartQuiz() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  return (
    <section className="cyber-quiz">
      <span className="section-tag">LEARN CYBER SAFETY</span>

      <h2>{text.title}</h2>
      <p>{text.description}</p>

      {!finished ? (
        <>
          <div className="quiz-top">
            <span>
              {text.question} {current + 1} / {questions.length}
            </span>
            <strong>{text.score}: {score}</strong>
          </div>

          <div className="quiz-progress">
            <div
              style={{
                width: `${((current + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          <h3>{question.question}</h3>

          <div className="quiz-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option ${
                  selected !== null && index === question.answer
                    ? "correct"
                    : selected === index
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => checkAnswer(index)}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className="quiz-feedback">
              <strong>
                {selected === question.answer
                  ? text.correct
                  : text.incorrect}
              </strong>

              <p>{question.explanation}</p>

              <button className="save-button" onClick={nextQuestion}>
                {current === questions.length - 1
                  ? text.result
                  : text.next}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="quiz-result">
          <h3>{text.completed}</h3>
          <h2>{score} / {questions.length}</h2>

          <p>
            {score === 5
              ? text.excellent
              : score >= 3
              ? text.good
              : text.practice}
          </p>

          <button className="save-button" onClick={restartQuiz}>
            {text.retry}
          </button>
        </div>
      )}
    </section>
  );
}

export default CyberQuiz;

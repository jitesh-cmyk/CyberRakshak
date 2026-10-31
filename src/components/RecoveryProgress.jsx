
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const tasks = [
  {
    id: "secured",
    en: "Account or payment method secured",
    hi: "अकाउंट या पेमेंट सुविधा सुरक्षित की"
  },
  {
    id: "contacted",
    en: "Bank or platform contacted",
    hi: "बैंक या संबंधित प्लेटफॉर्म से संपर्क किया"
  },
  {
    id: "evidence",
    en: "Screenshots and evidence collected",
    hi: "स्क्रीनशॉट और सबूत इकट्ठा किए"
  },
  {
    id: "reported",
    en: "Incident reported through the appropriate channel",
    hi: "उचित माध्यम से घटना की रिपोर्ट की"
  },
  {
    id: "reference",
    en: "Complaint reference number saved",
    hi: "शिकायत का रेफरेंस नंबर सुरक्षित रखा"
  }
];

function RecoveryProgress({ incident }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const storageKey = `cyberrakshak_recovery_${incident.id}`;

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey)) || [];

      // Convert older English task labels into stable task IDs.
      return tasks
        .filter((task) =>
          saved.includes(task.id) || saved.includes(task.en)
        )
        .map((task) => task.id);
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");

  function toggleTask(taskId) {
    setCompletedTasks((previous) =>
      previous.includes(taskId)
        ? previous.filter((item) => item !== taskId)
        : [...previous, taskId]
    );

    setMessage("");
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(completedTasks));

    setMessage(
      isHindi
        ? "आपकी रिकवरी प्रगति सेव हो गई है।"
        : "Your recovery progress has been saved."
    );
  }

  const progress = Math.round(
    (completedTasks.length / tasks.length) * 100
  );

  return (
    <section className="recovery-progress">
      <span className="section-tag">
        {isHindi ? "रिकवरी वर्कस्पेस" : "RECOVERY WORKSPACE"}
      </span>

      <h2>
        {isHindi ? "रिकवरी प्रगति ट्रैकर" : "Recovery Progress Tracker"}
      </h2>

      <p>
        {isHindi
          ? "आपने जो सुरक्षा और रिपोर्टिंग के कदम पूरे किए हैं, उन्हें ट्रैक करें।"
          : "Track the safety and reporting steps you have completed."}
      </p>

      <div className="progress-info">
        <span>
          {isHindi ? "कुल प्रगति" : "Overall progress"}
        </span>
        <strong>{progress}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="recovery-list">
        {tasks.map((task) => (
          <label className="checklist-item" key={task.id}>
            <input
              type="checkbox"
              checked={completedTasks.includes(task.id)}
              onChange={() => toggleTask(task.id)}
            />

            <span>{isHindi ? task.hi : task.en}</span>
          </label>
        ))}
      </div>

      <button className="save-button" onClick={saveProgress}>
        {isHindi ? "रिकवरी प्रगति सेव करें" : "Save Recovery Progress"}
      </button>

      {message && <p className="save-message">{message}</p>}
    </section>
  );
}

export default RecoveryProgress;

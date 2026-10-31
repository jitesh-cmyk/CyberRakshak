
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

function EvidenceManager({ incident }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const storageKey = `cyberrakshak_${incident.id}`;

  const [details, setDetails] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey))?.details || {};
    } catch {
      return {};
    }
  });

  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey))?.checkedItems || [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");

  // English keys remain stable for saved data.
  const fields = incident.evidenceFields || [];
  const hindiFields = incident.evidenceFieldsHi || fields;

  const progress = fields.length
    ? Math.round((checkedItems.length / fields.length) * 100)
    : 0;

  function getLabel(field) {
    const index = fields.indexOf(field);
    return isHindi ? hindiFields[index] || field : field;
  }

  function updateDetail(field, value) {
    setDetails((previous) => ({
      ...previous,
      [field]: value
    }));
    setMessage("");
  }

  function toggleEvidence(field) {
    setCheckedItems((previous) =>
      previous.includes(field)
        ? previous.filter((item) => item !== field)
        : [...previous, field]
    );
    setMessage("");
  }

  function saveEvidence() {
    const record = {
      details,
      checkedItems,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(storageKey, JSON.stringify(record));

    setMessage(
      isHindi
        ? "आपकी जानकारी इस ब्राउज़र में सुरक्षित हो गई है।"
        : "Your evidence details have been saved in this browser."
    );
  }

  return (
    <section className="evidence-manager">
      <div className="evidence-heading">
        <span className="section-tag">
          {isHindi ? "आपका केस वर्कस्पेस" : "YOUR CASE WORKSPACE"}
        </span>

        <h2>
          {isHindi ? "सबूत प्रबंधन" : "Evidence Manager"}
        </h2>

        <p>
          {isHindi
            ? "अपनी घटना से जुड़ी जानकारी व्यवस्थित रखें।"
            : "Organize the information related to your incident."}
        </p>
      </div>

      <div className="privacy-note">
        🔒{" "}
        {isHindi
          ? "आपकी जानकारी इसी ब्राउज़र में सेव होती है। OTP, UPI PIN, पासवर्ड या पूरे कार्ड की जानकारी कभी न डालें।"
          : "Your details are saved in this browser only. Never enter OTP, UPI PIN, passwords or full card details."}
      </div>

      <h3>
        {isHindi ? "घटना की जानकारी" : "Incident Details"}
      </h3>

      <div className="evidence-form">
        {fields.map((field) => (
          <label className="evidence-field" key={field}>
            <span>{getLabel(field)}</span>

            <input
              type="text"
              placeholder={
                isHindi
                  ? `${getLabel(field)} दर्ज करें`
                  : `Enter ${field.toLowerCase()}`
              }
              value={details[field] || ""}
              onChange={(event) =>
                updateDetail(field, event.target.value)
              }
            />
          </label>
        ))}
      </div>

      <h3>
        {isHindi
          ? "सबूत इकट्ठा करने की चेकलिस्ट"
          : "Evidence Collection Checklist"}
      </h3>

      <p className="evidence-help">
        {isHindi
          ? "सबूत सुरक्षित रूप से इकट्ठा करने के बाद टिक करें।"
          : "Tick each item after you have safely collected it."}
      </p>

      <div className="progress-info">
        <span>
          {isHindi ? "संग्रह की प्रगति" : "Collection progress"}
        </span>
        <strong>{progress}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="checklist">
        {fields.map((field) => (
          <label className="checklist-item" key={field}>
            <input
              type="checkbox"
              checked={checkedItems.includes(field)}
              onChange={() => toggleEvidence(field)}
            />
            <span>{getLabel(field)}</span>
          </label>
        ))}
      </div>

      <button className="save-button" onClick={saveEvidence}>
        💾{" "}
        {isHindi ? "सबूत की जानकारी सेव करें" : "Save Evidence Details"}
      </button>

      {message && <p className="save-message">{message}</p>}
    </section>
  );
}

export default EvidenceManager;

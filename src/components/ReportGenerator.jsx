
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

function ReportGenerator({ incident }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const evidenceKey = `cyberrakshak_${incident.id}`;
  const recoveryKey = `cyberrakshak_recovery_${incident.id}`;

  const [showReport, setShowReport] = useState(false);

  let evidence = {};
  let recovery = [];

  try {
    const savedEvidence = JSON.parse(
      localStorage.getItem(evidenceKey)
    );
    evidence = savedEvidence?.details || {};
  } catch {
    evidence = {};
  }

  try {
    const savedRecovery =
      JSON.parse(localStorage.getItem(recoveryKey)) || [];

    recovery = Array.isArray(savedRecovery) ? savedRecovery : [];
  } catch {
    recovery = [];
  }

  const recoveryTasks = [
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

  const completedTasks = recoveryTasks.filter((task) =>
    recovery.includes(task.id) || recovery.includes(task.en)
  );

  const incidentTitle = isHindi
    ? incident.titleHi || incident.title
    : incident.title;

  const incidentDescription = isHindi
    ? incident.descriptionHi || incident.description
    : incident.description;

  const evidenceFields = incident.evidenceFields || [];
  const hindiFields = incident.evidenceFieldsHi || evidenceFields;

  function printReport() {
    window.print();
  }

  return (
    <section className="report-generator">
      <span className="section-tag">
        {isHindi ? "घटना का दस्तावेजीकरण" : "INCIDENT DOCUMENTATION"}
      </span>

      <h2>
        {isHindi ? "घटना रिपोर्ट जनरेटर" : "Incident Report Generator"}
      </h2>

      <p>
        {isHindi
          ? "अपनी साइबर घटना की व्यक्तिगत रिपोर्ट तैयार करें।"
          : "Create a personal summary of your cyber incident."}
      </p>

      <button
        className="save-button"
        onClick={() => setShowReport(!showReport)}
      >
        {showReport
          ? isHindi ? "रिपोर्ट छिपाएं" : "Hide Report"
          : isHindi ? "घटना रिपोर्ट बनाएं" : "Generate Incident Report"}
      </button>

      {showReport && (
        <div className="report-content" id="incident-report">
          <h2>
            CyberRakshak -{" "}
            {isHindi ? "घटना रिपोर्ट" : "Incident Report"}
          </h2>

          <p>
            <strong>
              {isHindi ? "रिपोर्ट की तारीख:" : "Report Date:"}
            </strong>{" "}
            {new Date().toLocaleDateString(
              isHindi ? "hi-IN" : "en-IN"
            )}
          </p>

          <hr />

          <h3>
            {isHindi ? "घटना की जानकारी" : "Incident Information"}
          </h3>

          <p>
            <strong>
              {isHindi ? "घटना का प्रकार:" : "Incident Type:"}
            </strong>{" "}
            {incidentTitle}
          </p>

          <p>
            <strong>
              {isHindi ? "विवरण:" : "Description:"}
            </strong>{" "}
            {incidentDescription}
          </p>

          <h3>
            {isHindi ? "घटना से जुड़ी जानकारी" : "Incident Details"}
          </h3>

          {evidenceFields.map((field, index) => (
            <p key={field}>
              <strong>
                {isHindi ? hindiFields[index] || field : field}:
              </strong>{" "}
              {evidence[field] ||
                (isHindi ? "जानकारी नहीं दी गई" : "Not provided")}
            </p>
          ))}

          <h3>
            {isHindi ? "रिकवरी की प्रगति" : "Recovery Progress"}
          </h3>

          <p>
            <strong>
              {isHindi ? "पूरे किए गए कदम:" : "Completed steps:"}
            </strong>{" "}
            {completedTasks.length} / {recoveryTasks.length}
          </p>

          <ul>
            {recoveryTasks.map((task) => (
              <li key={task.id}>
                {completedTasks.some((item) => item.id === task.id)
                  ? "✓ "
                  : "○ "}
                {isHindi ? task.hi : task.en}
              </li>
            ))}
          </ul>

          <hr />

          <p>
            <strong>
              {isHindi ? "महत्वपूर्ण सूचना:" : "Important:"}
            </strong>{" "}
            {isHindi
              ? "यह रिपोर्ट उपयोगकर्ता द्वारा दी गई जानकारी से व्यक्तिगत रिकॉर्ड के लिए बनाई गई है। यह आधिकारिक सरकारी शिकायत, जांच का प्रमाण या पैसे वापस मिलने की गारंटी नहीं है।"
              : "This report is generated from user-provided information for personal record-keeping. It is not an official government complaint, proof of investigation or a guarantee of money recovery."}
          </p>

          <button
            className="save-button no-print"
            onClick={printReport}
          >
            {isHindi ? "प्रिंट / PDF में सेव करें" : "Print / Save as PDF"}
          </button>
        </div>
      )}
    </section>
  );
}

export default ReportGenerator;

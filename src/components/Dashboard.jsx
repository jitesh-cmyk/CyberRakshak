
import { useState } from "react";
import { incidents } from "../data/incidents";
import { useLanguage } from "../LanguageContext";

function getDashboardStats() {
  let savedIncidents = 0;
  let evidenceCollected = 0;
  let recoveryCompleted = 0;

  const incidentStats = incidents.map((incident) => {
    let evidence = {};
    let recovery = [];

    try {
      evidence =
        JSON.parse(
          localStorage.getItem(`cyberrakshak_${incident.id}`)
        ) || {};
    } catch {
      evidence = {};
    }

    try {
      recovery =
        JSON.parse(
          localStorage.getItem(`cyberrakshak_recovery_${incident.id}`)
        ) || [];
    } catch {
      recovery = [];
    }

    const details = evidence.details || {};
    const checkedItems = evidence.checkedItems || [];

    const hasRecord =
      Object.values(details).some((value) => String(value).trim()) ||
      checkedItems.length > 0 ||
      recovery.length > 0;

    if (hasRecord) savedIncidents++;

    evidenceCollected += checkedItems.length;

    const completed = recovery.length;
    recoveryCompleted += completed;

    return {
      id: incident.id,
      title: incident.title,
      titleHi: incident.titleHi,
      icon: incident.icon,
      evidenceCount: checkedItems.length,
      evidenceTotal: incident.evidenceFields.length,
      recoveryCount: completed,
      recoveryTotal: 5
    };
  });

  return {
    savedIncidents,
    evidenceCollected,
    recoveryCompleted,
    incidentStats
  };
}

function Dashboard() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [stats, setStats] = useState(getDashboardStats);

  function refreshDashboard() {
    setStats(getDashboardStats());
  }

  const cards = [
    {
      icon: "📁",
      label: isHindi ? "सेव किए गए केस" : "Saved Incident Records",
      value: stats.savedIncidents
    },
    {
      icon: "📋",
      label: isHindi ? "इकट्ठा किए गए सबूत" : "Evidence Collected",
      value: stats.evidenceCollected
    },
    {
      icon: "✅",
      label: isHindi ? "पूरे किए गए रिकवरी कदम" : "Recovery Tasks Completed",
      value: stats.recoveryCompleted
    }
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="section-tag">
            {isHindi ? "आपकी गतिविधि" : "YOUR ACTIVITY"}
          </span>

          <h2>
            {isHindi ? "साइबर सुरक्षा डैशबोर्ड" : "Cyber Safety Dashboard"}
          </h2>

          <p>
            {isHindi
              ? "अपने सेव किए गए केस और प्रगति का सारांश देखें।"
              : "View a summary of your saved incident records and progress."}
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={refreshDashboard}
        >
          ↻ {isHindi ? "रिफ्रेश करें" : "Refresh"}
        </button>
      </div>

      <div className="dashboard-cards">
        {cards.map((card) => (
          <div className="dashboard-card" key={card.label}>
            <span className="dashboard-icon">{card.icon}</span>
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="dashboard-details">
        <h3>
          {isHindi ? "इंसिडेंट के अनुसार प्रगति" : "Incident-wise Progress"}
        </h3>

        {stats.incidentStats.map((item) => {
          const evidenceProgress = item.evidenceTotal
            ? Math.round(
                (item.evidenceCount / item.evidenceTotal) * 100
              )
            : 0;

          const recoveryProgress = Math.round(
            (item.recoveryCount / item.recoveryTotal) * 100
          );

          return (
            <div className="dashboard-incident" key={item.id}>
              <div className="dashboard-incident-title">
                <strong>
                  {item.icon}{" "}
                  {isHindi ? item.titleHi : item.title}
                </strong>
              </div>

              <div className="dashboard-progress-label">
                <span>
                  {isHindi ? "सबूत" : "Evidence"}
                </span>
                <strong>
                  {item.evidenceCount}/{item.evidenceTotal}
                </strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${evidenceProgress}%` }}
                />
              </div>

              <div className="dashboard-progress-label">
                <span>
                  {isHindi ? "रिकवरी" : "Recovery"}
                </span>
                <strong>
                  {item.recoveryCount}/{item.recoveryTotal}
                </strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${recoveryProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="dashboard-note">
        {isHindi
          ? "नोट: आंकड़े इसी ब्राउज़र में सेव किए गए डेटा पर आधारित हैं। सेव करने के बाद Refresh दबाएं।"
          : "Note: Statistics are based on data saved in this browser. Press Refresh after saving your records."}
      </p>
    </section>
  );
}

export default Dashboard;

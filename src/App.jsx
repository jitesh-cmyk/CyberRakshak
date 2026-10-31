
import { useState } from "react";

import IncidentSelector from "./components/IncidentSelector";
import EvidenceManager from "./components/EvidenceManager";
import RecoveryProgress from "./components/RecoveryProgress";
import ReportGenerator from "./components/ReportGenerator";
import CyberQuiz from "./components/CyberQuiz";
import Dashboard from "./components/Dashboard";
import EmergencyActions from "./components/EmergencyActions";
import FraudPreventionTips from "./components/FraudPreventionTips";

import { useLanguage } from "./LanguageContext";
import "./App.css";

function App() {
const { language, toggleLanguage, t } = useLanguage();
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <main className="app">

      {/* Navbar */}
      <header className="navbar">
        <h2>🛡️ {t.brand}</h2>

        <div className="navbar-right">
          <span>{t.subtitle}</span>

          <button
            className="language-button"
            onClick={toggleLanguage}
          >
            {t.language}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <span className="hero-tag">{t.heroTag}</span>

        <h1>{t.heroTitle}</h1>

        <p>{t.heroDescription}</p>
      </section>
      <EmergencyActions />
      

<FraudPreventionTips />


      {/* Incident Selection */}
      <IncidentSelector onSelect={setSelectedIncident} />

      {/* Selected Incident Guide */}
      {selectedIncident && (
        <section className="guide">

          <button
            className="back-button"
            onClick={() => setSelectedIncident(null)}
          >
            ← Back to incidents
          </button>

          <h2>
  {selectedIncident.icon}{" "}
  {language === "hi"
    ? selectedIncident.titleHi
    : selectedIncident.title}
</h2>

<p>
  {language === "hi"
    ? selectedIncident.descriptionHi
    : selectedIncident.description}
</p>

          <h3>
  {language === "hi" ? "सुझाए गए कदम" : "Recommended Actions"}
</h3>

          <ol>
            {(language === "hi"
  ? selectedIncident.stepsHi
  : selectedIncident.steps
).map((step, index) => (
  <li key={index}>{step}</li>
))}
          </ol>

          <h3>
  {language === "hi"
    ? "इकट्ठा करने वाले सबूत"
    : "Evidence to collect"}
</h3>

<ul>
  {(language === "hi"
    ? selectedIncident.evidenceFieldsHi
    : selectedIncident.evidenceFields
  ).map((field) => (
    <li key={field}>{field}</li>
  ))}
</ul>

          <EvidenceManager
            key={selectedIncident.id}
            incident={selectedIncident}
          />

          <RecoveryProgress
            key={selectedIncident.id}
            incident={selectedIncident}
          />

          <ReportGenerator
            key={selectedIncident.id}
            incident={selectedIncident}
          />

        </section>
      )}
      <Dashboard />

      {/* Cyber Safety Quiz */}
      <CyberQuiz />

      {/* Footer */}
      <footer>
        CyberRakshak © 2026 | {t.footer}
      </footer>

    </main>
  );
}

export default App;

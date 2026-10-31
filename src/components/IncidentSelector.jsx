
import { incidents } from "../data/incidents";
import { useLanguage } from "../LanguageContext";

function IncidentSelector({ onSelect }) {
  const { language, t } = useLanguage();

  return (
    <section className="incident-section">
      <div className="section-heading">
        <span className="section-tag">CYBER EMERGENCY SUPPORT</span>

        <h2>{t.incidentHeading}</h2>

        <p>{t.incidentDescription}</p>
      </div>

      <div className="incident-grid">
        {incidents.map((incident) => (
          <button
            className="incident-card"
            key={incident.id}
            onClick={() => onSelect(incident)}
          >
            <span className="incident-icon">
              {incident.icon}
            </span>

            <h3>
              {language === "hi"
                ? incident.titleHi
                : incident.title}
            </h3>

            <p>
              {language === "hi"
                ? incident.descriptionHi
                : incident.description}
            </p>

            <span className="incident-link">
              {language === "hi"
                ? "मदद पाएं →"
                : "Get Help →"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default IncidentSelector;

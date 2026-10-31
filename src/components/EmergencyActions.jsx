
import { useLanguage } from "../LanguageContext";

function EmergencyActions() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section className="emergency-section">
      <div className="emergency-content">
        <span className="emergency-tag">
          {isHindi ? "तुरंत सहायता" : "NEED IMMEDIATE HELP?"}
        </span>

        <h2>
          {isHindi
            ? "साइबर धोखाधड़ी होने पर तुरंत कार्रवाई करें"
            : "Act Fast During a Cyber Fraud"}
        </h2>

        <p>
          {isHindi
            ? "अगर आपके साथ वित्तीय साइबर धोखाधड़ी हुई है, तो तुरंत 1930 पर कॉल करें।"
            : "If you face financial cyber fraud, call 1930 immediately."}
        </p>

        <div className="emergency-buttons">
          <a href="tel:1930" className="emergency-call">
            📞 {isHindi ? "1930 पर कॉल करें" : "Call 1930"}
          </a>

          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="emergency-report"
          >
            {isHindi
              ? "ऑनलाइन शिकायत दर्ज करें ↗"
              : "Report Online ↗"}
          </a>
        </div>

        <small>
          {isHindi
            ? "ध्यान दें: 1930 विशेष रूप से वित्तीय साइबर धोखाधड़ी के लिए है।"
            : "Note: 1930 is specifically for reporting financial cyber fraud."}
        </small>
      </div>
    </section>
  );
}

export default EmergencyActions;

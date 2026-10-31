
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const tipsData = {
  en: [
    {
      icon: "💳",
      title: "UPI & Payment Fraud",
      tips: [
        "Never share your UPI PIN or OTP with anyone.",
        "You do not need to enter a PIN to receive money.",
        "Verify the receiver's name before making payment.",
        "Avoid unknown collect requests and QR codes."
      ]
    },
    {
      icon: "📱",
      title: "Social Media Account Safety",
      tips: [
        "Use a strong and unique password.",
        "Enable Two-Factor Authentication (2FA).",
        "Never share login OTPs with anyone.",
        "Avoid suspicious messages and unknown links."
      ]
    },
    {
      icon: "💼",
      title: "Fake Job & Internship Scams",
      tips: [
        "Verify the company and its official website.",
        "Be careful of jobs promising guaranteed income.",
        "Do not pay suspicious registration or security fees.",
        "Never share banking passwords or OTPs."
      ]
    },
    {
      icon: "🛒",
      title: "Online Shopping Fraud",
      tips: [
        "Buy from trusted and verified websites.",
        "Check seller reviews and return policies.",
        "Avoid advance payments to unknown sellers.",
        "Keep payment receipts and order details."
      ]
    },
    {
      icon: "🔗",
      title: "Phishing & Fake Links",
      tips: [
        "Check website addresses before opening them.",
        "Do not click unknown SMS or email links.",
        "Never enter passwords on suspicious websites.",
        "Do not download unknown attachments."
      ]
    }
  ],

  hi: [
    {
      icon: "💳",
      title: "UPI और पेमेंट फ्रॉड",
      tips: [
        "अपना UPI PIN या OTP किसी को न बताएं।",
        "पैसे प्राप्त करने के लिए UPI PIN डालने की जरूरत नहीं होती।",
        "पेमेंट करने से पहले प्राप्तकर्ता का नाम जांचें।",
        "अनजान Collect Request और QR Code से सावधान रहें।"
      ]
    },
    {
      icon: "📱",
      title: "सोशल मीडिया अकाउंट सुरक्षा",
      tips: [
        "मजबूत और अलग-अलग पासवर्ड इस्तेमाल करें।",
        "Two-Factor Authentication (2FA) चालू रखें।",
        "लॉगिन OTP किसी के साथ शेयर न करें।",
        "अनजान मैसेज और लिंक से बचें।"
      ]
    },
    {
      icon: "💼",
      title: "फर्जी जॉब और इंटर्नशिप स्कैम",
      tips: [
        "कंपनी और उसकी आधिकारिक वेबसाइट जांचें।",
        "गारंटीड कमाई का वादा करने वाली नौकरी से सावधान रहें।",
        "संदिग्ध रजिस्ट्रेशन या सिक्योरिटी फीस न दें।",
        "बैंकिंग पासवर्ड और OTP शेयर न करें।"
      ]
    },
    {
      icon: "🛒",
      title: "ऑनलाइन शॉपिंग फ्रॉड",
      tips: [
        "विश्वसनीय वेबसाइट से ही खरीदारी करें।",
        "Seller Reviews और Return Policy जांचें।",
        "अनजान विक्रेता को एडवांस पेमेंट न करें।",
        "पेमेंट रसीद और ऑर्डर की जानकारी सुरक्षित रखें।"
      ]
    },
    {
      icon: "🔗",
      title: "फिशिंग और फर्जी लिंक",
      tips: [
        "वेबसाइट खोलने से पहले उसका पता जांचें।",
        "अनजान SMS और ईमेल लिंक पर क्लिक न करें।",
        "संदिग्ध वेबसाइट पर पासवर्ड न डालें।",
        "अनजान अटैचमेंट डाउनलोड न करें।"
      ]
    }
  ]
};

function FraudPreventionTips() {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(null);

  const isHindi = language === "hi";
  const tips = tipsData[isHindi ? "hi" : "en"];

  return (
    <section className="prevention-section">
      <div className="section-heading">
        <span className="section-tag">
          {isHindi ? "सुरक्षित रहें" : "STAY PROTECTED"}
        </span>

        <h2>
          {isHindi
            ? "साइबर फ्रॉड से बचाव के तरीके"
            : "Fraud Prevention Center"}
        </h2>

        <p>
          {isHindi
            ? "इन आसान सुरक्षा सुझावों को अपनाकर ऑनलाइन सुरक्षित रहें।"
            : "Learn simple safety practices to protect yourself online."}
        </p>
      </div>

      <div className="prevention-grid">
        {tips.map((item, index) => (
          <div className="prevention-card" key={index}>
            <div className="prevention-title">
              <span className="prevention-icon">
                {item.icon}
              </span>

              <h3>{item.title}</h3>
            </div>

            <button
              className="tips-toggle"
              onClick={() =>
                setExpanded(expanded === index ? null : index)
              }
              aria-expanded={expanded === index}
            >
              {expanded === index
                ? isHindi ? "कम देखें ↑" : "Show Less ↑"
                : isHindi ? "सुरक्षा टिप्स देखें ↓" : "View Safety Tips ↓"}
            </button>

            {expanded === index && (
              <ul className="prevention-list">
                {item.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FraudPreventionTips;

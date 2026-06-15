import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "bn" | "ta" | "te";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "SurakshaAI",
    "app.tagline": "Real-time AI-powered protection that listens, detects, and warns before the damage is done.",
    "nav.home": "Home",
    "nav.detection": "Detection",
    "nav.report": "Report",
    "hero.title": "Protect Yourself from Scam Calls",
    "hero.subtitle": "Real-time AI-powered scam detection that warns you instantly",
    "hero.cta": "Start Protection",
    "call.start": "Start Call",
    "call.end": "End Call",
    "call.accept": "Accept Call",
    "call.reject": "Reject Call",
    "call.transcript": "Live Transcript",
    "risk.low": "Low Risk",
    "risk.medium": "Medium Risk",
    "risk.high": "High Risk",
    "alert.warning": "Potential Scam Detected. Do not share OTP, bank details, or UPI PIN.",
    "alert.caution": "Suspicious Activity Detected. Be cautious with personal information.",
    "alert.safe": "Call appears safe.",
    "report.title": "Threat Report",
    "report.category": "Scam Category",
    "report.indicators": "Detected Indicators",
    "report.recommendations": "Recommended Actions",
    "report.block": "Block the number immediately and report fraud to your bank and local authorities.",
    "language.select": "Select Language",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.bengali": "বাংলা",
    "language.tamil": "தமிழ்",
    "language.telugu": "తెలుగు",
  },
  hi: {
    "app.title": "सुरक्षा AI",
    "app.tagline": "रीयल-टाइम AI-संचालित सुरक्षा जो सुनती है, पहचानती है, और नुकसान से पहले चेतावनी देती है।",
    "nav.home": "होम",
    "nav.detection": "पहचान",
    "nav.report": "रिपोर्ट",
    "hero.title": "स्कैम कॉल से अपनी रक्षा करें",
    "hero.subtitle": "रीयल-टाइम AI-संचालित स्कैम पहचान जो तुरंत चेतावनी देती है",
    "hero.cta": "सुरक्षा शुरू करें",
    "call.start": "कॉल शुरू करें",
    "call.end": "कॉल समाप्त करें",
    "call.accept": "कॉल स्वीकार करें",
    "call.reject": "कॉल अस्वीकार करें",
    "call.transcript": "लाइव ट्रांसक्रिप्ट",
    "risk.low": "कम जोखिम",
    "risk.medium": "मध्यम जोखिम",
    "risk.high": "उच्च जोखिम",
    "alert.warning": "संभावित घोटाला पाया गया। OTP, बैंक विवरण या UPI PIN साझा न करें।",
    "alert.caution": "संदिग्ध गतिविधि पाई गई। व्यक्तिगत जानकारी साझा करते समय सावधान रहें।",
    "alert.safe": "कॉल सुरक्षित प्रतीत होती है।",
    "report.title": "खतरे की रिपोर्ट",
    "report.category": "घोटाले की श्रेणी",
    "report.indicators": "पहचानी गई संकेतक",
    "report.recommendations": "अनुशंसित कार्य",
    "report.block": "नंबर को तुरंत ब्लॉक करें और अपने बैंक को धोखाधड़ी की रिपोर्ट करें।",
    "language.select": "भाषा चुनें",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.bengali": "বাংলা",
    "language.tamil": "தமிழ்",
    "language.telugu": "తెలుగు",
  },
  bn: {
    "app.title": "সুরক্ষা AI",
    "app.tagline": "রিয়েল-টাইম AI-চালিত সুরক্ষা যা শোনে, সনাক্ত করে এবং ক্ষতির আগে সতর্ক করে।",
    "nav.home": "হোম",
    "nav.detection": "সনাক্তকরণ",
    "nav.report": "রিপোর্ট",
    "hero.title": "স্কাম কল থেকে নিজেকে রক্ষা করুন",
    "hero.subtitle": "রিয়েল-টাইম AI-চালিত স্কাম সনাক্তকরণ যা তাৎক্ষণিকভাবে সতর্ক করে",
    "hero.cta": "সুরক্ষা শুরু করুন",
    "call.start": "কল শুরু করুন",
    "call.end": "কল শেষ করুন",
    "call.accept": "কল গ্রহণ করুন",
    "call.reject": "কল প্রত্যাখ্যান করুন",
    "call.transcript": "লাইভ ট্রান্সক্রিপ্ট",
    "risk.low": "কম ঝুঁকি",
    "risk.medium": "মাঝারি ঝুঁকি",
    "risk.high": "উচ্চ ঝুঁকি",
    "alert.warning": "সম্ভাব্য জালিয়াতি সনাক্ত করা হয়েছে। OTP, ব্যাংক বিবরণ বা UPI PIN শেয়ার করবেন না।",
    "alert.caution": "সন্দেহজনক কার্যকলাপ সনাক্ত করা হয়েছে। ব্যক্তিগত তথ্য শেয়ার করার সময় সতর্ক থাকুন।",
    "alert.safe": "কল নিরাপদ মনে হচ্ছে।",
    "report.title": "হুমকি রিপোর্ট",
    "report.category": "জালিয়াতির বিভাগ",
    "report.indicators": "সনাক্ত করা সূচক",
    "report.recommendations": "সুপারিশকৃত পদক্ষেপ",
    "report.block": "সংখ্যাটি অবিলম্বে ব্লক করুন এবং আপনার ব্যাংককে জালিয়াতির রিপোর্ট করুন।",
    "language.select": "ভাষা নির্বাচন করুন",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.bengali": "বাংলা",
    "language.tamil": "தமிழ்",
    "language.telugu": "తెలుగు",
  },
  ta: {
    "app.title": "சுரக்ஷா AI",
    "app.tagline": "நிகழ் நேர AI-இயக்கிய பாதுகாப்பு கேட்கிறது, கண்டறிகிறது, சேதத்திற்கு முன் எச்சரிக்கிறது.",
    "nav.home": "முகப்பு",
    "nav.detection": "கண்டறிதல்",
    "nav.report": "அறிக்கை",
    "hero.title": "மோசம் அழைப்புகளிலிருந்து உங்களைக் காத்துக் கொள்ளுங்கள்",
    "hero.subtitle": "நிகழ் நேர AI-இயக்கிய மோசம் கண்டறிதல் உடனடி எச்சரிக்கை",
    "hero.cta": "பாதுகாப்பு தொடங்கவும்",
    "call.start": "அழைப்பு தொடங்கவும்",
    "call.end": "அழைப்பு முடிக்கவும்",
    "call.accept": "அழைப்பை ஏற்றுக் கொள்ளுங்கள்",
    "call.reject": "அழைப்பை நிராகரிக்கவும்",
    "call.transcript": "நேரடி நிரல்",
    "risk.low": "குறைந்த ঝுக்கம்",
    "risk.medium": "நடுத்தர ঝுக்கம்",
    "risk.high": "உচ்ச ஝ுக்கம்",
    "alert.warning": "சாத்தியமான மோசம் கண்டறியப்பட்டது. OTP, வங்கி விவரங்கள் அல்லது UPI PIN ஐ பகிர வேண்டாம்.",
    "alert.caution": "சந்தேகத்திற்குரிய செயல்பாடு கண்டறியப்பட்டது. ব்যক்তிगত தகவல் பகிரும் போது எச்சரிக்கையாக இருங்கள்.",
    "alert.safe": "அழைப்பு பாதுகாப்பாக தோன்றுகிறது.",
    "report.title": "அச்சுறுத்தல் அறிக்கை",
    "report.category": "மோசம் வகை",
    "report.indicators": "கண்டறியப்பட்ட குறிகாட்டிகள்",
    "report.recommendations": "பரிந்துரைக்கப்பட்ட நடவடிக்கைகள்",
    "report.block": "உடனடியாக எண்ணை தடுக்கவும் மற்றும் உங்கள் வங்கிக்கு மோசம் புகாரளிக்கவும்.",
    "language.select": "மொழி தேர்ந்தெடுக்கவும்",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.bengali": "বাংলা",
    "language.tamil": "தமிழ்",
    "language.telugu": "తెలుగు",
  },
  te: {
    "app.title": "సురక్ష AI",
    "app.tagline": "నిజ సమయ AI-శక్తితో కూడిన సুরక్ష విని, గుర్తిస్తుంది, నష్టానికి ముందు హెచ్చరిస్తుంది.",
    "nav.home": "హోమ్",
    "nav.detection": "గుర్తింపు",
    "nav.report": "నివేదన",
    "hero.title": "చేతిమార కాల్‌ల నుండి మిమ్మల్ని రక్షించుకోండి",
    "hero.subtitle": "నిజ సమయ AI-శక్తితో కూడిన చేతిమార గుర్తింపు తక్షణ హెచ్చరిక",
    "hero.cta": "సురక్ష ప్రారంభించండి",
    "call.start": "కాల్ ప్రారంభించండి",
    "call.end": "కాల్ ముగించండి",
    "call.accept": "కాల్‌ను అంగీకరించండి",
    "call.reject": "కాల్‌ను తిరస్కరించండి",
    "call.transcript": "లైవ్ ట్రాన్‌స్క్రిప్ట్",
    "risk.low": "తక్కువ ఝుక్కం",
    "risk.medium": "మధ్యస్థ ఝుక్కం",
    "risk.high": "ఎక్కువ ఝుక్కం",
    "alert.warning": "సంభావ్య చేతిమార గుర్తించబడింది. OTP, బ్యాంక్ వివరాలు లేదా UPI PIN ను భాగస్వామ్యం చేయవద్దు.",
    "alert.caution": "సందేహాస్పద కార్యకలాపం గుర్తించబడింది. వ్యక్తిగత సమాచారం భాగస్వామ్యం చేస్తున్నప్పుడు జాగ్రత్తగా ఉండండి.",
    "alert.safe": "కాల్ సురక్షితంగా కనిపిస్తుంది.",
    "report.title": "బెదరమ్ నివేదన",
    "report.category": "చేతిమార రకం",
    "report.indicators": "గుర్తించిన సూచికలు",
    "report.recommendations": "సిఫార్సు చేసిన చర్యలు",
    "report.block": "సంఖ్యను వెంటనే బ్లాక్ చేసి మీ బ్యాంకుకు చేతిమారిపై నివేదన చేయండి.",
    "language.select": "భాష ఎంచుకోండి",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.bengali": "বাংলা",
    "language.tamil": "தமிழ்",
    "language.telugu": "తెలుగు",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

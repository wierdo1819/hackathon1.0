import React from "react";
import { Link } from "wouter";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: "en", label: t("language.english") },
    { value: "hi", label: t("language.hindi") },
    { value: "bn", label: t("language.bengali") },
    { value: "ta", label: t("language.tamil") },
    { value: "te", label: t("language.telugu") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg hidden sm:inline">
              {t("app.title")}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/detection" className="text-slate-300 hover:text-white transition-colors">
              {t("nav.detection")}
            </Link>
            <Link href="/report" className="text-slate-300 hover:text-white transition-colors">
              {t("nav.report")}
            </Link>
          </div>

          {/* Language Selector */}
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

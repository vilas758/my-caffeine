import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Globe,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Shield,
  TreePine,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_TABS = [
  { id: "home", label: "मुखपृष्ठ", sub: "Home", icon: Home },
  { id: "forms", label: "फॉर्म्स", sub: "Forms", icon: FileText },
  { id: "notices", label: "सूचना", sub: "Notices", icon: Bell },
  { id: "village", label: "गावाची माहिती", sub: "Village Info", icon: Info },
  { id: "contact", label: "संपर्क", sub: "Contact", icon: Phone },
];

const SERVICES = [
  {
    id: 1,
    icon: Award,
    label: "प्रमाणपत्र",
    sub: "Certificates",
    color: "bg-blue-50 text-blue-700",
    href: "#forms",
  },
  {
    id: 2,
    icon: Zap,
    label: "कर भरणा",
    sub: "Tax Payment",
    color: "bg-green-50 text-green-700",
    href: "#contact",
  },
  {
    id: 3,
    icon: Users,
    label: "सरपंचाशी बोला",
    sub: "Talk to Sarpanch",
    color: "bg-orange-50 text-orange-700",
    href: "#contact",
  },
  {
    id: 4,
    icon: Bell,
    label: "ग्रामसभा सूचना",
    sub: "Gram Sabha Notices",
    color: "bg-purple-50 text-purple-700",
    href: "#notices",
  },
  {
    id: 5,
    icon: Globe,
    label: "शासकीय योजना",
    sub: "Govt. Schemes",
    color: "bg-teal-50 text-teal-700",
    href: "#notices",
  },
  {
    id: 6,
    icon: Shield,
    label: "तक्रार",
    sub: "Grievance Redressal",
    color: "bg-red-50 text-red-700",
    href: "#contact",
  },
];

const NOTICES = [
  {
    id: 1,
    date: "०१ एप्रिल २०२६",
    dateEn: "01 Apr 2026",
    title: "ग्रामसभा बैठकीची सूचना — आर्थिक वर्ष २०२६-२७",
    desc: "सर्व ग्रामस्थांना सूचित करण्यात येते की दि. १५ एप्रिल रोजी सकाळी ११ वाजता ग्रामपंचायत कार्यालयात ग्रामसभा बैठक होणार आहे.",
    source: "ग्रामपंचायत / Grampanchayat",
    category: "ग्रामसभा",
  },
  {
    id: 2,
    date: "२५ मार्च २०२६",
    dateEn: "25 Mar 2026",
    title: "पाणी पुरवठा योजना — नवीन जोडणीसाठी अर्ज मागवणे",
    desc: "गावातील नागरिकांनी नळ जोडणीसाठी ग्रामपंचायत कार्यालयात येऊन अर्ज करावेत. शेवटची तारीख: ३० एप्रिल २०२६.",
    source: "जलसंपदा विभाग / Water Department",
    category: "पाणी",
  },
  {
    id: 3,
    date: "१८ मार्च २०२६",
    dateEn: "18 Mar 2026",
    title: "प्रधानमंत्री आवास योजना — पात्र लाभार्थी यादी जाहीर",
    desc: "पीएमएवाय अंतर्गत पात्र लाभार्थ्यांची यादी ग्रामपंचायत सूचनाफलकावर लावण्यात आली आहे. आक्षेप असल्यास ७ दिवसांत कळवावे.",
    source: "शासकीय योजना / Govt. Scheme",
    category: "योजना",
  },
  {
    id: 4,
    date: "१० मार्च २०२६",
    dateEn: "10 Mar 2026",
    title: "रस्ता दुरुस्ती कामाची सूचना — वार्ड क्र. ३ व ५",
    desc: "वार्ड क्र. ३ आणि ५ मधील रस्त्याच्या दुरुस्तीचे काम दि. २० मार्च पासून सुरू होणार आहे. नागरिकांनी सहकार्य करावे.",
    source: "सार्वजनिक बांधकाम / PWD",
    category: "बांधकाम",
  },
];

const FORMS = [
  {
    id: 1,
    name: "जन्म दाखला",
    nameEn: "Birth Certificate",
    category: "प्रमाणपत्र",
    categoryEn: "Certificate",
    desc: "मुलाच्या / मुलीच्या जन्माचा अधिकृत दाखला मिळवण्यासाठी हा अर्ज भरा.",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    name: "मृत्यू दाखला",
    nameEn: "Death Certificate",
    category: "प्रमाणपत्र",
    categoryEn: "Certificate",
    desc: "मृत्यूची नोंदणी व अधिकृत दाखला मिळवण्यासाठी हा अर्ज भरा.",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "उत्पन्न दाखला",
    nameEn: "Income Certificate",
    category: "प्रमाणपत्र",
    categoryEn: "Certificate",
    desc: "वार्षिक उत्पन्नाचा अधिकृत दाखला मिळवण्यासाठी हा अर्ज भरा.",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    name: "रहिवास दाखला",
    nameEn: "Residence Certificate",
    category: "प्रमाणपत्र",
    categoryEn: "Certificate",
    desc: "स्थायी निवासाचा अधिकृत दाखला मिळवण्यासाठी हा अर्ज भरा.",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 5,
    name: "पाणी जोडणी अर्ज",
    nameEn: "Pipeline Connection",
    category: "सुविधा",
    categoryEn: "Utility",
    desc: "घरगुती नळ जोडणीसाठी हा अर्ज भरून ग्रामपंचायतीत जमा करा.",
    color: "bg-teal-100 text-teal-800",
  },
  {
    id: 6,
    name: "रस्ता दुरुस्ती अर्ज",
    nameEn: "Road Repair Request",
    category: "सुविधा",
    categoryEn: "Utility",
    desc: "रस्त्याच्या दुरुस्तीसाठी तक्रार / विनंती अर्ज भरण्यासाठी हे फॉर्म वापरा.",
    color: "bg-teal-100 text-teal-800",
  },
  {
    id: 7,
    name: "बांधकाम परवाना",
    nameEn: "Building Permission",
    category: "परवाना",
    categoryEn: "License",
    desc: "नवीन बांधकाम किंवा विस्तारासाठी परवाना मिळवण्यासाठी हा अर्ज भरा.",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: 8,
    name: "रेशन कार्ड अर्ज",
    nameEn: "Ration Card Application",
    category: "सुविधा",
    categoryEn: "Utility",
    desc: "नवीन रेशन कार्डसाठी किंवा दुरुस्तीसाठी हा अर्ज भरा.",
    color: "bg-green-100 text-green-800",
  },
];

const VILLAGE_STATS = [
  {
    icon: Users,
    label: "लोकसंख्या",
    sub: "Population",
    value: "५,७४२",
    note: "2021 Census",
  },
  {
    icon: MapPin,
    label: "क्षेत्रफळ",
    sub: "Area",
    value: "१२.९३ km²",
    note: "Total area",
  },
  {
    icon: Building2,
    label: "वार्ड",
    sub: "Wards",
    value: "९",
    note: "Administrative",
  },
  {
    icon: TreePine,
    label: "खेडे",
    sub: "Villages",
    value: "३",
    note: "Under GP",
  },
  {
    icon: Award,
    label: "सरपंच",
    sub: "Sarpanch",
    value: "ग्रामप्रमुख",
    note: "Elected 2021",
  },
  {
    icon: ClipboardList,
    label: "योजना",
    sub: "Active Schemes",
    value: "१२",
    note: "Running",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function UtilityBar({
  lang,
  setLang,
}: { lang: string; setLang: (l: string) => void }) {
  return (
    <div className="bg-white border-b border-border py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-xs text-muted-foreground hidden sm:block">
          🇮🇳 महाराष्ट्र शासन — ग्रामविकास विभाग
        </p>
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={() => setLang(lang === "mr" ? "en" : "mr")}
            className="text-xs font-medium text-teal hover:text-teal-dark transition-colors border border-teal/30 rounded px-2.5 py-0.5"
            data-ocid="utility.toggle"
          >
            {lang === "mr" ? "मराठी | EN" : "EN | मराठी"}
          </button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-teal text-teal hover:bg-teal hover:text-white font-medium px-3"
            data-ocid="utility.primary_button"
          >
            🔐 Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="bg-white border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Emblems */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-12 h-12 rounded-full bg-teal/10 border-2 border-teal/20 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/generated/govt-emblem-transparent.dim_80x80.png"
              alt="Govt Emblem"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-orange/10 border-2 border-orange/20 flex items-center justify-center">
            <span className="text-orange font-bold text-sm">GP</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-teal-dark font-bold text-lg sm:text-xl leading-tight">
            आपली ग्रामपंचायत
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wider uppercase">
            VILLAGE ONLINE PORTAL
          </p>
          <p className="text-xs text-teal/70 hidden sm:block">महाराष्ट्र, भारत</p>
        </div>

        {/* Helpline */}
        <div className="hidden md:flex flex-col items-end shrink-0">
          <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Emergency Helpline
          </span>
          <a
            href="tel:1800-XXX-XXXX"
            className="text-orange font-bold text-lg tracking-wide hover:text-orange-hover transition-colors"
          >
            1800-XXX-XXXX
          </a>
          <span className="text-xs text-muted-foreground">
            Toll Free · 24×7
          </span>
        </div>
      </div>
    </header>
  );
}

function NavBar({
  active,
  setActive,
}: { active: string; setActive: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-teal sticky top-0 z-40 shadow-teal">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleNav(tab.id)}
              className={`flex flex-col items-center px-5 py-3 transition-colors text-sm font-medium border-b-2 ${
                active === tab.id
                  ? "bg-orange text-white border-orange"
                  : "text-white/90 hover:bg-white/10 border-transparent"
              }`}
              data-ocid="nav.tab"
            >
              <span className="font-semibold text-sm">{tab.label}</span>
              <span className="text-[10px] opacity-80 font-normal">
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-white font-semibold text-sm">
            {NAV_TABS.find((t) => t.id === active)?.label || "मुखपृष्ठ"}
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-white p-1"
            data-ocid="nav.toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-teal-dark"
          >
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-3 w-full px-5 py-3 text-sm transition-colors ${
                  active === tab.id
                    ? "bg-orange text-white"
                    : "text-white/90 hover:bg-white/10"
                }`}
                data-ocid="nav.tab"
              >
                <tab.icon size={16} />
                <span className="font-medium">{tab.label}</span>
                <span className="text-xs opacity-70">/ {tab.sub}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section
      id="home"
      className="relative min-h-[520px] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-grampanchayat.dim_1400x600.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay — left dark, right lighter */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/92 via-teal/75 to-teal/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-orange font-medium text-sm tracking-widest uppercase mb-4">
            स्वागत आहे · Welcome
          </p>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            आपल्या गावाची
          </h2>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            सेवा आता
          </h2>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            ऑनलाईन उपलब्ध!
          </h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            प्रमाणपत्र, अर्ज, सूचना आणि अधिक — सर्व काही एकाच ठिकाणी.
            <br />
            <span className="text-sm text-white/60">
              Certificates, Forms, Notices &amp; more — all in one place.
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNav("forms")}
              className="bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded transition-colors text-sm"
              data-ocid="hero.primary_button"
            >
              📋 फॉर्म्स पाहा
            </button>
            <button
              type="button"
              onClick={() => onNav("village")}
              className="border border-white/60 text-white hover:bg-white/10 font-medium px-6 py-3 rounded transition-colors text-sm"
              data-ocid="hero.secondary_button"
            >
              अधिक माहिती →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickServices({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section className="bg-light-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-teal-dark font-bold text-2xl mb-1">त्वरित सेवा</h3>
          <p className="text-muted-foreground text-sm">Quick Services</p>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-orange" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.button
              key={svc.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onNav(svc.href.replace("#", ""))}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border hover:border-teal/40 hover:shadow-card transition-all group cursor-pointer"
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${svc.color} group-hover:scale-110 transition-transform`}
              >
                <svc.icon size={22} />
              </div>
              <p className="font-semibold text-xs text-center text-foreground leading-tight">
                {svc.label}
              </p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">
                {svc.sub}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoticesSection() {
  return (
    <section id="notices" className="bg-notice-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-teal-dark font-bold text-2xl mb-1">
              महत्वाची सूचना आणि बातम्या
            </h3>
            <p className="text-muted-foreground text-sm">
              Important Notices &amp; News
            </p>
          </div>
          <Bell className="text-orange" size={28} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NOTICES.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg border border-border shadow-xs hover:shadow-card transition-shadow p-4 flex flex-col"
              data-ocid={`notices.item.${i + 1}`}
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="shrink-0 bg-teal text-white text-xs font-bold px-2 py-0.5 rounded">
                  {notice.dateEn}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-2 leading-snug flex-1">
                {notice.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                {notice.desc}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] bg-light-bg text-teal px-2 py-0.5 rounded font-medium">
                  {notice.category}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {notice.source.split("/")[1]?.trim()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FORM_CATEGORIES = ["सर्व / All", "प्रमाणपत्र", "सुविधा", "परवाना"];

function FormsSection() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("सर्व / All");

  const filtered = FORMS.filter((f) => {
    const matchCat = cat === "सर्व / All" || f.category === cat;
    const matchSearch =
      search === "" ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.nameEn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (form: (typeof FORMS)[0]) => {
    toast.success(`${form.name} (${form.nameEn}) डाउनलोड होत आहे...`);
  };

  return (
    <section id="forms" className="bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-teal-dark font-bold text-2xl mb-1">फॉर्म्स केंद्र</h3>
          <p className="text-muted-foreground text-sm">
            Forms Center — Download Official Forms
          </p>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-orange" />
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="फॉर्म शोधा / Search forms..."
              className="pl-9 text-sm"
              data-ocid="forms.search_input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FORM_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                  cat === c
                    ? "bg-teal text-white border-teal"
                    : "bg-white text-teal border-teal/30 hover:bg-teal/5"
                }`}
                data-ocid="forms.tab"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="forms.empty_state"
          >
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>कोणताही फॉर्म सापडला नाही / No forms found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((form, i) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="bg-white border border-border rounded-lg p-4 hover:border-teal/40 hover:shadow-card transition-all flex flex-col"
                data-ocid={`forms.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={20} className="text-teal" />
                  </div>
                  <Badge
                    className={`text-[10px] font-semibold shrink-0 ${form.color}`}
                  >
                    {form.categoryEn}
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-foreground mb-0.5">
                  {form.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 font-medium">
                  {form.nameEn}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                  {form.desc}
                </p>
                <button
                  type="button"
                  onClick={() => handleDownload(form)}
                  className="flex items-center justify-center gap-2 w-full bg-teal hover:bg-teal-dark text-white text-xs font-semibold py-2 px-3 rounded transition-colors"
                  data-ocid={`forms.primary_button.${i + 1}`}
                >
                  <Download size={13} />
                  डाउनलोड / Download
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function VillageInfoSection() {
  return (
    <section id="village" className="bg-light-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-teal-dark font-bold text-2xl mb-1">
            गावाची माहिती
          </h3>
          <p className="text-muted-foreground text-sm">Village Information</p>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-orange" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {VILLAGE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="bg-white rounded-lg border border-border p-4 flex flex-col items-center text-center hover:shadow-card transition-shadow"
              data-ocid={`village.item.${i + 1}`}
            >
              <div className="w-11 h-11 bg-teal/10 rounded-full flex items-center justify-center mb-3">
                <stat.icon size={20} className="text-teal" />
              </div>
              <p className="font-bold text-lg text-teal-dark leading-tight">
                {stat.value}
              </p>
              <p className="font-semibold text-xs text-foreground mt-0.5">
                {stat.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
              <p className="text-[10px] text-orange mt-1 font-medium">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ward Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white border border-border rounded-lg p-6 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-full md:w-48 h-40 bg-teal/5 border-2 border-dashed border-teal/30 rounded-lg flex flex-col items-center justify-center text-teal shrink-0">
            <MapPin size={32} className="mb-2 opacity-50" />
            <span className="text-xs text-muted-foreground">वार्ड नकाशा</span>
            <span className="text-[10px] text-muted-foreground">Ward Map</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-teal-dark text-lg mb-2">
              ग्रामपंचायत — आपल्या गावाबद्दल
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              आपल्या ग्रामपंचायतीच्या हद्दीत ३ महसूल गावे येतात. एकूण ९ वार्डांमध्ये
              विभागलेल्या या गावाची एकूण लोकसंख्या ५,७४२ आहे. येथे ३ प्राथमिक शाळा, १
              प्राथमिक आरोग्य केंद्र आणि प्रमुख रस्ते सुविधा उपलब्ध आहेत.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "🏫 ३ शाळा",
                "🏥 १ PHC",
                "💧 जलशुद्धीकरण",
                "⚡ वीज पुरवठा",
                "🛣️ रस्ते",
              ].map((item) => (
                <span
                  key={item}
                  className="text-xs bg-teal/10 text-teal px-2.5 py-1 rounded-full font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("तुमचा अर्ज मिळाला! आम्ही लवकरच संपर्क करू.");
    setForm({ name: "", mobile: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-teal-dark font-bold text-2xl mb-1">संपर्क करा</h3>
          <p className="text-muted-foreground text-sm">Contact Us</p>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h4 className="font-bold text-teal-dark mb-5 text-lg">
              संदेश पाठवा / Send Message
            </h4>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    पूर्ण नाव *
                  </Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="आपले नाव"
                    className="text-sm"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    मोबाईल *
                  </Label>
                  <Input
                    required
                    type="tel"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mobile: e.target.value }))
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="text-sm"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  विषय / Subject *
                </Label>
                <Input
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  placeholder="तक्रार / विनंतीचा विषय"
                  className="text-sm"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  संदेश / Message *
                </Label>
                <Textarea
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="तुमचा संदेश लिहा..."
                  className="text-sm min-h-[100px]"
                  data-ocid="contact.textarea"
                />
              </div>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle2 size={16} /> तुमचा अर्ज मिळाला!
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="submit"
                className="w-full bg-orange hover:bg-orange-hover text-white font-semibold py-2.5 px-4 rounded transition-colors text-sm"
                data-ocid="contact.submit_button"
              >
                पाठवा / Submit
              </button>
            </form>
          </div>

          {/* Address + Info */}
          <div className="space-y-4">
            <div className="bg-white border border-border rounded-lg p-5">
              <h4 className="font-bold text-teal-dark mb-4">
                📍 कार्यालयाचा पत्ता
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-orange mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      ग्रामपंचायत कार्यालय
                    </p>
                    <p className="text-xs text-muted-foreground">
                      आपल्या गावाचे मुख्य कार्यालय, महाराष्ट्र, भारत
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-orange shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      1800-XXX-XXXX
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Toll Free · सोम-शनि, सकाळी ९ - संध्या ६
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-orange shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      grampanchayat@gov.in
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Email us anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal text-white rounded-lg p-5">
              <h4 className="font-bold mb-3">⏰ कार्यालयीन वेळ</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">सोमवार – शुक्रवार</span>
                  <span className="font-semibold">सकाळी ९:०० – संध्या ५:३०</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">शनिवार</span>
                  <span className="font-semibold">सकाळी ९:०० – दुपारी १:००</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">रविवार</span>
                  <span className="font-semibold text-orange">
                    सुट्टी / Closed
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-orange/10 border border-orange/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-orange" />
                <h5 className="font-bold text-orange text-sm">
                  आपत्कालीन संपर्क / Emergency
                </h5>
              </div>
              <p className="text-2xl font-bold text-orange">1800-XXX-XXXX</p>
              <p className="text-xs text-muted-foreground mt-1">
                २४×७ उपलब्ध · Toll Free
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-teal text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h5 className="font-bold text-lg mb-2">🏛️ आपली ग्रामपंचायत</h5>
            <p className="text-white/70 text-xs leading-relaxed mb-3">
              Village Online Portal — महाराष्ट्र सरकारच्या ग्रामविकास विभागाच्या
              अंतर्गत कार्यरत.
            </p>
            <address className="not-italic text-xs text-white/60 leading-relaxed">
              ग्रामपंचायत कार्यालय
              <br />
              महाराष्ट्र, भारत
              <br />
              PIN: XXX XXX
            </address>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-3 text-white/80">
              संपर्क / Contact
            </h5>
            <div className="space-y-2 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <Phone size={12} /> 1800-XXX-XXXX
              </p>
              <p className="flex items-center gap-2">
                <Mail size={12} /> grampanchayat@gov.in
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={12} /> WhatsApp सेवा उपलब्ध
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-3 text-white/80">
              उपयुक्त दुवे / Links
            </h5>
            <ul className="space-y-2 text-xs text-white/70">
              {[
                { label: "महाराष्ट्र शासन", href: "#" },
                { label: "ग्रामविकास विभाग", href: "#" },
                { label: "RTI माहिती", href: "#" },
                { label: "शासकीय योजना", href: "#notices" },
                { label: "फॉर्म्स डाउनलोड", href: "#forms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-orange transition-colors flex items-center gap-1"
                    data-ocid="footer.link"
                  >
                    <ChevronRight size={10} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-3 text-white/80">
              सोशल मीडिया
            </h5>
            <div className="flex gap-2 mb-3">
              {["FB", "TW", "YT", "WA"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange transition-colors flex items-center justify-center text-[10px] font-bold"
                  data-ocid="footer.link"
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              सरकारी माहितीसाठी फक्त अधिकृत पेजेस फॉलो करा.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {year} आपली ग्रामपंचायत, महाराष्ट्र. सर्व हक्क राखीव आहेत.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange/80 hover:text-orange transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingHelp() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange hover:bg-orange-hover text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="मदत / Help"
        data-ocid="help.open_modal_button"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed bottom-24 right-6 z-50 bg-white border border-border rounded-lg shadow-teal p-4 w-64"
            data-ocid="help.popover"
          >
            <h5 className="font-bold text-teal-dark mb-2 text-sm">
              🙏 मदत हवी आहे?
            </h5>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              कोणत्याही प्रश्नासाठी आम्हाला फोन करा किंवा संपर्क फॉर्म भरा.
            </p>
            <a
              href="tel:1800XXXXXXX"
              className="flex items-center gap-2 bg-orange text-white text-xs font-semibold px-3 py-2 rounded mb-2 hover:bg-orange-hover transition-colors"
              data-ocid="help.primary_button"
            >
              <Phone size={13} /> 1800-XXX-XXXX (Toll Free)
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 border border-teal text-teal text-xs font-semibold px-3 py-2 rounded hover:bg-teal/5 transition-colors"
              data-ocid="help.secondary_button"
            >
              <Mail size={13} /> संपर्क फॉर्म / Contact Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState("mr");
  const [activeTab, setActiveTab] = useState("home");

  const handleNav = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <UtilityBar lang={lang} setLang={setLang} />
      <SiteHeader />
      <NavBar active={activeTab} setActive={setActiveTab} />
      <main>
        <HeroSection onNav={handleNav} />
        <QuickServices onNav={handleNav} />
        <NoticesSection />
        <FormsSection />
        <VillageInfoSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingHelp />
    </div>
  );
}

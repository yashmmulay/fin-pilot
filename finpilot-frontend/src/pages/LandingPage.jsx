import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  PieChart,
  LineChart,
  Wallet,
  Target,
  ShieldCheck,
  Activity,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import {
  FaChartPie,
  FaListCheck,
  FaBullseye,
  FaShieldHalved,
  FaChartLine,
  FaBolt,
  FaCircleUser,
  FaStar,
  FaGithub,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

/* =====================================================
   NAVBAR
===================================================== */
function Navbar() {
  const [open, setOpen] = React.useState(false);
  const links = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Why FinPilot", href: "#why" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold text-slate-800 tracking-tight">
                FinPilot
              </p>
              <p className="text-xs text-slate-500 font-medium -mt-0.5">
                Smart Investment Tracker
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              Register
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-6 pt-2 flex flex-col gap-1 animate-[fadeIn_0.2s_ease-out]">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-3 px-4">
              <Link
                to="/login"
                className="w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-700 border border-gray-200 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

/* =====================================================
   HERO DASHBOARD MOCKUP (used in Hero Section)
===================================================== */
function HeroDashboardMockup() {
  return (
    <div className="relative">
      {/* Background accents */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-slate-200 p-5 sm:p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-slate-400 font-medium">
              Total Portfolio Value
            </p>
            <p className="text-2xl font-bold text-slate-800">₹24,82,940</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-600">
              +12.4%
            </span>
          </div>
        </div>

        {/* Mini chart bars */}
        <div className="flex items-end gap-2 h-24 mb-6 px-1">
          {[40, 65, 50, 80, 60, 95, 75, 88, 70, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400 hover:opacity-80 transition-opacity duration-200"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] text-emerald-600 font-semibold">
                +8.2%
              </span>
            </div>
            <p className="text-xs text-slate-400">Stocks</p>
            <p className="text-base font-bold text-slate-800">₹14,32,500</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span className="text-[11px] text-emerald-600 font-semibold">
                +4.1%
              </span>
            </div>
            <p className="text-xs text-slate-400">Mutual Funds</p>
            <p className="text-base font-bold text-slate-800">₹8,90,440</p>
          </div>
        </div>

        {/* Donut + recent activity */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex items-center justify-center">
            <div
              className="relative w-24 h-24 rounded-full"
              style={{
                background:
                  "conic-gradient(#2563EB 0% 45%, #6366F1 45% 70%, #93C5FD 70% 100%)",
              }}
            >
              <div className="absolute inset-2.5 bg-white rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-700">
                  Allocation
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-3 space-y-2.5">
            {[
              { label: "TCS", change: "+2.1%", up: true },
              { label: "HDFC Bank", change: "-0.4%", up: false },
              { label: "Nifty 50 ETF", change: "+1.3%", up: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold flex items-center gap-0.5 ${
                    item.up ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {item.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div className="hidden sm:flex absolute -left-8 top-1/3 items-center gap-3 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-slate-200 px-4 py-3 animate-[float_4s_ease-in-out_infinite]">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
          <Bell className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">Goal reached</p>
          <p className="text-[11px] text-slate-400">Retirement Fund 75%</p>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   HERO SECTION
===================================================== */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-[#F8FAFC] pt-16 pb-24 sm:pt-20 sm:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">
              Now with real-time market insights
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Invest Smarter.
            <br />
            Track Better.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grow Faster.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Manage stocks, ETFs and mutual funds from one intelligent
            dashboard. FinPilot brings clarity to every investment decision
            you make.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="#dashboard-preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Dashboard
            </a>
          </div>


        </div>

        {/* Right */}
        <HeroDashboardMockup />
      </div>
    </section>
  );
}

/* =====================================================
   FEATURE CARD
===================================================== */
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1.5 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-blue-100">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

/* =====================================================
   FEATURES SECTION
===================================================== */
function FeaturesSection() {
  const features = [
    {
      icon: FaChartPie,
      title: "Portfolio Management",
      description:
        "Track every stock, ETF, and mutual fund in one unified, intelligent dashboard built for clarity.",
    },
    {
      icon: FaListCheck,
      title: "Watchlist",
      description:
        "Keep a close eye on assets you're considering with live prices and instant alerts.",
    },
    {
      icon: FaBullseye,
      title: "Financial Goals",
      description:
        "Set targets like retirement or a home down payment, and track progress automatically.",
    },
    {
      icon: FaShieldHalved,
      title: "Risk Analysis",
      description:
        "Understand portfolio volatility and diversification with clear, actionable risk scores.",
    },
    {
      icon: FaChartLine,
      title: "Portfolio Analytics",
      description:
        "Deep performance breakdowns, sector allocation, and historical return comparisons.",
    },
    {
      icon: FaBolt,
      title: "Live Market Prices",
      description:
        "Real-time pricing for equities, ETFs, and funds so you always act on current data.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Everything You Need To Manage Investments
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            A complete toolkit built for serious investors, designed to feel
            effortless.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   HOW IT WORKS
===================================================== */
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Register",
      description:
        "Create your free FinPilot account in seconds with secure JWT authentication.",
    },
    {
      number: "02",
      title: "Build Portfolio",
      description:
        "Add your stocks, ETFs and mutual funds to build a complete picture of your wealth.",
    },
    {
      number: "03",
      title: "Track Growth",
      description:
        "Monitor performance, set goals, and make confident decisions with live insights.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How FinPilot Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-[#F8FAFC] rounded-2xl border border-gray-200 p-8 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-1.5 transition-all duration-300"
            >
              <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   WHY CHOOSE FINPILOT
===================================================== */
function WhyChooseSection() {
  const items = [
    {
      icon: LineChart,
      title: "Modern Dashboard",
      description: "A clean, intuitive interface built for fast decisions.",
    },
    {
      icon: Activity,
      title: "Live Market Data",
      description: "Real-time prices keep your portfolio always accurate.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Stay on track with visual progress toward every goal.",
    },
    {
      icon: ShieldCheck,
      title: "Risk Insights",
      description: "Understand exposure before it becomes a problem.",
    },
    {
      icon: FaShieldHalved,
      title: "JWT Authentication",
      description: "Bank-grade security protects your financial data.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Built on a lightning-fast, optimized tech stack.",
    },
  ];

  return (
    <section id="why" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Why FinPilot
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Built For Investors Who Want More
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   DASHBOARD PREVIEW
===================================================== */
function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            A Command Center For Your Wealth
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Every metric that matters
          </p>
        </div>

        <div className="bg-[#F8FAFC] rounded-2xl border border-gray-200 shadow-xl shadow-slate-200 p-5 sm:p-8">
          {/* KPI row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Net Worth", value: "₹32,18,200", change: "+9.6%", up: true },
              { label: "Monthly Return", value: "₹1,84,300", change: "+3.2%", up: true },
              { label: "Risk Score", value: "Moderate", change: "-1.1%", up: false },
              { label: "Active Goals", value: "5 / 8", change: "+2", up: true },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-xs text-slate-400 mb-1">{kpi.label}</p>
                <p className="text-lg font-bold text-slate-800">{kpi.value}</p>
                <span
                  className={`text-xs font-semibold flex items-center gap-0.5 mt-1 ${
                    kpi.up ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart + allocation */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-800">
                  Portfolio Performance
                </h3>
                <span className="text-xs text-slate-400">Last 6 months</span>
              </div>
              <div className="flex items-end gap-3 h-32 mb-2">
                {[55, 70, 48, 85, 65, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 hover:opacity-80 transition-opacity duration-200"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-slate-400">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-6 pt-6">
                <h4 className="text-xs font-bold text-slate-600 mb-4">
                  Recent Transactions
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Reliance Industries", type: "Buy", amount: "₹45,200" },
                    { name: "Axis Bluechip Fund", type: "SIP", amount: "₹10,000" },
                    { name: "Infosys", type: "Sell", amount: "₹22,800" },
                  ].map((tx) => (
                    <div
                      key={tx.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <Wallet className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-700">
                          {tx.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-700">
                          {tx.amount}
                        </p>
                        <p className="text-[11px] text-slate-400">{tx.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Allocation + goals + watchlist */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4">
                  Portfolio Allocation
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="relative w-28 h-28 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#2563EB 0% 50%, #6366F1 50% 75%, #93C5FD 75% 100%)",
                    }}
                  >
                    <div className="absolute inset-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Equity", color: "bg-blue-600", value: "50%" },
                    { label: "Mutual Funds", color: "bg-indigo-500", value: "25%" },
                    { label: "ETFs", color: "bg-blue-300", value: "25%" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${row.color}`} />
                        <span className="text-slate-500">{row.label}</span>
                      </div>
                      <span className="font-semibold text-slate-700">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4">
                  Goal Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Retirement Fund", value: 75 },
                    { label: "Home Down Payment", value: 40 },
                  ].map((goal) => (
                    <div key={goal.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-slate-600">
                          {goal.label}
                        </span>
                        <span className="text-xs font-semibold text-blue-600">
                          {goal.value}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                          style={{ width: `${goal.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4">
                  Watchlist
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "TCS", change: "+1.8%", up: true },
                    { name: "ITC", change: "-0.6%", up: false },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-600">
                        {item.name}
                      </span>
                      <span
                        className={`font-semibold flex items-center gap-0.5 ${
                          item.up ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {item.up ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   STAT CARD + STATISTICS SECTION
===================================================== */
function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300">
      <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-sm text-slate-500 mt-2">{label}</p>
    </div>
  );
}

function StatisticsSection() {
  const stats = [
    { value: "10K+", label: "Assets Tracked" },
    { value: "99.9%", label: "Availability" },
    { value: "24x7", label: "Portfolio Monitoring" },
    { value: "100%", label: "Responsive" },
  ];

  return (
    null
  );
}

/* =====================================================
   TESTIMONIAL CARD + TESTIMONIALS SECTION
===================================================== */
function TestimonialCard({ name, role, review }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        "{review}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <FaCircleUser className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Software Engineer",
      review:
        "FinPilot completely changed how I track my investments. The dashboard is clean and genuinely useful, not just pretty.",
    },
    {
      name: "Rohan Mehta",
      role: "Product Manager",
      review:
        "Goal tracking and risk insights have made me a far more disciplined investor. Highly recommend it.",
    },
    {
      name: "Priya Nair",
      role: "Freelance Designer",
      review:
        "Finally a portfolio tracker that doesn't feel like a spreadsheet. Setup took minutes and it just works.",
    },
  ];

  return (
    null
  );
}

/* =====================================================
   CTA SECTION
===================================================== */
function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center shadow-xl shadow-blue-200">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Start Building Your Financial Future Today
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-10">
              Join thousands of investors who manage their wealth smarter
              with FinPilot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-blue-600 bg-white rounded-xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white border border-white/40 rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   FOOTER
===================================================== */
function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FinPilot</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Smart investment tracking for modern investors. Manage your
              entire portfolio from one premium dashboard.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">About</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition-colors duration-200">Home</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</a></li>
              <li><a href="#why" className="hover:text-blue-400 transition-colors duration-200">Why FinPilot</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">GitHub</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FinPilot. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with React, Vite &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =====================================================
   LANDING PAGE (default export)
===================================================== */
export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <DashboardPreview />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

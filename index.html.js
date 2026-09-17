
(function () {
  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NO_HOVER = window.matchMedia && window.matchMedia("(hover: none)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function onView(el, fn, margin, threshold) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { fn(); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } }); }, { rootMargin: margin || "0px 0px -10% 0px", threshold: threshold || 0.01 });
    io.observe(el);
  }
  function store(k, v) { try { if (v === undefined) return window.localStorage.getItem(k); window.localStorage.setItem(k, v); } catch (e) { return null; } }
  function restart(el, cls) { if (RM || !el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  var WEEKS = ["13 Jul", "20 Jul", "27 Jul", "3 Aug", "10 Aug", "17 Aug", "24 Aug", "31 Aug", "7 Sep", "14 Sep"];
  var BANDS = ["quiet", "moderate", "active", "elevated", "critical"];
  function bandOf(s) { return s <= 19 ? 0 : s <= 39 ? 1 : s <= 59 ? 2 : s <= 79 ? 3 : 4; }
  function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

  var V = {
    law: {
      chip: "Law firm", noun: "law firms", firm: "Aldercrest Law", domain: "clients.aldercrestlaw.com", product: "Client Briefings",
      org: "Brightline Freight Co.", sub: "Trucking & warehousing · Ontario · Federal", mono: "BF", contact: "Dana Whitfield", title: "VP Operations",
      summary: ["A federal proposal would require electronic driver logs for regional fleets from next spring.", "An appeal court narrowed when carriers can treat owner-operators as independent contractors.", "The comment period on the draft warehouse racking standard closes in 12 days."],
      items: [
        { cat: "Regulation", prio: true, theme: "Transport rules", sent: "negative", head: "Federal regulator proposes electronic logging for regional fleets", imp: "Brightline's 40 regional trucks would need certified devices and driver training before the compliance date.", src: "Federal gazette · 11 Sep" },
        { cat: "Court decision", prio: true, theme: "Contractor status", sent: "negative", head: "Appeal court narrows the independent-contractor test for owner-operators", imp: "The ruling weighs control over routes heavily. The three owner-operator agreements should be reviewed before renewal.", src: "Court of Appeal · 10 Sep" },
        { cat: "Enforcement", prio: false, theme: "Workplace safety", sent: "neutral", head: "Inspectors fine two warehouse operators over racking checks", imp: "The same inspection gap would expose the main distribution centre; an internal audit now is inexpensive.", src: "Labour ministry bulletin · 9 Sep" }
      ],
      imps: ["Budget for logging devices in the first quarter, before vendor lead times grow.", "Owner-operator agreements are the highest-risk documents this quarter."],
      score: 62, delta: 18, volume: 28, consequence: 34, why: "A proposed rule and an appellate decision both land directly on core operations.",
      deadlines: [{ d: "28", m: "Sep", head: "Draft warehouse racking safety standard", type: "Comment period", left: "12 days left", urg: "soon" }, { d: "15", m: "Oct", head: "Electronic logging implementation timeline", type: "Consultation", left: "29 days left", urg: "later" }],
      counts: [14, "Regulation", 5, "Courts", 4, "Enforcement", 5],
      trend: [22, 28, 25, 31, 30, 38, 35, 41, 44, 62],
      earlier: [["7 Sep", "Quiet week: one tribunal decision on overtime averaging, with no direct impact.", 44], ["31 Aug", "New fuel-tax reporting guidance; the filing change applies from next quarter.", 41], ["24 Aug", "Truck-route bylaw reviews opened in two delivery areas.", 35]],
      signals: [["Transport rules", true, [2, 3, 2, 4, 3, 5, 6, 9], "Surging"], ["Contractor status", true, [1, 1, 2, 1, 2, 2, 3, 4], "Rising"], ["Workplace safety", false, [2, 2, 1, 2, 2, 1, 2, 2], "Steady"]],
      archive: [["14 Sep", "Regulation", "Federal regulator proposes electronic logging for regional fleets", "Transport rules"], ["14 Sep", "Court decision", "Appeal court narrows the independent-contractor test for owner-operators", "Contractor status"], ["31 Aug", "Guidance", "Fuel-tax reporting guidance changes the quarterly filing format", "Transport rules"], ["17 Aug", "Enforcement", "Carrier penalised for misclassified drivers after an audit", "Contractor status"], ["18 Mar", "Tribunal", "Tribunal upholds a contractor model where drivers choose their routes", "Contractor status"]],
      ask: { q: "Has anything changed on driver classification this year?", a: ["Yes, and two decisions point in different directions.", "In March, a tribunal upheld a carrier's contractor model because drivers chose their own routes [1]. Last week's appeal decision goes the other way where the carrier sets routes and schedules [2], which is closer to how Brightline operates. An August audit penalty against another carrier shows regulators are already testing this [3]."], src: ["Tribunal upholds a contractor model where drivers choose their routes · 18 Mar", "Appeal court narrows the independent-contractor test for owner-operators · 10 Sep", "Carrier penalised for misclassified drivers after an audit · 17 Aug"] },
      dossier: {
        ask: ["What the business does and where it operates", "Active matters and areas of legal risk", "Regulators, courts and tribunals that matter", "Key contracts, counterparties and competitors", "What the brief is for: board updates, compliance, early warning"],
        watch: ["New and proposed legislation and regulations", "Court and tribunal decisions", "Regulator guidance and enforcement actions", "Consultations and comment periods, with closing dates", "Litigation involving competitors and counterparties"],
        sections: ["Legislation & regulation", "Court & tribunal decisions", "Enforcement & guidance", "Deadlines you can act on", "What it means for you"],
        value: "Clients hear from the firm every week, not only when there's a bill. A new rule or ruling often signals the next mandate, and the firm sees it first.",
        note: "Briefs are information, not legal advice. A lawyer can review each one before it's sent."
      }
    },
    accounting: {
      chip: "Accounting firm", noun: "accounting firms", firm: "Fernbrook CPA", domain: "portal.fernbrookcpa.com", product: "Client Briefings",
      org: "Oakview Dental Group", sub: "Dental clinics · 4 locations · Provincial", mono: "OD", contact: "Dr. Priya Raman", title: "Managing Partner",
      summary: ["Updated tax agency guidance changes how fee-split associates are assessed for payroll.", "The province raised its employer health tax exemption from January.", "The window to elect quarterly instalments closes on 30 September."],
      items: [
        { cat: "Guidance", prio: true, theme: "Payroll & contractors", sent: "negative", head: "Tax agency updates guidance on associates paid by fee split", imp: "Oakview's 11 associate agreements fit the contractor pattern, but scheduling rules at two clinics could draw questions.", src: "Tax agency · 11 Sep" },
        { cat: "Legislation", prio: true, theme: "Employer taxes", sent: "positive", head: "Province raises the employer health tax exemption threshold", imp: "A modest annual saving across the group; payroll settings need updating in January.", src: "Provincial budget update · 10 Sep" },
        { cat: "Deadline", prio: false, theme: "Instalments", sent: "neutral", head: "Quarterly instalment election window closes 30 September", imp: "Electing in would smooth cash flow ahead of the clinic expansion planned for spring.", src: "Tax agency notice · 8 Sep" }
      ],
      imps: ["Review associate scheduling at two clinics before year-end.", "Decide on the instalment election this month."],
      score: 48, delta: 9, volume: 22, consequence: 26, why: "One guidance change with real exposure; the rest is housekeeping with dates attached.",
      deadlines: [{ d: "30", m: "Sep", head: "Quarterly instalment election", type: "Filing election", left: "14 days left", urg: "soon" }, { d: "31", m: "Oct", head: "Draft rules on digital receipts for health practices", type: "Consultation", left: "45 days left", urg: "later" }],
      counts: [11, "Tax changes", 3, "Guidance", 5, "Deadlines", 3],
      trend: [30, 26, 34, 29, 31, 36, 33, 40, 39, 48],
      earlier: [["7 Sep", "Payroll remittance reminders; no rule changes affecting dental practices.", 39], ["31 Aug", "Consultation opened on digital receipts for health practices.", 40], ["24 Aug", "Proposed changes to small-business deduction thresholds, not yet final.", 33]],
      signals: [["Payroll & contractors", true, [1, 1, 2, 1, 2, 3, 3, 5], "Rising"], ["Employer taxes", true, [1, 0, 1, 1, 1, 2, 1, 3], "Steady"], ["Health sector rules", false, [0, 1, 0, 1, 1, 0, 1, 1], "Quiet"]],
      archive: [["14 Sep", "Guidance", "Tax agency updates guidance on associates paid by fee split", "Payroll & contractors"], ["14 Sep", "Legislation", "Province raises the employer health tax exemption threshold", "Employer taxes"], ["31 Aug", "Consultation", "Consultation opens on digital receipts for health practices", "Health sector rules"], ["24 Aug", "Legislation", "Small-business deduction thresholds proposed for change", "Employer taxes"], ["6 Jul", "Audit", "Audit programme targets contractor classification in health services", "Payroll & contractors"]],
      ask: { q: "What do we need to decide before year-end?", a: ["Two decisions and one review.", "Decide on the quarterly instalment election by 30 September [1]. Update payroll for the new employer health tax threshold in January [2]. And review associate scheduling at the two clinics flagged by the new fee-split guidance [3], ideally before year-end filings."], src: ["Quarterly instalment election window closes 30 September · 8 Sep", "Province raises the employer health tax exemption threshold · 10 Sep", "Tax agency updates guidance on associates paid by fee split · 11 Sep"] },
      dossier: {
        ask: ["Entity structure, year-end and where they file", "Payroll, contractors and benefits setup", "Planned changes: expansion, sale or succession", "Tax areas they care about most", "Who reads the brief: owner, controller or board"],
        watch: ["Tax agency guidance, rulings and notices", "Budget measures and new legislation", "Filing deadlines and election windows", "Sector rules that affect deductions and payroll", "Audit and enforcement trends"],
        sections: ["Tax & legislation", "Guidance & rulings", "Deadlines & elections", "Sector watch", "What it means for you"],
        value: "Turns a once-a-year relationship into a weekly one, and surfaces advisory work before the client thinks to ask.",
        note: "Every point links to its source, and a partner can review each brief before it goes out."
      }
    },
    wealth: {
      chip: "Wealth advisors", noun: "wealth advisors", firm: "Stonebridge Private Wealth", domain: "clients.stonebridgewealth.com", product: "Client Briefings",
      org: "The Okafor Family", sub: "Retirement & estate planning · Household of four", mono: "OF", contact: "Grace Okafor", title: "Client since 2019",
      summary: ["Rate-cut expectations moved again, and November's bond ladder rollover still looks well timed.", "A proposed change to how gains on family property are taxed could affect the cottage plan.", "One spouse's retirement account has to be converted before the end of this year."],
      items: [
        { cat: "Markets", prio: true, theme: "Fixed income", sent: "positive", head: "Central bank signals a slower path for rate cuts", imp: "Keeps yields higher into November, when $180,000 of the family's bond ladder rolls over.", src: "Central bank statement · 10 Sep" },
        { cat: "Tax", prio: true, theme: "Estate planning", sent: "negative", head: "Finance department consults on taxing gains on family property", imp: "If adopted, transferring the cottage before the change could reduce tax on the gain.", src: "Finance department · 9 Sep" },
        { cat: "Holdings", prio: false, theme: "Companies you own", sent: "positive", head: "Two of the family's larger holdings raise dividends", imp: "Adds roughly $2,400 a year of income; no change to the plan needed.", src: "Company releases · 11 Sep" }
      ],
      imps: ["Model the cottage transfer under both tax scenarios before the consultation closes.", "No action on the bond ladder until the November rollover."],
      score: 41, delta: 6, volume: 19, consequence: 22, why: "One proposal touches the estate plan; markets moved in the family's favour.",
      deadlines: [{ d: "25", m: "Sep", head: "Charitable giving plan for this tax year", type: "Planning deadline", left: "9 days left", urg: "soon" }, { d: "15", m: "Oct", head: "Consultation on taxing gains on family property", type: "Consultation", left: "29 days left", urg: "later" }, { d: "30", m: "Nov", head: "Retirement account conversion for Grace", type: "Planning deadline", left: "75 days left", urg: "later" }],
      counts: [9, "Markets", 4, "Tax & rules", 2, "Holdings", 3],
      trend: [28, 31, 27, 35, 30, 33, 29, 36, 35, 41],
      earlier: [["7 Sep", "Markets steady; no rule changes affecting the plan.", 35], ["31 Aug", "Next year's pension contribution limits announced.", 36], ["24 Aug", "Dividend change at one holding; income forecast updated.", 29]],
      signals: [["Fixed income", true, [2, 2, 3, 2, 3, 3, 4, 5], "Rising"], ["Estate planning", true, [0, 1, 0, 0, 1, 0, 1, 3], "Surging"], ["Companies you own", false, [3, 2, 3, 3, 2, 3, 3, 3], "Steady"]],
      archive: [["14 Sep", "Tax", "Finance department consults on taxing gains on family property", "Estate planning"], ["14 Sep", "Markets", "Central bank signals a slower path for rate cuts", "Fixed income"], ["31 Aug", "Rules", "Next year's pension contribution limits announced", "Estate planning"], ["20 Jul", "Planning", "Options for transferring the cottage: now, in stages, or at death", "Estate planning"], ["13 Jul", "Holdings", "Bond ladder rollover schedule reviewed against rate outlook", "Fixed income"]],
      ask: { q: "How would the property tax proposal affect our cottage plan?", a: ["It could raise the tax on transferring the cottage later.", "The proposal would change how gains on family property are taxed, with a consultation open until 15 October [1]. Your plan transfers the cottage in 2029, so the gain would fall under the new rules if they pass. In July we laid out the alternatives, transferring now or in stages, and their trade-offs [2]."], src: ["Finance department consults on taxing gains on family property · 9 Sep", "Options for transferring the cottage: now, in stages, or at death · 20 Jul"] },
      dossier: {
        ask: ["Household goals and time horizon", "Accounts, holdings and income sources", "Estate and succession plans", "Tax situation and residency", "Topics they want to hear about"],
        watch: ["Interest rate and market moves that touch their holdings", "Tax, pension and estate rule changes", "News on companies they own", "Deadlines tied to their accounts", "Consultations that could change their plan"],
        sections: ["Markets & your holdings", "Tax & rules", "Planning deadlines", "What it means for you"],
        value: "Clients hear from their advisor every week about their own money, not a market newsletter everyone gets. The podcast fits a commute.",
        note: "Every point is cited, and compliance can review each brief before it's sent."
      }
    },
    realestate: {
      chip: "Commercial real estate", noun: "commercial brokerages", firm: "Granite Row Commercial", domain: "clients.graniterow.com", product: "Client Briefings",
      org: "Bayline Industrial Partners", sub: "Industrial landlord · 14 buildings · 3 municipalities", mono: "BI", contact: "Marcus Bellamy", title: "Asset Manager",
      summary: ["Council approved a rezoning study for the east industrial corridor, where Bayline owns three buildings.", "Regional industrial vacancy rose for a third straight quarter.", "A public meeting on the corridor study is set for 2 October."],
      items: [
        { cat: "Zoning", prio: true, theme: "Planning & zoning", sent: "mixed", head: "Council approves a rezoning study for the east industrial corridor", imp: "Three Bayline buildings sit inside the study area. Mixed-use permissions could lift land value but squeeze logistics tenants.", src: "City council minutes · 10 Sep" },
        { cat: "Market", prio: true, theme: "Leasing market", sent: "negative", head: "Industrial vacancy rises for a third straight quarter", imp: "Expect more pressure on renewal rents at the two buildings with leases ending next year.", src: "Regional market report · 11 Sep" },
        { cat: "Infrastructure", prio: false, theme: "Nearby projects", sent: "positive", head: "Highway interchange upgrade near Eastgate moves to tender", imp: "Better truck access in two to three years, with construction disruption for Eastgate tenants first.", src: "Regional transportation notice · 8 Sep" }
      ],
      imps: ["Speak at, or submit to, the 2 October public meeting.", "Start renewal talks early at the two buildings with leases ending next year."],
      score: 57, delta: 15, volume: 24, consequence: 33, why: "A zoning study inside the portfolio's main corridor, plus softening lease demand.",
      deadlines: [{ d: "2", m: "Oct", head: "Public meeting on the east corridor rezoning study", type: "Public meeting", left: "16 days left", urg: "soon" }, { d: "31", m: "Dec", head: "Current development charge rates for permits filed this year", type: "Filing deadline", left: "106 days left", urg: "later" }],
      counts: [12, "Planning", 4, "Market", 5, "Near sites", 3],
      trend: [31, 29, 35, 33, 38, 36, 40, 39, 42, 57],
      earlier: [["7 Sep", "Two comparable warehouses sold; pricing held steady.", 42], ["31 Aug", "New development charge schedule published for next year.", 39], ["24 Aug", "Tenant expansion announced in the west corridor.", 40]],
      signals: [["Planning & zoning", true, [1, 1, 2, 1, 1, 2, 2, 6], "Surging"], ["Leasing market", true, [3, 3, 4, 3, 4, 4, 5, 5], "Rising"], ["Nearby projects", false, [1, 2, 1, 1, 2, 1, 2, 2], "Steady"]],
      archive: [["14 Sep", "Zoning", "Council approves a rezoning study for the east industrial corridor", "Planning & zoning"], ["14 Sep", "Market", "Industrial vacancy rises for a third straight quarter", "Leasing market"], ["14 Sep", "Infrastructure", "Highway interchange upgrade near Eastgate moves to tender", "Nearby projects"], ["7 Sep", "Market", "Two comparable warehouses sell at steady pricing", "Leasing market"], ["31 Aug", "Planning", "Development charge schedule published for next year", "Planning & zoning"]],
      ask: { q: "What's changing around our Eastgate property?", a: ["Two things, both close by.", "The rezoning study covers the corridor Eastgate sits in, with a public meeting on 2 October [1]. Separately, the nearby highway interchange upgrade has moved to tender [2], which improves truck access later but means construction first. Leasing demand in the area has softened for three quarters [3]."], src: ["Council approves a rezoning study for the east industrial corridor · 10 Sep", "Highway interchange upgrade near Eastgate moves to tender · 8 Sep", "Industrial vacancy rises for a third straight quarter · 11 Sep"] },
      dossier: {
        ask: ["Properties, addresses and asset types", "Tenants and lease expiries", "Markets and submarkets they care about", "Planned acquisitions, sales and developments", "Comparable owners and competitors"],
        watch: ["Council, planning and zoning decisions", "Development charges and property tax changes", "Leasing, sales and vacancy news", "Infrastructure projects near their sites", "New supply and competitor deals"],
        sections: ["Planning & zoning", "Market moves", "Near your properties", "Meetings & deadlines", "What it means for you"],
        value: "Every owner client gets intelligence tied to their own addresses, and the brokerage hears about a rezoning or a new competitor before anyone calls.",
        note: "Sources are cited on every item, and a broker can review each brief before it's sent."
      }
    },
    govaffairs: {
      chip: "Government affairs", chipNote: "the original", noun: "government-affairs firms", firm: "Parliament Row Advisory", domain: "portal.parliamentrow.com", product: "Intelligence Briefings",
      org: "Northwind Transit Group", sub: "Transit electrification · Provincial · Federal", mono: "NT", contact: "Lena Tremblay", title: "Director, Public Affairs",
      summary: ["Fleet electrification funding surged: 8 items this week against a usual 3.", "The regional transit authority previewed changes to vehicle procurement rules.", "A consultation on depot charging standards closes in 18 days."],
      items: [
        { cat: "Government", prio: true, theme: "Fleet electrification funding", sent: "positive", head: "Province signals a second intake for zero-emission bus funding", imp: "Northwind's 2027 replacement order could qualify if the application is ready before the intake opens.", src: "Provincial transport ministry · 12 Sep" },
        { cat: "Government", prio: false, theme: "Procurement rule changes", sent: "positive", head: "Transit authority previews changes to vehicle procurement rules", imp: "Local-content scoring would favour Northwind's assembly partner in the next tender.", src: "Regional transit authority · 10 Sep" },
        { cat: "Media", prio: false, theme: "Ridership recovery", sent: "negative", head: "Ridership recovery slows on suburban routes", imp: "Weaker ridership numbers could be used to argue for delaying fleet orders at budget time.", src: "Regional daily · 9 Sep" }
      ],
      imps: ["Prepare the funding application now; the intake window may be short.", "Brief the assembly partner on local-content scoring before the tender."],
      score: 60, delta: 40, volume: 27, consequence: 33, why: "Funding activity surged while procurement rules started moving at the same time.",
      deadlines: [{ d: "4", m: "Oct", head: "Consultation on depot charging standards", type: "Consultation", left: "18 days left", urg: "soon" }, { d: "30", m: "Oct", head: "Pre-budget submissions", type: "Budget stage", left: "44 days left", urg: "later" }],
      counts: [19, "Media", 6, "Government", 9, "Stakeholder", 4],
      trend: [26, 17, 39, 36, 33, 20, 26, 53, 20, 60],
      earlier: [["7 Sep", "5 items across 3 threads, 3 of them from government.", 20], ["31 Aug", "Procurement review previewed; 11 items across 3 threads.", 53], ["24 Aug", "Depot charging capacity in the news; 13 items.", 26]],
      signals: [["Fleet electrification funding", true, [5, 1, 1, 3, 3, 4, 2, 8], "Surging"], ["Procurement rule changes", false, [2, 2, 0, 2, 3, 3, 0, 5], "Surging"], ["Ridership recovery", false, [3, 2, 1, 0, 0, 2, 2, 4], "Rising"], ["Depot charging capacity", true, [0, 2, 3, 3, 3, 1, 1, 0], "Quiet"]],
      archive: [["14 Sep", "Government", "Province signals a second intake for zero-emission bus funding", "Fleet electrification funding"], ["14 Sep", "Government", "Transit authority previews changes to vehicle procurement rules", "Procurement rule changes"], ["31 Aug", "Government", "Procurement review announced ahead of the next budget cycle", "Procurement rule changes"], ["24 Aug", "Media", "Depot charging capacity questioned as fleets grow", "Depot charging capacity"], ["20 Jul", "Stakeholder", "Industry association calls for faster electrification funding", "Fleet electrification funding"]],
      ask: { q: "What's happened on fleet funding in the last three months?", a: ["Activity picked up sharply in the last month.", "An industry association pushed for faster funding in July [1]. Mentions stayed low through August, then jumped to 8 items this week against a usual 3, led by the province signalling a second funding intake [2]."], src: ["Industry association calls for faster electrification funding · 20 Jul", "Province signals a second intake for zero-emission bus funding · 12 Sep"] },
      dossier: {
        ask: ["Organization, sector and what it does", "Jurisdictions and languages to watch", "Priority themes, plus themes to monitor", "Programs, funds, bills and regulations of interest", "What the report is for: executives, advocacy, submissions"],
        watch: ["Government announcements, programs and budgets", "Bills, regulations and consultations", "Procurement notices and tenders", "Media coverage and stakeholder opinion", "Competitor and counterpart moves"],
        sections: ["Media coverage", "Government & regulatory", "Stakeholder opinion", "Stakeholder intelligence", "Strategic synopsis"],
        value: "This is the original build: a government-affairs intelligence firm briefs each of its clients weekly on the policy moves that affect them.",
        note: "Same structure as the live product, shown here with a made-up client."
      }
    }
  };
  var ORDER = ["law", "accounting", "wealth", "realestate", "govaffairs"];

  var cur = "law", tab = "updates";
  var fromHash = (location.hash || "").replace("#", "");
  if (V[fromHash]) cur = fromHash;
  else { var saved = store("mb-vertical"); if (saved && V[saved]) cur = saved; }

  /* ---------- the page cites itself ---------- */
  var SOURCES = [
    "Brief length: the two briefs produced on 14 September 2026 ran to 8 pages each.",
    "Episode length: the audio file produced on 14 September 2026 runs about 6 minutes.",
    "Unattended run time: 11 minutes 9 seconds from start to saved brief for one client on 14 September 2026, with no one involved.",
    "Estimate: 100 briefs at about 11 minutes each, run ten at a time, come to about 2 hours.",
    "Running cost per brief, measured on the September 2026 test runs. Exact figures on request.",
    "Search step, 14 September 2026: 12 searches, 120 results, 112 different pages, 15 kept in the brief, 3 headlines in the email.",
    "Every item in a brief carries the address of its source. The report builder refuses to produce a page without one.",
    "Reading volume: on the 14 September 2026 runs the AI read about 46,000 and 53,000 words of source material for two clients (88 and 112 sources). At 250 words a minute, that is more than three hours of reading per client.",
    "Price the original government-affairs firm charges its own clients for their weekly brief, podcast and portal, per the firm, September 2026."
  ];
  var pop = $("#pop");
  function showAt(x, y, html) {
    pop.innerHTML = html; pop.hidden = false;
    var w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.min(Math.max(8, x + 12), window.innerWidth - w - 8) + "px";
    var top = y - h - 12; pop.style.top = (top < 8 ? y + 18 : top) + "px";
  }
  function hidePop() { pop.hidden = true; }
  function wireCites(root) {
    $$(".cite", root).forEach(function (a) {
      if (a.getAttribute("data-wired")) return;
      a.setAttribute("data-wired", "1");
      var n = +a.getAttribute("data-n"), html = "<b>Source " + n + "</b>" + esc(SOURCES[n - 1] || "");
      a.setAttribute("aria-label", "Source " + n + ": " + (SOURCES[n - 1] || ""));
      a.addEventListener("pointermove", function (e) { showAt(e.clientX, e.clientY, html); });
      a.addEventListener("pointerleave", hidePop);
      a.addEventListener("focus", function () { var r = a.getBoundingClientRect(); showAt(r.left, r.top, html); });
      a.addEventListener("blur", hidePop);
      a.addEventListener("click", function (e) { e.stopPropagation(); var r = a.getBoundingClientRect(); if (pop.hidden) showAt(r.left, r.top, html); else hidePop(); });
    });
  }
  wireCites(document);
  window.addEventListener("scroll", hidePop, { passive: true });
  document.addEventListener("click", function (e) { if (!pop.hidden && !(e.target.closest && e.target.closest(".cite"))) hidePop(); });
  function citeHtml(n) { return ' <button type="button" class="cite" data-n="' + n + '">' + n + "</button>"; }

  /* ---------- reveal ---------- */
  if (!RM) {
    $$(".rv").forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("pre"); onView(el, function () { el.classList.remove("pre"); }, "0px 0px -6% 0px"); }
    });
  }

  /* ---------- hero word cycle ---------- */
  var cycleBtn = $("#cycleBtn"), cycleIdx = ORDER.indexOf(cur), cycleTimer = 0, cyclePaused = false;
  var cycleSpans = ORDER.map(function (k) { var sp = document.createElement("span"); sp.textContent = V[k].noun; cycleBtn.appendChild(sp); return sp; });
  function setCycle(i) {
    cycleIdx = (i + ORDER.length) % ORDER.length;
    cycleSpans.forEach(function (sp, j) { sp.classList.remove("on"); if (j === cycleIdx) { if (!RM) void sp.offsetWidth; sp.classList.add("on"); } });
    cycleBtn.setAttribute("aria-label", "Show the portal for " + V[ORDER[cycleIdx]].noun);
  }
  setCycle(cycleIdx);
  if (!RM) {
    cycleTimer = setInterval(function () { if (!cyclePaused) setCycle(cycleIdx + 1); }, 2600);
    cycleBtn.addEventListener("mouseenter", function () { cyclePaused = true; });
    cycleBtn.addEventListener("mouseleave", function () { cyclePaused = false; });
    cycleBtn.addEventListener("focus", function () { cyclePaused = true; });
    cycleBtn.addEventListener("blur", function () { cyclePaused = false; });
  }
  cycleBtn.addEventListener("click", function () {
    setVertical(ORDER[cycleIdx], true);
    $("#portal").scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
  });

  /* ---------- the Monday board ---------- */
  var ROWS = [
    { k: "search", t: "Searching this week's sources", a: 0, b: 0.5 },
    { k: "read", t: "Reading every page", a: 0.5, b: 8.4 },
    { k: "score", t: "Scoring the week", a: 8.4, b: 8.7 },
    { k: "brief", t: "Building the brief", a: 8.7, b: 8.9 },
    { k: "pod", t: "Recording the episode", a: 8.9, b: 11.0 },
    { k: "send", t: "Sending it", a: 11.0, b: 11.2 }
  ];
  var END = 11.2, MS_PER_MIN = 1050, HOLD = 4200;
  var bRows = $("#bRows"), bClock = $("#bClock"), bFoot = $("#bFoot"), bLive = $("#bReplay");
  var bRaf = 0, bT0 = 0, bEls = [], bDone = null;
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function mmss(sec) { sec = Math.max(0, Math.floor(sec)); return Math.floor(sec / 60) + ":" + pad2(sec % 60); }
  function waveBars(n) { var o = ""; for (var i = 0; i < n; i++) o += '<i style="--i:' + i + '"></i>'; return o; }
  function buildBoard() {
    bRows.innerHTML = ROWS.map(function (r) {
      return '<li class="brow" data-k="' + r.k + '" data-state="pending"><span class="brow-dot" aria-hidden="true"></span><div class="brow-main"><b>' + esc(r.t) + '</b><span class="brow-sub"></span></div><div class="brow-side"></div></li>';
    }).join("");
    bEls = $$(".brow", bRows).map(function (li) { return { li: li, sub: $(".brow-sub", li), side: $(".brow-side", li), st: "", lastSub: null, lastSide: null }; });
    bFoot.innerHTML = ""; bDone = null;
  }
  function frac(T, r) { return Math.max(0, Math.min(1, (T - r.a) / (r.b - r.a))); }
  function paintBoard(T) {
    var d = V[cur], total = Math.floor((540 + T) * 60);
    bClock.innerHTML = pad2(Math.floor(total / 3600)) + ":" + pad2(Math.floor(total / 60) % 60) + "<small>:" + pad2(total % 60) + "</small>";
    ROWS.forEach(function (r, i) {
      var e = bEls[i], f = frac(T, r), st = T >= r.b ? "done" : T >= r.a ? "running" : "pending", sub = "", side = "", first = d.contact.split(" ")[0];
      if (r.k === "search") { sub = st === "pending" ? "12 searches, trusted sources only" : st === "done" ? "120 results · 112 different pages" : Math.round(120 * f) + " results from 12 searches"; side = st === "pending" ? "" : "09:00"; }
      else if (r.k === "read") { sub = st === "pending" ? "112 pages, every one of them" : st === "done" ? "112 read · 15 kept for " + d.org : Math.round(112 * f) + " of 112 pages read"; side = st === "done" ? "09:08" : st === "running" ? Math.round(f * 100) + "%" : ""; }
      else if (r.k === "score") { var sc = Math.round(d.score * (st === "done" ? 1 : f)); sub = st === "pending" ? "activity level, 0 to 100" : "volume " + d.volume + " · consequence " + d.consequence; side = st === "pending" ? "" : '<span class="score">' + sc + "</span>" + (st === "done" ? ' <span class="chip">' + cap(BANDS[bandOf(d.score)]) + "</span>" : ""); }
      else if (r.k === "brief") { sub = st === "pending" ? "a PDF in " + d.firm + "'s branding" : "8 pages · every item cited"; side = st === "done" ? '<span class="chip">PDF ready</span>' : st === "running" ? "rendering…" : ""; }
      else if (r.k === "pod") { sub = st === "pending" ? "two hosts, about six minutes" : st === "done" ? "6:01 · transcript attached" : "recording… " + mmss(361 * f); side = st === "pending" ? "" : '<span class="wave' + (st === "running" ? " on" : "") + '">' + waveBars(9) + "</span>" + (st === "done" ? "6:01" : ""); }
      else if (r.k === "send") { sub = st === "pending" ? "to " + d.contact + ", " + d.title.toLowerCase() : st === "done" ? "in " + first + "'s inbox, with the PDF and the episode" : "sending…"; side = st === "done" ? '<span class="mailcard"><b>3 things that matter this week</b><span>to ' + esc(d.contact) + "</span></span>" : ""; }
      if (e.st !== st) { e.st = st; e.li.setAttribute("data-state", st); }
      if (e.lastSub !== sub) { e.lastSub = sub; e.sub.textContent = sub; }
      if (e.lastSide !== side) { e.lastSide = side; e.side.innerHTML = side; }
    });
    var done = T >= END;
    if (bDone !== done) {
      bDone = done;
      bFoot.innerHTML = done ? "<b>Done at 09:11.</b> Nobody on your team touched it." : "";
      bLive.textContent = done ? "● done · click to replay" : "● replaying · click to restart";
      bLive.classList.toggle("done", done);
    }
  }
  function stopMonday() { if (bRaf) cancelAnimationFrame(bRaf); bRaf = 0; }
  function startMonday() {
    stopMonday(); buildBoard();
    if (RM) { paintBoard(END); return; }
    bT0 = performance.now();
    (function f(now) {
      var T = (now - bT0) / MS_PER_MIN;
      if (T >= END + HOLD / MS_PER_MIN) { bT0 = now; T = 0; }
      paintBoard(Math.min(T, END));
      bRaf = requestAnimationFrame(f);
    })(bT0);
  }
  bLive.addEventListener("click", function () { startMonday(); });

  /* ---------- pick a client ---------- */
  var cards = $("#cards"), cardHover = -1;
  ORDER.forEach(function (k, i) {
    var d = V[k], b = document.createElement("button");
    b.type = "button"; b.className = "card"; b.setAttribute("role", "radio"); b.setAttribute("data-v", k);
    b.setAttribute("aria-label", d.org + ", a client of " + d.firm + " (" + d.chip + ")");
    b.innerHTML = '<div class="card-head"><span class="card-kind">' + esc(d.chip) + '</span></div><div class="card-body"><span class="card-eyebrow">One of their clients</span><div class="card-org">' + esc(d.org) + '</div><div class="card-sub">' + esc(d.sub) + '</div><div class="card-who"><b>' + esc(d.contact) + "</b><span>" + esc(d.title) + '</span></div></div><div class="card-foot">Client of ' + esc(d.firm) + "</div>";
    b.addEventListener("click", function () { setVertical(k, true); });
    b.addEventListener("mouseenter", function () { cardHover = i; layoutCards(); });
    b.addEventListener("focus", function () { cardHover = i; layoutCards(); });
    b.addEventListener("keydown", function (e) {
      var j = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % ORDER.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i + ORDER.length - 1) % ORDER.length;
      if (j !== null) { e.preventDefault(); setVertical(ORDER[j], true); $('.card[data-v="' + ORDER[j] + '"]').focus(); }
    });
    cards.appendChild(b);
  });
  cards.classList.add("js-deck");
  cards.addEventListener("mouseleave", function () { cardHover = -1; layoutCards(); });
  cards.addEventListener("focusout", function (e) { if (!cards.contains(e.relatedTarget)) { cardHover = -1; layoutCards(); } });
  function layoutCards() {
    var els = $$(".card", cards), n = els.length, W = cards.clientWidth;
    if (!W || !n) return;
    var sel = ORDER.indexOf(cur), focus = cardHover >= 0 ? cardHover : sel, vertical = W < 940;
    cards.classList.toggle("deck-v", vertical);
    els.forEach(function (el, i) { el.classList.toggle("is-focus", i === focus); el.style.zIndex = i === focus ? 20 : i + 1; });
    if (!vertical) {
      var cw = Math.round(Math.min(270, Math.max(210, W * 0.235)));
      var maxH = 0;
      els.forEach(function (el) { el.style.width = cw + "px"; el.style.minHeight = ""; maxH = Math.max(maxH, el.offsetHeight); });
      var step = Math.min(cw + 12, (W - 2 * cw - 12) / (n - 2)), shift = Math.max(0, cw + 12 - step);
      els.forEach(function (el, i) {
        el.style.minHeight = maxH + "px";
        el.style.transform = "translate(" + (i * step + (i > focus ? shift : 0)).toFixed(1) + "px, " + (i === focus ? -10 : 0) + "px)";
      });
      cards.style.height = (maxH + 44) + "px";
    } else {
      var y = 0, HEAD = 48, GAP = 10, lastBottom = 0;
      els.forEach(function (el) { el.style.width = "100%"; el.style.minHeight = ""; });
      els.forEach(function (el, i) {
        el.style.transform = "translate(0, " + y + "px)";
        lastBottom = y + el.offsetHeight;
        y += i === focus ? el.offsetHeight + GAP : HEAD;
      });
      cards.style.height = (lastBottom + 16) + "px";
    }
  }
  window.addEventListener("resize", layoutCards);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutCards);


  function setVertical(k, animate) {
    cur = k;
    store("mb-vertical", k);
    $$(".card").forEach(function (b) { var on = b.getAttribute("data-v") === k; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
    layoutCards();
    startMonday();
    renderPortalHead();
    renderTab(animate);
    renderDossier(animate);
  }

  /* ---------- portal ---------- */
  var pvBody = $("#pvBody"), pvInd = $("#pvInd"), audioTimer = 0;
  function renderPortalHead() {
    var d = V[cur];
    $("#pvMono").textContent = d.mono;
    $("#pvBrand").textContent = d.firm + " · " + d.product;
    $("#pvOrg").textContent = d.org;
    $("#pvSub").textContent = d.sub;
    $("#pvUrl").textContent = d.domain + "/portal";
    $("#pvFoot").textContent = "Prepared by " + d.firm + ". Questions about your coverage? Reply to your update email.";
  }
  function moveInd() {
    var t = $('.pv-tab[data-tab="' + tab + '"]');
    if (!t) return;
    pvInd.style.left = t.offsetLeft + "px";
    pvInd.style.width = t.offsetWidth + "px";
  }
  function spark(series) {
    var max = Math.max.apply(null, series.concat([1])), w = 70, h = 22;
    var pts = series.map(function (v, i) { return (i / (series.length - 1) * w).toFixed(1) + "," + (h - 3 - v / max * (h - 6)).toFixed(1); });
    var last = pts[pts.length - 1].split(",");
    return '<svg viewBox="0 0 70 22" aria-hidden="true"><polyline points="' + pts.join(" ") + '"/><circle cx="' + last[0] + '" cy="' + last[1] + '" r="2.2"/></svg>';
  }
  var CATC = { "Regulation": "gov", "Legislation": "gov", "Guidance": "gov", "Government": "gov", "Tax": "gov", "Zoning": "gov", "Court decision": "stake", "Enforcement": "comp", "Holdings": "comp", "Deadline": "proc", "Infrastructure": "proc", "Markets": "media", "Market": "media", "Media": "media" };
  function itemHtml(it) {
    var ck = CATC[it.cat] || "gov";
    return '<div class="pv-item cat-' + ck + '"><div class="pv-tags"><span class="pv-cat c-' + ck + '">' + esc(it.cat) + "</span>" + (it.prio ? '<span class="pv-prio">priority theme</span>' : "") + '<span class="pv-pill">' + esc(it.theme) + '</span><span class="pv-sent s-' + esc(it.sent) + '">' + esc(it.sent) + '</span></div><p class="pv-ihead">' + esc(it.head) + '</p><p class="pv-imp">' + esc(it.imp) + '</p><p class="pv-src">' + esc(it.src) + "</p></div>";
  }
  function updatesHtml(d) {
    var b = bandOf(d.score);
    return '<div class="pv-grid"><div class="pv-main">' +
      '<div class="pv-card pv-hero"><p class="pv-kicker">This week</p><h4 class="pv-date">Monday, 14 September 2026</h4><span class="pv-period">Monitoring period 7–14 Sep</span>' +
      '<ul class="pv-summary">' + d.summary.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      '<div class="pv-actions"><button class="pv-btn pv-btn-primary" type="button" data-go="briefings">Read the full briefing</button><button class="pv-btn" type="button" data-go="research">Ask about it</button></div></div>' +
      '<p class="pv-label">What matters now</p><div class="pv-card">' + d.items.map(itemHtml).join("") + "</div>" +
      '<p class="pv-label">What it means for you</p><div class="pv-card pv-pad"><ul class="pv-imps">' + d.imps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
      '</div><aside class="pv-rail">' +
      '<div class="pv-card"><p class="pv-rt">Activity level · 0–100</p><div class="pv-big"><span class="pv-num" id="pvNum">' + d.score + '</span><span class="pv-band b-' + BANDS[b] + '">' + cap(BANDS[b]) + "</span></div>" +
      '<div class="pv-bandbar">' + BANDS.map(function (x, i) { return '<span class="' + (i === b ? "on" : "") + '"></span>'; }).join("") + "</div>" +
      '<div class="pv-bandlabels">' + BANDS.map(function (x, i) { return '<span class="' + (i === b ? "on" : "") + '">' + x + "</span>"; }).join("") + "</div>" +
      '<div class="pv-halves"><div><div class="pv-half-row"><span>Volume <small style="color:var(--pv-faint)">how much happened</small></span><b>' + d.volume + '/50</b></div><div class="pv-half-track"><i data-w="' + d.volume * 2 + '"></i></div></div>' +
      '<div><div class="pv-half-row"><span>Consequence <small style="color:var(--pv-faint)">how much it matters</small></span><b>' + d.consequence + '/50</b></div><div class="pv-half-track"><i data-w="' + d.consequence * 2 + '"></i></div></div></div>' +
      '<p class="pv-delta"><span class="pv-trendpill">↗ Rising</span><span><b>+' + d.delta + "</b> vs last week</span></p><p class=\"pv-why\">" + esc(d.why) + "</p></div>" +
      '<div class="pv-card"><p class="pv-rt">This week\'s briefing</p><div class="pv-link">PDF report<small>8 pages</small></div><div class="pv-link">Podcast episode<small>6:01</small></div>' +
      '<div class="pv-player"><button class="pv-play" type="button" id="pvPlay" aria-label="Play sample episode"></button><div><div class="pv-ptrack"><i id="pvProg"></i></div><div class="pv-ptime" id="pvTime">0:00 / 6:01</div></div></div></div>' +
      '<div class="pv-card"><p class="pv-rt">Deadlines you can still act on</p>' + d.deadlines.map(function (x) { return '<div class="pv-dl"><div class="pv-dld urg-' + x.urg + '"><b>' + esc(x.d) + "</b><small>" + esc(x.m) + '</small></div><div><p class="pv-dlh">' + esc(x.head) + '</p><p class="pv-dls">' + esc(x.type) + " · " + esc(x.left) + "</p></div></div>"; }).join("") + "</div>" +
      "</aside></div>";
  }
  function briefingsHtml(d) {
    var b = bandOf(d.score), max = 100;
    var alerts = d.signals.filter(function (s) { return s[3] === "Surging"; }).slice(0, 1).map(function (s) {
      var prev = s[2].slice(0, -1), avg = Math.round(prev.reduce(function (a, c) { return a + c; }, 0) / prev.length);
      return '<div class="pv-alert"><span class="pv-sev">Surge</span><b>' + esc(s[0]) + "</b><span>" + s[2][s[2].length - 1] + " items this week vs a usual " + Math.max(1, avg) + "</span></div>";
    }).join("");
    return '<div class="pv-card pv-hero"><div class="pv-hero-top"><div><p class="pv-kicker">Latest briefing</p><h4 class="pv-date">Monday, 14 September 2026</h4><span class="pv-period">Monitoring period 7–14 Sep</span></div>' +
      '<div class="pv-meter"><div class="pv-big"><span class="pv-num" style="font-size:34px">' + d.score + '</span><span class="pv-band b-' + BANDS[b] + '">' + cap(BANDS[b]) + '</span></div><div class="pv-meter-track"><i data-w="' + d.score + '"></i></div><span class="pv-meter-k">Activity level · 0–100</span></div></div>' +
      '<p class="pv-excerpt">' + esc(d.summary[0]) + "</p>" +
      '<div class="pv-stats"><div class="pv-stat"><b>' + d.counts[0] + '</b><span>Items tracked</span></div><div class="pv-stat"><b>' + d.counts[2] + "</b><span>" + esc(d.counts[1]) + '</span></div><div class="pv-stat"><b>' + d.counts[4] + "</b><span>" + esc(d.counts[3]) + '</span></div><div class="pv-stat"><b>' + d.counts[6] + "</b><span>" + esc(d.counts[5]) + "</span></div></div>" +
      '<div class="pv-actions"><button class="pv-btn pv-btn-primary" type="button">Read the briefing</button><button class="pv-btn" type="button">Download PDF</button></div></div>' +
      '<div class="pv-two"><div class="pv-card" id="pvTrendCard"><p class="pv-rt">Activity level by week</p><div class="pv-trend" id="pvTrend">' +
      d.trend.map(function (v, i) { return '<button class="pv-tbar" type="button" style="--i:' + i + '" data-tip="' + WEEKS[i] + " · activity " + v + " · " + cap(BANDS[bandOf(v)]) + '" aria-label="Week of ' + WEEKS[i] + ", activity " + v + '"><i style="--h:' + Math.max(3, v / max * 100) + '%"></i></button>'; }).join("") +
      '</div><div class="pv-tx"><span>' + WEEKS[0] + "</span><span>" + WEEKS[9] + '</span></div><div class="pv-tip" id="pvTip" hidden></div></div>' +
      '<div class="pv-card pv-sigs" id="pvSigs"><p class="pv-rt">Theme signals</p>' + alerts +
      d.signals.map(function (s) { return '<div class="pv-sig"><span>' + esc(s[0]) + (s[1] ? ' <span class="pv-prio" style="font-size:9.5px">priority</span>' : "") + "</span>" + spark(s[2]) + '<span class="pv-st ' + s[3].toLowerCase() + '">' + s[3] + "<small>" + s[2][s[2].length - 1] + " this week</small></span></div>"; }).join("") +
      "</div></div>" +
      '<p class="pv-label">Earlier briefings</p><div class="pv-card">' + d.earlier.map(function (r) { return '<div class="pv-row"><div class="pv-row-d">' + esc(r[0]) + " 2026<small>weekly</small></div><div>" + esc(r[1]) + '</div><span class="pv-score-chip b-' + BANDS[bandOf(r[2])] + '">' + r[2] + "</span></div>"; }).join("") + "</div>";
  }
  function researchHtml(d) {
    return '<div class="pv-card pv-ask"><p class="pv-kicker">Ask your archive</p><p class="pv-ask-sub">Ask a question of everything tracked for you. Answers cite the items they come from.</p>' +
      '<form class="pv-ask-row" id="pvAskForm"><input class="pv-input" id="pvAskQ" type="text" readonly value="' + esc(d.ask.q) + '" aria-label="Sample question"><button class="pv-btn pv-btn-primary" type="submit">Ask</button></form>' +
      '<div id="pvAskOut"></div></div>' +
      '<p class="pv-label">Everything tracked for you</p>' +
      '<div class="pv-ask-row" style="margin-top:0"><input class="pv-input" id="pvArcQ" type="search" placeholder="Search headlines and themes…" aria-label="Search the archive"></div>' +
      '<p class="pv-arc-count" id="pvArcCount"></p><div class="pv-card" id="pvArcList"></div>';
  }
  function paintArchive() {
    var d = V[cur], q = ($("#pvArcQ").value || "").trim().toLowerCase();
    var rows = d.archive.filter(function (r) { return !q || (r[2] + " " + r[3] + " " + r[1]).toLowerCase().indexOf(q) !== -1; });
    $("#pvArcCount").textContent = rows.length + " of " + d.archive.length + " items shown · sample archive";
    $("#pvArcList").innerHTML = rows.length ? rows.map(function (r) { return '<div class="pv-row"><div class="pv-row-d">' + esc(r[0]) + "<small>" + esc(r[1]) + '</small></div><div><span class="pv-ihead" style="font-size:15.5px">' + esc(r[2]) + '</span></div><span class="pv-pill">' + esc(r[3]) + "</span></div>"; }).join("") : '<div class="pv-row"><div></div><div style="color:var(--pv-muted)">No items match that search.</div><span></span></div>';
  }
  var askTimer = 0;
  function runAsk() {
    var d = V[cur], out = $("#pvAskOut");
    clearInterval(askTimer);
    out.innerHTML = '<p class="pv-ask-status">Reading the archive…</p>';
    var html = function (typed, done) {
      var paras = d.ask.a.map(function (p) { return p; });
      var body;
      if (done) body = paras.map(function (p) { return "<p>" + esc(p).replace(/\[(\d)\]/g, '<span class="pv-cite">$1</span>') + "</p>"; }).join("");
      else body = "<p>" + esc(typed).replace(/\n\n/g, "</p><p>") + '<span class="pv-caret"></span></p>';
      return '<div class="pv-answer">' + body + "</div>" + (done ? '<ul class="pv-srcs"><li class="pv-srcs-k">From this client\'s monitoring</li>' + d.ask.src.map(function (s, i) { return '<li><span class="pv-cite">' + (i + 1) + "</span> " + esc(s) + "</li>"; }).join("") + '</ul><p class="pv-demo-note">Sample answer. The live portal answers from each client\'s real archive.</p>' : "");
    };
    var full = d.ask.a.join("\n\n");
    if (RM) { out.innerHTML = html(full, true); return; }
    setTimeout(function () {
      if (V[cur] !== d || !$("#pvAskOut")) return;
      var i = 0;
      askTimer = setInterval(function () {
        i += 4;
        var o = $("#pvAskOut");
        if (!o || V[cur] !== d) { clearInterval(askTimer); return; }
        if (i >= full.length) { clearInterval(askTimer); o.innerHTML = html(full, true); return; }
        o.innerHTML = html(full.slice(0, i), false);
      }, 18);
    }, 900);
  }
  function wireBody() {
    $$("[data-go]", pvBody).forEach(function (b) { b.addEventListener("click", function () { setTab(b.getAttribute("data-go"), true); }); });
    $$("[data-w]", pvBody).forEach(function (i) {
      var w = i.getAttribute("data-w") + "%";
      if (RM) { i.style.width = w; return; }
      i.style.width = "0";
      requestAnimationFrame(function () { requestAnimationFrame(function () { i.style.width = w; }); });
    });
    var num = $("#pvNum");
    if (num && !RM) {
      var target = +num.textContent, t0 = performance.now();
      (function f(now) { var p = Math.min(1, (now - t0) / 700); num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
    }
    var play = $("#pvPlay");
    if (play) {
      clearInterval(audioTimer);
      var sec = 0, total = 361;
      play.addEventListener("click", function () {
        if (play.classList.toggle("on")) {
          play.setAttribute("aria-label", "Pause sample episode");
          audioTimer = setInterval(function () {
            sec = (sec + 3) % total;
            var p = $("#pvProg"), tt = $("#pvTime");
            if (!p) { clearInterval(audioTimer); return; }
            p.style.width = (sec / total * 100) + "%";
            tt.textContent = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0") + " / 6:01 · sample";
          }, 100);
        } else { play.setAttribute("aria-label", "Play sample episode"); clearInterval(audioTimer); }
      });
    }
    var trend = $("#pvTrend");
    if (trend) {
      restart(trend, "play");
      var tip = $("#pvTip"), card = $("#pvTrendCard");
      $$(".pv-tbar", trend).forEach(function (bar) {
        var show = function () {
          tip.textContent = bar.getAttribute("data-tip"); tip.hidden = false;
          var r = bar.getBoundingClientRect(), c = card.getBoundingClientRect();
          var x = Math.min(Math.max(r.left - c.left + r.width / 2, 70), c.width - 70);
          tip.style.left = x + "px"; tip.style.top = (r.top - c.top + r.height - (bar.firstChild.getBoundingClientRect().height) - 6) + "px";
        };
        bar.addEventListener("mouseenter", show); bar.addEventListener("focus", show);
        bar.addEventListener("mouseleave", function () { tip.hidden = true; }); bar.addEventListener("blur", function () { tip.hidden = true; });
      });
    }
    restart($("#pvSigs"), "play");
    var askForm = $("#pvAskForm");
    if (askForm) {
      askForm.addEventListener("submit", function (e) { e.preventDefault(); runAsk(); });
      $("#pvArcQ").addEventListener("input", paintArchive);
      paintArchive();
    }
  }
  function renderTab(animate) {
    var d = V[cur];
    clearInterval(audioTimer); clearInterval(askTimer);
    pvBody.innerHTML = tab === "updates" ? updatesHtml(d) : tab === "briefings" ? briefingsHtml(d) : researchHtml(d);
    pvBody.setAttribute("aria-labelledby", "pvt-" + tab);
    if (animate) restart(pvBody, "swap");
    wireBody();
  }
  function setTab(t, animate) {
    tab = t;
    $$(".pv-tab").forEach(function (b) { var on = b.getAttribute("data-tab") === t; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
    moveInd();
    renderTab(animate);
  }
  $$(".pv-tab").forEach(function (b, i, all) {
    b.addEventListener("click", function () { setTab(b.getAttribute("data-tab"), true); });
    b.addEventListener("keydown", function (e) {
      var j = null;
      if (e.key === "ArrowRight") j = (i + 1) % all.length;
      if (e.key === "ArrowLeft") j = (i + all.length - 1) % all.length;
      if (j !== null) { e.preventDefault(); all[j].focus(); setTab(all[j].getAttribute("data-tab"), true); }
    });
  });
  window.addEventListener("resize", moveInd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);

  /* ---------- dossier ---------- */
  function renderDossier(animate) {
    var d = V[cur], x = d.dossier, list = function (a) { return "<ul>" + a.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; };
    var el = $("#dossier");
    el.innerHTML = '<p class="dos-title">How it\'s set up for <span>' + esc(d.chip.toLowerCase().replace(/^a /, "")) + (d.chipNote ? "" : "s") + '</span></p><div class="dossier"><div class="dos"><h3>What the questionnaire asks</h3>' + list(x.ask) + '</div><div class="dos"><h3>What gets watched every week</h3>' + list(x.watch) + '</div><div class="dos"><h3>What the brief covers</h3>' + list(x.sections) + "</div></div>" +
      '<div class="dos-value"><p>' + esc(x.value) + '</p><span class="dos-note">' + esc(x.note) + "</span></div>";
    if (animate) restart(el, "fade");
  }

  /* ---------- how it works ---------- */
  var STEPS = [
    { who: "Software", t: "We build your questionnaire", p: "Your clients answer a few questions about their business, where they operate and what they care about. It sits on your website, saves as they go, and can connect to your checkout.", chips: ["6 short steps", "Your branding", "Can connect to checkout"], vis: "form" },
    { who: "AI", t: "Each client gets a signal profile", p: "AI turns the answers into a profile: the themes to follow and the specific sources worth watching for that client. It tells the research where to look and what counts, and your team can adjust it any time.", chips: ["Themes and trusted sources", "Custom per client", "Editable"], vis: "profile" },
    { who: "Software", t: "The research runs on its own", p: "Every week, scripts search the news, government sites, blogs, public posts and podcasts for each client. Podcast audio is transcribed, so an interview is searched the same way as an article. Search works by meaning, so \u201cvariance approved for the east lot\u201d still reaches a client watching \u201crezoning\u201d. Paid databases and your own systems can be added when your clients need them.", chips: ["Past week only", "Podcasts transcribed", "Matches by meaning"], vis: "search" },
    { who: "AI", t: "AI decides what matters", p: "AI reads everything collected for that client, about 50,000 words a week, more than three hours of reading, and keeps only the signals worth their attention. Every item is logged with its source, so it can be searched and tracked later.", chips: ["~50,000 words read", "Every item logged", "Every item cited"], vis: "funnel" },
    { who: "AI + software", t: "The brief, podcast and portal update", p: "AI writes the brief and the podcast script. Software builds the branded report, records the episode, sends the Monday email and updates the portal. Your team can review before anything goes out.", chips: ["~8-page brief", "~6-minute episode", "Optional review"], vis: "outputs" },
    { who: "AI", t: "Your client knows what to do next", p: "Each brief ends with suggested actions, the deadlines still open, and whether anything needs doing yet. It gives your client a reason to call you.", chips: ["Suggested actions", "Open deadlines", "A reason to call you"], vis: "portal" }
  ];
  function whoTag(s) { return '<span class="who' + (s.who.indexOf("AI") === 0 ? " who-ai" : "") + '">' + esc(s.who) + "</span>"; }
  function visHtml(kind) {
    if (kind === "form") return '<div class="funnel-mini">' + ["You", "Organization", "Where", "Themes", "Focus", "Objective"].map(function (s, i) { return '<div class="fm-row"><span>' + (i + 1) + ". " + s + '</span><i style="width:' + (100 - i * 6) + '%"></i><span>✓</span></div>'; }).join("") + "</div>";
    if (kind === "profile") return '<div class="mini"><div class="mini-row"><span>Search</span><span>Scope</span><span>Type</span></div><div class="mini-row"><span>proposed rules · logging · regional fleets</span><span>federal regulator</span><span class="stat-wait">rules</span></div><div class="mini-row"><span>contractor test · owner-operators</span><span>courts &amp; tribunals</span><span class="stat-wait">courts</span></div><div class="mini-row"><span>warehouse safety · inspections</span><span>provincial ministry</span><span class="stat-wait">enforcement</span></div></div>';
    if (kind === "search") return '<div class="funnel-mini"><div class="fm-row"><span>Searches run</span><i style="width:10%"></i><span>12</span></div><div class="fm-row"><span>Results found</span><i style="width:100%"></i><span>120</span></div><div class="fm-row"><span>Unique pages</span><i style="width:93%"></i><span>112</span></div></div>';
    if (kind === "funnel") { var g = ""; for (var w = 0; w < 112; w++) g += '<i style="--i:' + w + '"></i>'; return '<div class="wall" id="wall"><div class="wall-grid" aria-hidden="true">' + g + '</div><div class="wall-out" id="wallOut"></div><p class="wall-cap" id="wallCap">Reading 112 pages…</p></div>'; }
    if (kind === "outputs") return '<div class="mini"><div class="mini-row"><span>Output</span><span>Detail</span><span>Status</span></div><div class="mini-row"><span>PDF brief</span><span>8 pages</span><span class="stat-ok">ready</span></div><div class="mini-row"><span>Podcast episode</span><span>6:01</span><span class="stat-ok">ready</span></div><div class="mini-row"><span>Summary email</span><span>Mon 09:14</span><span class="stat-run">sending</span></div></div>';
    return '<div class="mini"><div class="mini-row"><span>Portal section</span><span>What\'s new</span><span></span></div><div class="mini-row"><span>Updates</span><span>3 items, 2 deadlines</span><span class="stat-ok">live</span></div><div class="mini-row"><span>Briefings</span><span>week 10 added</span><span class="stat-ok">live</span></div><div class="mini-row"><span>Research &amp; Ask</span><span>15 items indexed</span><span class="stat-ok">live</span></div></div>';
  }
  var flow = $("#flow"), flowList = $("#flowList"), flowPanel = $("#flowPanel"), stepIdx = 0, stepTimer = 0, stepHover = false, DUR = 5200;
  var stepBtns = STEPS.map(function (s, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "flow-step"; b.setAttribute("role", "tab"); b.id = "fs-" + i; b.setAttribute("aria-controls", "flowPanel");
    b.innerHTML = '<span class="n">0' + (i + 1) + '</span><span class="fs-t"><b>' + esc(s.t) + "</b>" + whoTag(s) + '</span><span class="bar"></span>';
    b.addEventListener("click", function () { setStep(i, true); schedule(); });
    b.addEventListener("keydown", function (e) {
      var j = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % STEPS.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i + STEPS.length - 1) % STEPS.length;
      if (j !== null) { e.preventDefault(); stepBtns[j].focus(); setStep(j, true); schedule(); }
    });
    flowList.appendChild(b);
    return b;
  });
  var wallTimers = [];
  function playWall() {
    wallTimers.forEach(clearTimeout); wallTimers = [];
    var wall = $("#wall"); if (!wall) return;
    var d = V[cur], KEEP = [3, 9, 14, 22, 27, 35, 41, 48, 56, 63, 70, 77, 85, 94, 105], TOP = [22, 56, 85];
    var cells = $$(".wall-grid i", wall), out = $("#wallOut"), cap = $("#wallCap");
    KEEP.forEach(function (n) { cells[n].classList.add("keep"); });
    TOP.forEach(function (n) { cells[n].classList.add("top"); });
    function phase2() { if (!wall.isConnected) return; wall.classList.add("dim"); cap.innerHTML = "112 read → <b>15 kept</b> for the brief" + citeHtml(6); wireCites(cap); }
    function phase3() {
      if (!wall.isConnected) return;
      wall.classList.add("out");
      out.innerHTML = d.items.slice(0, 3).map(function (it, k) { return '<span style="animation-delay:' + (k * 120) + 'ms">' + esc(it.head) + "</span>"; }).join("");
      cap.innerHTML = "112 read → 15 kept → <b>3 in the Monday email</b>" + citeHtml(6); wireCites(cap);
    }
    if (RM) { phase2(); phase3(); return; }
    wallTimers.push(setTimeout(phase2, 1500), setTimeout(phase3, 2700));
  }
  function setStep(i, animate) {
    stepIdx = i;
    stepBtns.forEach(function (b, j) { var on = j === i; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
    var s = STEPS[i];
    flowPanel.setAttribute("aria-labelledby", "fs-" + i);
    flowPanel.innerHTML = '<div class="fade"><span class="fp-n">Step ' + (i + 1) + " of " + STEPS.length + " · " + whoTag(s) + '</span><h3 class="fp-t">' + esc(s.t) + '</h3><p class="fp-p">' + esc(s.p) + '</p><div class="fp-chips">' + s.chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + '</div><div class="fp-vis">' + visHtml(s.vis) + "</div></div>";
    if (s.vis === "funnel") playWall();
    if (flow.classList.contains("auto")) {
      var bar = $(".bar", stepBtns[i]);
      if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
    }
  }
  function schedule() {
    clearTimeout(stepTimer);
    if (RM || NO_HOVER || !flow.classList.contains("auto") || stepHover) return;
    stepTimer = setTimeout(function () { setStep((stepIdx + 1) % STEPS.length, true); schedule(); }, DUR);
  }
  flow.style.setProperty("--dur", DUR + "ms");
  setStep(0, false);
  if (!RM && !NO_HOVER) {
    onView(flow, function () { flow.classList.add("auto"); setStep(0, true); schedule(); }, "0px 0px -20% 0px");
    flow.addEventListener("mouseenter", function () { stepHover = true; clearTimeout(stepTimer); flow.classList.remove("auto"); });
    flow.addEventListener("mouseleave", function () { stepHover = false; flow.classList.add("auto"); setStep(stepIdx, true); schedule(); });
  }

  /* ---------- console ---------- */
  var CON = {
    runs: ["Every Monday at a glance", "See which clients' briefs have landed and which are still running, open the step-by-step record for any client, and re-run a step or resend a brief with one click.",
      '<div class="mini"><div class="mini-row"><span>Client</span><span>Stage</span><span>Status</span></div><div class="mini-row"><span>Brightline Freight Co.</span><span>Delivered 09:14</span><span class="stat-ok">done</span></div><div class="mini-row"><span>Oakview Dental Group</span><span>Delivered 09:12</span><span class="stat-ok">done</span></div><div class="mini-row"><span>Bayline Industrial</span><span>Recording podcast</span><span class="stat-run">running</span></div><div class="mini-row"><span>The Okafor Family</span><span>Queued, batch 2</span><span class="stat-wait">waiting</span></div></div>'],
    clients: ["Every client and every brief", "Open any client's portal exactly as they see it, copy their personal link, send their weekly update, and find any past brief or PDF in seconds.",
      '<div class="mini"><div class="mini-row"><span>Client</span><span>Briefs</span><span>Latest</span></div><div class="mini-row"><span>Brightline Freight Co.</span><span>10 weeks</span><span class="stat-wait">62 · elevated</span></div><div class="mini-row"><span>Oakview Dental Group</span><span>10 weeks</span><span class="stat-wait">48 · active</span></div><div class="mini-row"><span>Bayline Industrial</span><span>10 weeks</span><span class="stat-wait">57 · active</span></div><div class="mini-row"><span>The Okafor Family</span><span>10 weeks</span><span class="stat-wait">41 · active</span></div></div>'],
    practice: ["Patterns across all clients", "Which themes are heating up across the whole book, which deadlines are open for several clients at once, and which names keep coming up. Useful for newsletters, events and business development.",
      '<div class="heat" aria-label="Theme heat, last 8 weeks"><span class="lab">Transport rules</span>' + [0.2, 0.3, 0.2, 0.4, 0.3, 0.5, 0.6, 1].map(function (o) { return '<span class="c" style="opacity:' + o + '"></span>'; }).join("") + '<span class="lab">Contractor status</span>' + [0.15, 0.15, 0.3, 0.15, 0.3, 0.3, 0.45, 0.6].map(function (o) { return '<span class="c" style="opacity:' + o + '"></span>'; }).join("") + '<span class="lab">Planning &amp; zoning</span>' + [0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.3, 0.9].map(function (o) { return '<span class="c" style="opacity:' + o + '"></span>'; }).join("") + '<span class="lab">Payroll rules</span>' + [0.15, 0.15, 0.3, 0.15, 0.3, 0.45, 0.45, 0.7].map(function (o) { return '<span class="c" style="opacity:' + o + '"></span>'; }).join("") + "</div>"],
    intake: ["Where sign-ups drop off", "See how many people start the questionnaire, where they stop, and which step to simplify, so more prospects become subscribers.",
      '<div class="funnel-mini"><div class="fm-row"><span>Started</span><i style="width:100%"></i><span>100%</span></div><div class="fm-row"><span>Organization</span><i style="width:84%"></i><span>84%</span></div><div class="fm-row"><span>Themes</span><i style="width:66%"></i><span>66%</span></div><div class="fm-row"><span>Focus</span><i style="width:61%"></i><span>61%</span></div><div class="fm-row"><span>Submitted</span><i style="width:55%"></i><span>55%</span></div></div><p class="fine" style="margin-top:8px">Illustrative figures.</p>']
  };
  var conPanel = $("#conPanel");
  function setCon(k, animate) {
    $$(".con-tab").forEach(function (b) { var on = b.getAttribute("data-c") === k; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
    conPanel.setAttribute("aria-labelledby", "ct-" + k);
    conPanel.innerHTML = '<div class="' + (animate ? "fade" : "") + '"><h3>' + esc(CON[k][0]) + "</h3><p>" + esc(CON[k][1]) + '</p></div><div class="' + (animate ? "fade" : "") + '">' + CON[k][2] + "</div>";
  }
  $$(".con-tab").forEach(function (b, i, all) {
    b.addEventListener("click", function () { setCon(b.getAttribute("data-c"), true); });
    b.addEventListener("keydown", function (e) {
      var j = null;
      if (e.key === "ArrowRight") j = (i + 1) % all.length;
      if (e.key === "ArrowLeft") j = (i + all.length - 1) % all.length;
      if (j !== null) { e.preventDefault(); all[j].focus(); setCon(all[j].getAttribute("data-c"), true); }
    });
  });
  setCon("runs", false);

  /* ---------- sticky header: the next Monday ---------- */
  var head = $("#siteHead"), nbWeek = $("#nbWeek"), nbWhen = $("#nbWhen"), nbIn = $("#nbIn"), nbShort = $("#nbShort");
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  nbWeek.innerHTML = DAYS.map(function (d, i) { return '<i data-d="' + i + '"></i>'; }).join("");
  var weekDots = $$("i", nbWeek);
  function nextMonday(now) {
    var d = new Date(now.getTime()); d.setHours(9, 0, 0, 0);
    d.setDate(d.getDate() + (7 - (d.getDay() + 6) % 7) % 7);
    if (d <= now) d.setDate(d.getDate() + 7);
    return d;
  }
  function tickHead() {
    var now = new Date(), dow = (now.getDay() + 6) % 7, mins = now.getHours() * 60 + now.getMinutes();
    weekDots.forEach(function (el, i) { el.className = i < dow ? "past" : i === dow ? "today" : ""; });
    var landing = dow === 0 && mins >= 540 && mins < 560;
    head.classList.toggle("landing", landing);
    if (landing) { nbWhen.textContent = "this morning"; nbIn.textContent = "· landing now"; nbShort.textContent = "Landing now"; return; }
    var nm = nextMonday(now), diff = nm - now;
    var dd = Math.floor(diff / 86400000), hh = Math.floor(diff / 3600000) % 24, mm = Math.floor(diff / 60000) % 60;
    var inTxt = dd ? dd + "d " + hh + "h" : hh ? hh + "h " + mm + "m" : Math.max(1, mm) + "m";
    nbWhen.textContent = "Mon " + nm.getDate() + " " + nm.toLocaleString("en-US", { month: "short" }) + ", 09:00";
    nbIn.textContent = "· in " + inTxt;
    nbShort.textContent = "Mon 09:00 · " + inTxt;
  }
  var nbWeek2 = $("#nbWeek2"), nbWhen2 = $("#nbWhen2"), nbIn2 = $("#nbIn2");
  nbWeek2.innerHTML = nbWeek.innerHTML;
  var weekDots2 = $$("i", nbWeek2);
  function tick() {
    tickHead();
    nbWhen2.textContent = nbWhen.textContent; nbIn2.textContent = nbIn.textContent;
    weekDots2.forEach(function (el, i) { el.className = weekDots[i].className; });
  }
  tick(); setInterval(tick, 30000);
  var menuBtn = $("#menuBtn"), menuPanel = $("#menuPanel");
  function setMenu(open) {
    menuPanel.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    head.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", function () { setMenu(menuPanel.hidden); });
  $$("a", menuPanel).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menuPanel.hidden) { setMenu(false); menuBtn.focus(); } });
  document.addEventListener("click", function (e) { if (!menuPanel.hidden && !head.contains(e.target)) setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1120 && !menuPanel.hidden) setMenu(false); });
  function headScroll() { head.classList.toggle("scrolled", (window.scrollY || document.documentElement.scrollTop) > 8); }
  window.addEventListener("scroll", headScroll, { passive: true }); headScroll();

  /* ---------- typed byline ---------- */
  var bylineEl = $("#bylineTxt"), BY = "Written by: nobody on your team.";
  onView($("#byline"), function () {
    if (RM) { bylineEl.textContent = BY; return; }
    var k = 0, t = setInterval(function () { k++; bylineEl.textContent = BY.slice(0, k); if (k >= BY.length) clearInterval(t); }, 48);
  }, "0px 0px -10% 0px");

  /* ---------- boot ---------- */
  setVertical(cur, false);
  moveInd();
  window.addEventListener("hashchange", function () { var h = location.hash.replace("#", ""); if (V[h]) { setVertical(h, true); } });
})();

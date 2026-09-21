import { business } from "./site";

export type Trade = "electrical" | "plumbing" | "both";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Short name for lists, navigation and the quote form */
  name: string;
  /** Page <h1> */
  h1: string;
  /** <title> before the site suffix is added */
  metaTitle: string;
  metaDescription: string;
  trade: Trade;
  /** One sentence used in lists and structured data */
  summary: string;
  intro: string;
  /** What the service includes. Carried over from the original site copy. */
  included: string[];
  callWhen: string[];
  /** Practical safety steps shown on the page (emergency only) */
  whileYouWait?: { title: string; steps: string[] };
  faqs: Faq[];
  related: string[];
  testimonialId?: string;
  /** Value stored in the quote form's service select */
  formValue: string;
}

export const services: Service[] = [
  {
    slug: "emergency-electrician-plumber",
    name: "24/7 emergency service",
    h1: "24/7 emergency electrician and plumber in Mannarkkad",
    metaTitle: "24/7 Emergency Electrician & Plumber, Mannarkkad",
    metaDescription:
      "Emergency electrical and plumbing help in Mannarkkad, Kerala, 24 hours a day. Fully equipped vehicles and transparent pricing. Call +91 91881 26866.",
    trade: "both",
    summary:
      "Round-the-clock support for urgent electrical and plumbing needs, with rapid response.",
    intro:
      "Power failures, burst pipes and burning smells do not wait for office hours, so we do not either. Call at any time and a BrightWay technician will be sent to your property in Mannarkkad or nearby.",
    included: [
      "Available 24/7, 365 days a year",
      "Average response time under 60 minutes",
      "Fully equipped service vehicles",
      "Transparent pricing with no overtime fees",
    ],
    callWhen: [
      "You smell burning, see sparks, or a socket or switchboard is hot",
      "Part or all of the property has lost power and the breaker will not reset",
      "A pipe has burst or water is flooding a room",
      "A leak, overflow or blockage is getting worse and you cannot stop it",
    ],
    whileYouWait: {
      title: "While you wait for us",
      steps: [
        "Electrical fault: switch off at the main switch if you can reach it safely. Do not touch electrics near standing water.",
        "Water leak: turn off the main water valve and switch off the water heater.",
        "Keep children and pets away from the affected area.",
      ],
    },
    faqs: [
      {
        q: "Are you really available at night and on holidays?",
        a: "Yes. Emergency callouts are available 24 hours a day, 365 days a year. Call " +
          business.phone.display +
          " at any time.",
      },
      {
        q: "How quickly will someone arrive?",
        a: "Our average emergency response time is under 60 minutes. Your exact wait depends on where you are and the conditions on the day, and we will tell you when you call.",
      },
      {
        q: "Do you charge extra for night or weekend emergency work?",
        a: "No. Our pricing is transparent and we do not charge overtime fees.",
      },
    ],
    related: ["electrical-services", "plumbing-services", "safety-audits-inspections"],
    testimonialId: "afsal",
    formValue: "emergency",
  },
  {
    slug: "electrical-services",
    name: "Smart electrical solutions",
    h1: "Electrical services in Mannarkkad",
    metaTitle: "Electrician in Mannarkkad, Kerala",
    metaDescription:
      "Licensed electricians in Mannarkkad for wiring, circuit protection, energy monitoring and smart-ready systems. Free quotes. Call +91 91881 26866.",
    trade: "electrical",
    summary:
      "Intelligent electrical systems with IoT integration and energy efficiency features.",
    intro:
      "BrightWay electricians install, upgrade and repair electrical systems in homes, offices and commercial premises around Mannarkkad and Palakkad. We build in energy monitoring and modern circuit protection, so faults show up early instead of as an outage.",
    included: [
      "Smart home automation integration",
      "Energy usage monitoring and optimization",
      "Advanced circuit protection systems",
      "Renewable energy compatibility",
    ],
    callWhen: [
      "Breakers keep tripping or fuses keep blowing",
      "Lights flicker or dim when appliances switch on",
      "You are renovating or fitting out an office and need new circuits",
      "You want to see where your electricity goes and bring the bill down",
      "You are adding solar or another renewable supply and need compatible wiring",
    ],
    faqs: [
      {
        q: "Do you work on offices as well as homes?",
        a: "Yes. We work on houses, apartments, offices and other commercial premises. Tell us the type of property and the work you need when you call.",
      },
      {
        q: "Can you add energy monitoring to wiring that is already installed?",
        a: "We inspect your existing distribution board and circuits first, then recommend the monitoring that fits. The inspection tells us what is possible before you commit to anything.",
      },
      {
        q: "Is the quote free?",
        a: "Yes. Quotes are free. Call, message us on WhatsApp or use the form on our contact page.",
      },
    ],
    related: ["smart-home-integration", "safety-audits-inspections", "preventive-maintenance"],
    testimonialId: "swalih-zayn",
    formValue: "electrical",
  },
  {
    slug: "plumbing-services",
    name: "Precision plumbing systems",
    h1: "Plumbing services in Mannarkkad",
    metaTitle: "Plumber in Mannarkkad, Kerala",
    metaDescription:
      "Plumbers in Mannarkkad for leak detection, water monitoring, fixtures and efficient water heating. Free quotes. Call +91 91881 26866.",
    trade: "plumbing",
    summary:
      "Advanced plumbing technologies with leak detection and water conservation features.",
    intro:
      "From a dripping tap to a full water system for a resort, BrightWay plumbers find the cause, fix it and set the system up so the problem stays fixed. We focus on leak detection and water saving as well as repairs.",
    included: [
      "Smart leak detection and prevention",
      "Water quality monitoring systems",
      "Eco-friendly fixture installation",
      "High-efficiency water heating",
    ],
    callWhen: [
      "You have damp patches, dripping pipes or an unexplained rise in your water bill",
      "Water pressure has dropped",
      "Your water heater is slow, noisy or using too much power",
      "You are fitting a new bathroom or kitchen and want the plumbing done properly",
      "You run a property with high water use and want to cut waste",
    ],
    faqs: [
      {
        q: "What should I do while I wait for a plumber?",
        a: "Turn off the water at the main valve if you can reach it safely, and switch off the water heater. Keep electrical items away from standing water.",
      },
      {
        q: "Can you help lower my water bill?",
        a: "Leak detection, water monitoring and eco-friendly fixtures are all part of our plumbing service. A resort client told us the monitoring system we installed helped cut their water bills and avoid major repairs.",
      },
      {
        q: "Do you install water heaters?",
        a: "Yes. High-efficiency water heating is part of our plumbing work. Tell us your property and hot-water needs and we will recommend a suitable setup.",
      },
    ],
    related: ["emergency-electrician-plumber", "smart-home-integration", "preventive-maintenance"],
    testimonialId: "rinshad",
    formValue: "plumbing",
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive maintenance",
    h1: "Preventive maintenance for electrical and plumbing systems",
    metaTitle: "Electrical & Plumbing Maintenance, Mannarkkad",
    metaDescription:
      "Scheduled electrical and plumbing maintenance in Mannarkkad with digital reports and priority service calls. Prevent costly repairs. Call +91 91881 26866.",
    trade: "both",
    summary:
      "Proactive maintenance plans that prevent costly issues and extend system life.",
    intro:
      "Most electrical and plumbing emergencies start as small faults that nobody was watching. A BrightWay maintenance plan puts regular inspections in the diary and gives you a written record of what we found and what we recommend.",
    included: [
      "Scheduled inspection and maintenance",
      "Detailed digital reports and recommendations",
      "Priority scheduling for service calls",
      "Extended warranty on maintained systems",
    ],
    callWhen: [
      "You run an office, resort or shop where downtime costs money",
      "The same small fault keeps coming back",
      "Your wiring or pipework is getting old and you want to know its condition",
      "You want everything checked before the monsoon",
    ],
    faqs: [
      {
        q: "What do I get after an inspection?",
        a: "A detailed digital report with what we found and what we recommend, so you can decide what to fix and when.",
      },
      {
        q: "Do maintenance customers get faster service?",
        a: "Yes. Priority scheduling for service calls is part of our maintenance plans.",
      },
      {
        q: "Does maintenance cover both electrical and plumbing?",
        a: "Yes. We maintain both, so one team looks after the wiring and the pipes.",
      },
    ],
    related: ["safety-audits-inspections", "electrical-services", "plumbing-services"],
    testimonialId: "swalih-zayn",
    formValue: "maintenance",
  },
  {
    slug: "safety-audits-inspections",
    name: "Safety audits and inspections",
    h1: "Electrical and plumbing safety inspections in Mannarkkad",
    metaTitle: "Electrical & Plumbing Inspections, Mannarkkad",
    metaDescription:
      "Electrical safety inspections, plumbing pressure tests and code compliance checks in Mannarkkad, with a clear improvement plan. Call +91 91881 26866.",
    trade: "both",
    summary:
      "Comprehensive safety assessments to make sure your home systems meet the required standards.",
    intro:
      "If you are buying, renting, handing over or renovating a property, a safety inspection tells you the true condition of the wiring and pipework before it becomes a problem. You get a plan you can act on, in order of importance.",
    included: [
      "Complete electrical safety inspections",
      "Plumbing system pressure testing",
      "Code compliance verification",
      "Detailed safety improvement plans",
    ],
    callWhen: [
      "You are buying, selling, renting out or handing over a property",
      "You have finished a renovation and want the work checked",
      "The building has old wiring or old pipework",
      "You need to confirm compliance for your property",
    ],
    faqs: [
      {
        q: "What does an electrical safety inspection cover?",
        a: "We carry out a complete inspection of the electrical system, verify code compliance and give you a detailed improvement plan.",
      },
      {
        q: "Do you test plumbing as well?",
        a: "Yes. We pressure-test the plumbing system as part of the audit.",
      },
      {
        q: "Will I get anything in writing?",
        a: "Yes. You receive a detailed safety improvement plan covering what needs attention.",
      },
    ],
    related: ["preventive-maintenance", "electrical-services", "plumbing-services"],
    formValue: "inspection",
  },
  {
    slug: "smart-home-integration",
    name: "Smart home integration",
    h1: "Smart home integration in Mannarkkad",
    metaTitle: "Smart Home Integration in Mannarkkad, Kerala",
    metaDescription:
      "Connect your electrical and plumbing systems to a smart home in Mannarkkad: voice control, remote monitoring and custom automation. Call +91 91881 26866.",
    trade: "both",
    summary:
      "Seamlessly integrate your electrical and plumbing systems into your smart home.",
    intro:
      "Because we install both the wiring and the plumbing, we can connect them to your smart home in one job: lights, power monitoring, leak sensors and more, controlled from your phone or your voice.",
    included: [
      "Voice-controlled system management",
      "Mobile app for remote monitoring",
      "Integration with existing smart devices",
      "Custom automation scenarios",
    ],
    callWhen: [
      "You are planning a new home and want the wiring ready for automation",
      "You want to monitor power or water use from your phone",
      "You already own smart devices and want them working together",
      "You manage a property remotely and want to see problems early",
    ],
    faqs: [
      {
        q: "Can you connect the smart devices I already own?",
        a: "Integration with existing smart devices is part of the service. Tell us what you have and we will check how it fits together.",
      },
      {
        q: "Can I control everything by voice?",
        a: "Voice-controlled system management is included, and you can also monitor your systems remotely from a mobile app.",
      },
      {
        q: "Does smart home work include plumbing?",
        a: "Yes. We connect both electrical and plumbing systems, for example leak detection alongside power monitoring.",
      },
    ],
    related: ["electrical-services", "plumbing-services", "preventive-maintenance"],
    testimonialId: "afsal",
    formValue: "smarthome",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Options for the quote form: derived from the services, plus Other. */
export const formServiceOptions = [
  ...services.map((s) => ({ value: s.formValue, label: s.name })),
  { value: "other", label: "Something else" },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Role and organisation, or place, in plain words */
  detail: string;
  image: string;
  /** CSS object-position of the face in the source photo, used to crop tightly */
  face: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "afsal",
    quote:
      "BrightWay's team responded quickly when we had an electrical issue at home. The technician was friendly and knew exactly what to do. They also suggested smart home upgrades that made our daily life much easier.",
    name: "Afsal",
    detail: "CEO and founder, Info Tech",
    image: "/users/image2.webp",
    face: "47% 26%",
  },
  {
    id: "swalih-zayn",
    quote:
      "We hired BrightWay to upgrade our office's electrical setup. Their work was smooth and didn't interrupt our team at all. The smart monitoring system they installed helps us avoid any problems before they start.",
    name: "Swalih Zayn",
    detail: "Real estate, Palakkad, Kerala",
    image: "/users/image3.webp",
    face: "51% 24%",
  },
  {
    id: "rinshad",
    quote:
      "BrightWay installed a water monitoring system for our resort. It helped us cut down water bills and avoid major repairs. Their service has been a big plus for our operations.",
    name: "Rinshad",
    detail: "Manager, Hill Top Resort",
    image: "/users/image1.webp",
    face: "47% 29%",
  },
];

export const getTestimonial = (id?: string) =>
  testimonials.find((t) => t.id === id);

/** Trust points carried over from the original site. */
export const trustPoints = [
  { title: "Licensed and insured", text: "Full protection on every job" },
  { title: "Certified technicians", text: "Trained, licensed professionals" },
  { title: "24/7 emergency service", text: "Every day of the year" },
  { title: "Free quotes", text: "Know the cost before work starts" },
];

/** Home page FAQs. Written so each answer stands alone when quoted by a search or AI summary. */
export const homeFaqs: Faq[] = [
  {
    q: "What areas do you serve?",
    a: "We are based at Changaleeri, Mannarkkad, and have worked with clients in Palakkad. Call or message us with your location and we will confirm whether we can attend.",
  },
  {
    q: "Do you offer 24/7 emergency electrical and plumbing service?",
    a: `Yes. Emergency callouts are available ${business.emergencyHours}. Call ${business.phone.display}. Our regular hours are Monday to Friday 9am to 6pm and Saturday 9am to 4pm.`,
  },
  {
    q: "How quickly can you get to me in an emergency?",
    a: "Our average emergency response time is under 60 minutes, depending on your location and conditions.",
  },
  {
    q: "Do you charge overtime for emergency callouts?",
    a: "No. Our pricing is transparent and we do not charge overtime fees.",
  },
  {
    q: "How do I get a quote?",
    a: `Quotes are free. Call ${business.phone.display}, message us on WhatsApp, email ${business.email} or use the form on the contact page.`,
  },
  {
    q: "Are your technicians licensed and insured?",
    a: "Yes. BrightWay is licensed and insured, and all our technicians are certified professionals.",
  },
  {
    q: "Do you work on offices and resorts as well as homes?",
    a: "Yes. We work on homes, offices and hospitality properties such as resorts. Our work includes electrical upgrades, smart monitoring and water systems.",
  },
];

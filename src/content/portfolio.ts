/**
 * All site copy, metrics and destinations live here.
 * Facts come from the resume and the owner's own answers; nothing is invented.
 * Hero stage labels are a navigation metaphor for separate work and projects,
 * not one shared production architecture.
 */

export type LinkKey =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'resume'
  | 'aiBestieCode'
  | 'vaidyaAssistFrontend'
  | 'vaidyaAssistBackend';

/**
 * Owner-filled destinations. Leave a value as its `[PLACEHOLDER]` (or empty) when it is not
 * available yet: ConfiguredLink never renders a placeholder as a live href.
 */
export const links: Record<LinkKey, string> = {
  email: 'pragnesh8122000@gmail.com',
  github: 'https://github.com/Pragnesh8122000',
  linkedin: 'https://www.linkedin.com/in/pragneshprajapati08',
  resume: '/resume.pdf',
  aiBestieCode: 'https://github.com/Pragnesh8122000/ai_bestie',
  vaidyaAssistFrontend: 'https://github.com/Pragnesh8122000/vaidya-assist-fe',
  vaidyaAssistBackend: 'https://github.com/Pragnesh8122000/vaidya-assist-be'
};

export type StageId = 'projects' | 'gateway' | 'events' | 'data' | 'delivery' | 'observe';

export interface Stage {
  number: string;
  title: string;
  target: StageId;
  chips: [string, string, string];
}

/** Hero pile: an illustrative request flow. */
export const stages: Stage[] = [
  { number: '01', title: 'Client / request', target: 'projects', chips: ['HTTP', 'JWT', 'Request'] },
  { number: '02', title: 'Gateway / API', target: 'gateway', chips: ['Node.js', 'Express', '10+ services'] },
  { number: '03', title: 'Events / workers', target: 'events', chips: ['Kafka', 'Consume', 'Process'] },
  { number: '04', title: 'Cache / data', target: 'data', chips: ['Redis', 'PostgreSQL', 'MongoDB'] },
  { number: '05', title: 'Delivery', target: 'delivery', chips: ['ECS', 'Docker', 'CI/CD'] },
  { number: '06', title: 'Observe', target: 'observe', chips: ['Logs', 'Alerts', 'Health'] }
];

export interface IndexItem {
  number: string;
  label: string;
  target: StageId;
}

/** Sticky index: concrete labels in page order. */
export const indexItems: IndexItem[] = [
  { number: '01', label: 'Gateway', target: 'gateway' },
  { number: '02', label: 'Kafka', target: 'events' },
  { number: '03', label: 'Caching', target: 'data' },
  { number: '04', label: 'Monitoring', target: 'observe' },
  { number: '05', label: 'Migration', target: 'delivery' },
  { number: '06', label: 'Projects', target: 'projects' }
];

export const site = {
  name: 'Pragnesh Prajapati',
  role: 'Backend engineer',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ],
  resumeLabel: 'Resume'
};

export const hero = {
  eyebrow: 'BACKEND ENGINEER / NODE.JS + TYPESCRIPT',
  headline: { primary: 'Behind the API.', accent: ['Through the', 'whole flow.'] },
  paragraph:
    'Backend engineer with 3.5+ years of building API gateways, event pipelines, caching layers and AWS deployments in Node.js and TypeScript.',
  primaryAction: { label: 'Explore my work', href: '#work' },
  secondaryAction: { label: 'View resume', link: 'resume' as LinkKey },
  identity: 'Pragnesh Prajapati',
  identityRole: 'SDE 1 at Justdial',
  openTo: { label: 'Open to backend roles', href: '#contact' },
  proof: [
    { value: '10+', label: 'services on my gateway · Justdial' },
    { value: '120K+', label: 'leads a day through my Kafka pipeline · Justdial' },
    { value: 'Zero', label: 'downtime across releases · Mypcot' }
  ],
  caption: 'Illustrative flow. Explore the work below.'
};

export const flowIndex = {
  description: 'These links jump to separate examples from my work and projects.'
};

export interface Metric {
  value: string;
  label: string;
  /** How the number was measured. */
  note?: string;
}

export interface Detail {
  label: string;
  text: string;
}

/** A simplified, real data flow: steps in order, then the systems it fans out to. */
export interface Diagram {
  label: string;
  steps: string[];
  targets: string[];
  /** Boxes the targets in a labelled group, e.g. the platform they run on. */
  group?: string;
  /** Messaging layer shared by the grouped targets. */
  bus?: string;
  /** Short label on the arrow from the steps to the targets. */
  via?: string;
}

/** Shown under every diagram: these are illustrations, not production architecture. */
export const diagramCaption = 'Simplified illustration, not the full production setup.';

/**
 * A fact only the owner can supply. `text` is published; when it is missing, `todo` says what
 * to add and shows in development only (the same rule ConfiguredLink uses for missing links).
 */
export interface OwnerFact {
  label: string;
  text?: string;
  todo?: string;
}

export interface Feature {
  id: string;
  header: string;
  title: string;
  body: string;
  metric?: Metric;
  details?: Detail[];
  diagram?: Diagram;
  /** Id of the case study that tells this story in full. */
  caseStudy?: string;
}

export const justdial = {
  id: 'work',
  badge: 'WORK',
  title: 'Justdial Ltd. · SDE 1',
  subtitle: 'Follow the backend: the gateway, event pipeline, caching and monitoring I built.',
  meta: 'JAN 2026 TO PRESENT',
  features: [
    {
      id: 'gateway',
      header: '01 / API GATEWAY',
      title: 'One gateway, used by 10+ services.',
      body: "I built Justdial's centralized API gateway in Node.js and Express. Backend services across different environments route their requests through it.",
      metric: { value: '10+', label: 'Services using it' }
    },
    {
      id: 'events',
      header: '02 / KAFKA LEAD PIPELINE',
      title: '120K+ leads, delivered every day.',
      body: "Justdial's database team publishes new lead data to Kafka. I built the consumer pipeline that picks up that stream, processes it and passes each lead on to the communication, appointment and database services.",
      metric: { value: '120-130K', label: 'Leads per day, around 10K per city' },
      diagram: {
        label: 'Kafka lead pipeline',
        steps: ['DB team publishes leads', 'Kafka', 'My consumer pipeline'],
        targets: ['Communication service', 'Appointment service', 'DB service']
      },
      caseStudy: 'case-kafka'
    },
    {
      id: 'data',
      header: '03 / CACHING AND LOAD BALANCING',
      title: '35% lower API response time at peak.',
      body: "I implemented Redis caching and load balancing for Justdial's IRO management platform, speeding up its API responses under peak load.",
      metric: { value: '-35%', label: 'API response time at peak load', note: 'Measured from service logs' }
    },
    {
      id: 'observe',
      header: '04 / LOGS AND MONITORING',
      title: '~40% lower MTTD.',
      body: 'I automated error-log monitoring with Slack alerts across 7 servers, reducing manual log checking and shortening the average time to detect a production error (MTTD).',
      metric: { value: '~40%', label: 'Lower mean time to detect (MTTD)', note: 'Approximate' }
    },
    {
      id: 'webrtc',
      header: '05 / WEBRTC CALLING',
      title: 'In-app calling, owned end to end.',
      body: 'I designed and integrated a WebRTC-based calling service with a third-party provider, and owned the backend integration end to end.',
      diagram: {
        label: 'WebRTC calling integration',
        steps: ['Calling service', 'Backend integration'],
        targets: ['Third-party provider']
      }
    }
  ] satisfies Feature[]
};

export const delivery = {
  id: 'delivery',
  badge: 'WORK',
  title: 'Mypcot Infotech · Software Engineer',
  subtitle: 'Ship the system: a microservices migration, faster releases and APIs at scale.',
  meta: 'MAY 2024 TO DEC 2025',
  migration: {
    id: 'migration',
    header: 'MONOLITH TO MICROSERVICES',
    title: 'One monolith, split into 4 services.',
    body: 'I led the migration of a monolithic application to microservices on AWS ECS, working in a four-person team, with SQS and SNS carrying messages between the services.',
    metric: { value: '4', label: 'Independent services' },
    details: [
      { label: 'Team', text: 'Four engineers; I led the migration.' },
      { label: 'Result', text: 'Independent deployments and better service isolation.' }
    ],
    diagram: {
      label: 'Monolith to microservices on AWS ECS',
      steps: ['Monolith'],
      via: 'split into',
      group: 'AWS ECS · 4 services',
      targets: ['API gateway', 'User service', 'Payment service', 'Notification service'],
      bus: 'SQS / SNS messages'
    },
    caseStudy: 'case-migration'
  } satisfies Feature,
  alsoShipped: [
    {
      value: 'Zero',
      heading: 'Zero-downtime releases',
      text: 'Set up an Application Load Balancer, Auto Scaling Groups and AWS CodeDeploy for every production release.'
    },
    {
      value: '80%',
      heading: 'Deployment time reduced by 80%',
      text: 'Built CI/CD pipelines with GitHub Actions, Docker and automated testing.'
    },
    {
      value: '10K RPS',
      heading: 'REST and GraphQL APIs',
      text: 'Built APIs in Node.js and Express with rate limiting, retries and caching, load-tested with JMeter. Redis caching on frequently used APIs cut redundant backend calls by 60%.'
    }
  ],
  dispatch: {
    id: 'dispatch',
    header: 'REAL-TIME EMERGENCY DISPATCH',
    title: 'Real-time emergency alerts, 40% lower latency.',
    body: "When a user raises an emergency, their family members and the emergency team are alerted in real time, with the user's location on a map.",
    metric: { value: '-40%', label: 'API latency' },
    details: [
      { label: 'Built with', text: 'MongoDB geospatial queries (current location and direction for the map), WebSockets and Redis.' },
      { label: 'Proof', text: 'Validated under load with JMeter.' }
    ],
    diagram: {
      label: 'Emergency dispatch flow',
      steps: ['User raises emergency', 'Dispatch backend'],
      targets: ['Family members', 'Emergency team']
    }
  } satisfies Feature
};

export interface CaseStudy {
  id: string;
  header: string;
  title: string;
  /** Problem, ownership, tradeoff and result; the diagram sits between ownership and tradeoff. */
  parts: OwnerFact[];
  diagram: Diagram;
}

export const caseStudies = {
  id: 'case-studies',
  badge: 'CASE STUDIES',
  title: 'Two case studies',
  subtitle: 'The problem, my part, the design, one tradeoff and the result.',
  items: [
    {
      id: 'case-kafka',
      header: 'JUSTDIAL / KAFKA LEAD PIPELINE',
      title: 'Moving 120K+ leads a day off Kafka.',
      parts: [
        { label: 'Problem', todo: 'What was slow or broken before the consumer pipeline existed?' },
        {
          label: 'My part',
          text: "Justdial's database team publishes new lead data to Kafka. I built the consumer pipeline that processes it and passes each lead on.",
          todo: 'Who else worked on it, and which parts did you design yourself?'
        },
        { label: 'Tradeoff', todo: 'One design tradeoff, e.g. delivery guarantees, batch size vs latency, retries.' },
        {
          label: 'Result',
          text: 'Around 120K to 130K leads a day, about 10K per city. Consumer lag builds while a batch of records is processed and drains back to zero once they are all processed.'
        }
      ],
      diagram: {
        label: 'Kafka lead pipeline',
        steps: ['DB team publishes leads', 'Kafka', 'My consumer pipeline'],
        targets: ['Communication service', 'Appointment service', 'DB service']
      }
    },
    {
      id: 'case-migration',
      header: 'MYPCOT / MONOLITH TO MICROSERVICES',
      title: 'Splitting a growing monolith into 4 services.',
      parts: [
        {
          label: 'Problem',
          text: 'The client asked for the split. As the project grew, the monolith became hard to maintain, and a failure in one part could not be allowed to break the whole system.'
        },
        {
          label: 'My part',
          text: 'I worked with a third-party consultant to design the target architecture from the start, and led a four-person team through the migration. We built it around a shared database and the saga pattern.',
          todo: 'Confirm the messaging layer: the resume says SQS/SNS, your note says a Kafka pipeline.'
        },
        { label: 'Tradeoff', todo: 'One tradeoff, e.g. why a shared database instead of one per service.' },
        {
          label: 'Result',
          text: 'Independent deployments and better service isolation.',
          todo: 'A before/after number, e.g. deploy frequency or incidents.'
        }
      ],
      diagram: {
        label: 'Monolith to microservices on AWS ECS',
        steps: ['Monolith'],
        via: 'split into',
        group: 'AWS ECS · 4 services',
        targets: ['API gateway', 'User service', 'Payment service', 'Notification service'],
        bus: 'SQS / SNS messages'
      }
    }
  ] satisfies CaseStudy[]
};

export interface Project {
  label: string;
  heading: string;
  /** Maturity shown next to the label, e.g. "Prototype". */
  status?: string;
  chips: string[];
  what: string;
  how: string;
  why: string;
  stack: string;
  diagram?: Diagram;
  /** Owner-supplied limits; see OwnerFact. */
  limits?: OwnerFact;
  /** Walkthrough video URL; an empty string shows a "coming soon" note instead. */
  video?: string;
  links: { label: string; key: LinkKey }[];
}

export const projects = {
  id: 'projects',
  badge: 'PROJECTS',
  title: 'Personal projects',
  subtitle: 'Systems of my own.',
  items: [
    {
      label: '01 / AI BESTIE',
      heading: 'A conversation that keeps flowing.',
      status: 'Prototype',
      chips: ['SSE', 'LLM fallback', 'JWT', 'Rate limits'],
      what: 'An AI companion chat app with personalised conversations that remember the last 20 messages.',
      how: 'Replies stream live over Server-Sent Events. If one AI provider fails, the app falls back to the other (Gemini, OpenRouter). When a user disconnects, the request is cancelled so the unused LLM stream stops.',
      why: 'So the reply starts streaming before generation finishes, the chat keeps working through a provider outage, and no LLM cost is spent on replies nobody reads.',
      stack: 'Node.js · Express · TypeScript · React · MongoDB. JWT-protected REST APIs, per-user rate limiting, atomic MongoDB message updates.',
      diagram: {
        label: 'AI Bestie request flow',
        steps: ['React client', 'Express API'],
        via: 'streams over SSE, falls back between',
        targets: ['Gemini', 'OpenRouter', 'MongoDB · last 20 messages']
      },
      limits: { label: 'Limits', todo: 'Safety boundaries: what it does not do (e.g. not a therapist, no crisis handling).' },
      video: '',
      links: [{ label: 'View code', key: 'aiBestieCode' }]
    },
    {
      label: '02 / VAIDYA ASSIST',
      heading: 'From a health question to a booked doctor.',
      chips: ['RAG', 'LLM APIs', 'Doctor search', 'Booking'],
      what: 'An AI healthcare assistant that answers health questions, helps people find doctors and books appointments.',
      how: 'It uses RAG (retrieval-augmented generation): it first retrieves relevant context, then asks an LLM to answer with it.',
      why: 'So a person can go from a question to a booked appointment in one conversation.',
      stack: 'Node.js · Express · React · MongoDB · RAG.',
      links: [
        { label: 'Frontend code', key: 'vaidyaAssistFrontend' },
        { label: 'Backend code', key: 'vaidyaAssistBackend' }
      ]
    }
  ] satisfies Project[]
};

export const about = {
  id: 'about',
  badge: 'ABOUT',
  title: 'About me',
  subtitle: "Who's behind the flow.",
  paragraphs: [
    "I'm a backend engineer with 3.5+ years at Weboccult Technologies, Mypcot Infotech and now Justdial. I work on the parts of a product users never see, and I'm now going deeper into system design and microservices."
  ],
  recognition: [
    'Employee of the Month at Mypcot Infotech, for contributions to backend architecture and deployment infrastructure.',
    'Built a cron-based script that filtered valid leads from a 1.7M-record dataset and automatically triggered 40K+ user communications.',
    'Solved 250+ DSA problems on LeetCode and HackerRank.'
  ],
  education: {
    degree: 'B.Tech, Electronics Engineering',
    school: 'Birla Vishvakarma Mahavidyalaya',
    years: '2019 to 2023'
  }
};

export interface ExperienceRow {
  employer: string;
  role: string;
  dates: string;
  badge?: string;
  highlights: string[];
}

export const experience = {
  id: 'experience',
  badge: 'EXPERIENCE',
  title: 'Experience',
  subtitle: 'The work so far.',
  rows: [
    {
      employer: 'Justdial Ltd.',
      role: 'SDE 1 · Bengaluru',
      dates: 'Jan 2026 to present',
      highlights: [
        'Built the centralized API gateway and the Kafka lead pipeline.',
        'Added Redis caching to the IRO platform and automated error monitoring.',
        'Designed and integrated WebRTC calling, owning the backend end to end.'
      ]
    },
    {
      employer: 'Mypcot Infotech',
      role: 'Software Engineer · Mumbai',
      dates: 'May 2024 to Dec 2025',
     // badge: 'Employee of the Month',
      highlights: [
        'Led the monolith-to-microservices migration on AWS ECS.',
        'Set up zero-downtime releases and CI/CD pipelines.',
        'Built REST and GraphQL APIs and a real-time emergency dispatch system.'
      ]
    },
    {
      employer: 'Weboccult Technologies',
      role: 'Backend Engineer · Ahmedabad',
      dates: 'Jan 2023 to May 2024',
      highlights: [
        'Designed and shipped REST backend services from scratch with Node.js, Express and MongoDB, agreeing API contracts with frontend and product teams.',
        'Built real-time video calling with Twilio Programmable Video and WebRTC; better session management raised average session length by 25%.'
      ]
    }
  ] as ExperienceRow[]
};

export const stack = {
  id: 'stack',
  badge: 'SKILLS',
  title: 'Skills and tools',
  subtitle: 'What powers the flow.',
  rows: [
    { label: 'API / SERVICES', tools: ['Node.js', 'TypeScript', 'Express', 'REST', 'GraphQL'] },
    { label: 'EVENTS / DATA', tools: ['Kafka', 'Redis', 'PostgreSQL', 'MongoDB'] },
    { label: 'DELIVERY / QUALITY', tools: ['AWS', 'Docker', 'GitHub Actions', 'Jest', 'JMeter', 'k6'] }
  ]
};

export const contact = {
  id: 'contact',
  eyebrow: 'NEXT REQUEST',
  headline: { primary: "Let's build", accent: 'what comes next.' },
  roles: ['Backend Engineer', 'SDE 2', 'Senior Backend Engineer', 'Node.js Engineer'],
  location: 'in Bengaluru or remote',
  lookingFor:
    "I'm looking for backend engineering roles where I can use my experience to ship products and web applications people find useful, while going deeper into system design and microservices.",
  primaryAction: { label: 'Discuss a backend role', key: 'email' as LinkKey },
  actions: [
    { label: 'GitHub', key: 'github' as LinkKey },
    { label: 'LinkedIn', key: 'linkedin' as LinkKey }
  ]
};

export const footer = {
  left: 'Pragnesh Prajapati',
  right: 'Backend Engineer'
};

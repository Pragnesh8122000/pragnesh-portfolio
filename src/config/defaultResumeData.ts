export interface ResumeData {
  visibility: {
    hero: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    services: boolean;
    testimonials: boolean;
    process: boolean;
    contact: boolean;
  };
  hero: {
    name: string;
    roles: string[];
    description: string;
    yearsOfExp: string;
    rpsMaintained: string;
    projectsDelivered: string;
    clientSuccessRate: string;
  };
  skills: Array<{
    title: string;
    skills: string[];
  }>;
  projects: Array<{
    title: string;
    category: string;
    image: string;
    tags: string[];
    description: string[];
    demoUrl: string;
    codeUrl: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    text: string;
    image: string;
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    location: string;
    skills: string[];
    bullets: string[];
  }>;
  education: {
    school: string;
    degree: string;
    duration: string;
    cgpa: string;
    description: string;
  };
  achievements: Array<{
    text: string;
    subtext: string;
  }>;
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
}

export const defaultResumeData: ResumeData = {
  visibility: {
    hero: true,
    skills: true,
    projects: true,
    experience: false,
    education: false,
    services: true,
    testimonials: true,
    process: true,
    contact: true,
  },
  hero: {
    name: "Pragnesh Prajapati",
    roles: [
      "Full Stack Engineer",
      "Distributed Systems Architect",
      "Cloud-Native Specialist",
      "Event-Driven Developer",
    ],
    description: "Full Stack and Distributed Systems Engineer specializing in scaling backends, event-driven microservices architectures, and robust cloud deployments.",
    yearsOfExp: "3+",
    rpsMaintained: "10k+",
    projectsDelivered: "15+",
    clientSuccessRate: "100%",
  },
  skills: [
    {
      title: "Backend & APIs",
      skills: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "Python",
        "REST APIs",
        "GraphQL",
        "System Design",
      ],
    },
    {
      title: "Databases",
      skills: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "AWS",
        "Docker",
        "CI/CD Pipelines",
        "Cloud Architecture",
      ],
    },
    {
      title: "AI Integration",
      skills: [
        "OpenAI / GPT",
        "Claude AI",
        "Vector Databases",
        "Prompt Engineering",
      ],
    },
    {
      title: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Material-UI",
        "Tailwind CSS",
      ],
    },
  ],
  projects: [
    {
      title: "Vedincharyaa — Vedic Wisdom Platform",
      category: "AI-Powered Learning Platform",
      image: "/vedincharyaa.png",
      tags: ["React", "Node.js", "OpenAI", "MongoDB"],
      description: [
        "Built an AI-powered platform that helps users learn and memorize ancient Vedic texts with 50% better comprehension.",
        "Created an intelligent spaced-repetition system that adapts to each user's learning pace, improving retention by 40%.",
      ],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Shuffgroup — Home Security Platform",
      category: "Real-time IoT Dashboard",
      image: "/shuffgroup.png",
      tags: ["React", "Node.js", "Redis", "AWS"],
      description: [
        "Developed a real-time emergency response system that delivers alerts instantly to security personnel.",
        "Engineered a high-performance caching layer that reduced response times by 40%, handling thousands of concurrent users.",
      ],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Chandipe — Bullion Trading Platform",
      category: "FinTech Trading Application",
      image: "/chandipe.png",
      tags: ["React", "Node.js", "PostgreSQL", "AWS"],
      description: [
        "Built a secure, real-time trading platform for gold and silver with reliable transaction processing.",
        "Deployed with zero-downtime updates, ensuring traders never miss a market opportunity.",
      ],
      demoUrl: "#",
      codeUrl: "#",
    },
  ],
  services: [
    {
      title: "AI & Automation Solutions",
      description: "Leverage GPT, Claude, and custom AI models to automate workflows, enhance user experiences, and reduce operational costs.",
      icon: "AutoAwesome",
    },
    {
      title: "Scalable Backend Architecture",
      description: "Build robust APIs and microservices that handle growth. From startup MVP to enterprise-grade systems that perform under load.",
      icon: "AccountTree",
    },
    {
      title: "Cloud & DevOps",
      description: "Deploy scalable applications on AWS with CI/CD pipelines, monitoring, and zero-downtime releases.",
      icon: "Cloud",
    },
    {
      title: "Full Stack Development",
      description: "End-to-end web application development using React, Node.js, PostgreSQL, and MongoDB.",
      icon: "Code",
    },
  ],
  testimonials: [
    {
      name: "Alex Rivera",
      role: "CTO, TechScale Inc.",
      text: "Pragnesh transformed our backend into a scalable system that handles 10x more users with 80% less downtime. His work enabled our business to grow without technology holding us back.",
      image: "",
    },
    {
      name: "Sarah Chen",
      role: "Founder, ZenFlow",
      text: "The AI integration Pragnesh delivered was seamless. He understood our product vision and built features that exceeded our expectations. Highly recommend for any technical project.",
      image: "",
    },
  ],
  process: [
    {
      step: 1,
      title: "Discovery Call",
      description: "We discuss your project goals, requirements, and timeline to ensure we're the right fit.",
    },
    {
      step: 2,
      title: "Proposal & Planning",
      description: "I provide a detailed proposal with timeline, milestones, and technical approach.",
    },
    {
      step: 3,
      title: "Development",
      description: "Regular updates and demos as I build your solution with clean, maintainable code.",
    },
    {
      step: 4,
      title: "Delivery & Support",
      description: "Smooth deployment with documentation and ongoing support for your peace of mind.",
    },
  ],
  experience: [
    {
      role: "SDE-1 (Backend)",
      company: "Justdial Ltd.",
      duration: "Jan 2026 – Present",
      location: "Bengaluru, India",
      skills: ["Node.js", "Express.js", "Redis Caching", "WebRTC", "System Design", "Observability"],
      bullets: [
        "Designed a centralized API Gateway with dynamic routing across 10+ backend services using Node.js and Express.js, improving deployment flexibility and enabling independent service rollouts.",
        "Built an event-driven observability pipeline integrating Slack-based alerting with triggered log analysis across 7 different servers; reduced mean time-to-detect (MTTD) production issues by ~40% via hourly automated alerts.",
        "Implemented load balancing and Redis caching strategies (Pub/Sub + caching layer) for the IRO management platform, reducing average API response time under peak load by 35%.",
        "Applied system design principles to architect WebRTC + third-party calling service integration for internal communication workflows; independently owned API integration, testing, and end-to-end delivery.",
        "Engineered automated reporting workflows for lead management systems using scheduled jobs, eliminating 100% of manual report generation effort for operational teams.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Mypcot Infotech Pvt. Ltd.",
      duration: "May 2024 – Dec 2025",
      location: "Mumbai, India",
      skills: ["AWS ECS", "GraphQL APIs", "SQS/SNS", "Docker", "CI/CD", "Redis", "React Query"],
      bullets: [
        "Led full monolith-to-microservices migration on AWS ECS using event-driven architecture (SQS/SNS), and GraphQL APIs; improved fault isolation and reduced system-wide downtime by 5x.",
        "Designed fault-tolerant GraphQL and REST APIs with Node.js, Express.js, and AWS API Gateway, implementing rate limiting, and retry logic to sustain 10,000+ RPS in production.",
        "Deployed infrastructure with ALB, Auto Scaling Groups, and AWS CodeDeploy, achieving zero-downtime deployments across all production releases.",
        "Built end-to-end CI/CD pipelines with GitHub Actions and Docker including automated integration testing; reduced deployment cycle time by 80% and cut release failure rate to near zero.",
        "Implemented distributed caching strategies using Redis (stale-while-revalidate, write-through) and React Query on the frontend, eliminating 60% of redundant API calls and significantly reducing backend load.",
        "Introduced distributed tracing and observability across microservices, enabling end-to-end request visibility and reducing latency for critical user-facing APIs.",
      ],
    },
    {
      role: "Backend Engineer",
      company: "Weboccult Technologies",
      duration: "Jan 2023 – May 2024",
      location: "Ahmedabad, India",
      skills: ["Node.js", "Express.js", "MongoDB", "Twilio Video", "WebRTC", "AI Pipelines", "ML Models"],
      bullets: [
        "Designed and shipped RESTful backend services from scratch using Node.js, Express.js, and MongoDB with event-driven patterns; independently owned data modeling, API contracts, and system design for 3+ client products.",
        "Engineered a real-time video communication service using Twilio Programmable Video and WebRTC, optimizing session management and media negotiation to increase average user session duration by 25%.",
        "Integrated an AI-powered document review pipeline using supervised ML models for automated form processing; reduced manual review workload by 60% and improved throughput for high-volume document submissions.",
      ],
    },
  ],
  education: {
    school: "Birla Vishvakarma Mahavidyalaya",
    degree: "Bachelor of Technology (B.Tech.)",
    duration: "2019 – 2023",
    cgpa: "7.6",
    description: "Studied core engineering subjects including Software Engineering, Database Management Systems, Computer Networks, and Operating Systems. Developed a strong grounding in algorithms and software design principles.",
  },
  achievements: [
    {
      text: "Awarded Employee of the Month at Mypcot Infotech",
      subtext: "Recognized for leading the monolith-to-microservices migration and establishing zero-downtime deployment pipelines.",
    },
    {
      text: "Solved 250+ Data Structures & Algorithms (DSA) problems",
      subtext: "Practiced extensively on LeetCode and HackerRank, focusing on graph theory, dynamic programming, and system design patterns.",
    },
    {
      text: "Delivered production-grade full-stack systems for international clients",
      subtext: "Collaborated in high-intensity teams to engineer, containerize, and deploy robust web and mobile applications.",
    },
  ],
  contact: {
    email: "pragnesh8122000@gmail.com",
    location: "Bengaluru | Mumbai | Ahmedabad, India",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};

// Edit this file to update the copy across the site.
import { technologies, type Technology } from "./technologies"

export const verse = {
  devanagari: ["तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया।"],
  reference: "Bhagavad Gītā · 4.34",
  translation:
    "Seek knowledge with humility, question with curiosity, and grow through meaningful service.",
}

export const statement =
  "The goal is not merely to achieve something, but to become someone through the work it takes to get there."

export const about = [
  "Hi, I’m Saugat! I love building things, breaking them, and figuring out why they broke.",
  "I’m curious about how things work behind the scenes, especially on the backend. I spend a lot of time experimenting, learning, and sometimes going down rabbit holes just to understand something better. I’m still figuring things out, one bug and one project at a time — and that’s the fun part.",
  "Outside of work I read philosophy, walk long distances, and return often to the Gītā — less as scripture than as a practical guide to doing one’s work well.",
]

export const clients = [
  {
    name: "Farm2HomeNepal",
    src: "https://cdn.saugatgiri.com.np/portfolio/Clients/farm2home_nepal.png",
    alt: "Farm2HomeNepal",
    url: "https://farm2homenepal.com/",
  },
  {
    name: "Print Patra",
    src: "https://cdn.saugatgiri.com.np/portfolio/Clients/logo-01.png",
    alt: "Print Patra",
    url: "https://printpatra.com.np/",
  },
  {
    name: "Gulf paradigm",
    src: "https://cdn.saugatgiri.com.np/portfolio/Clients/gulf_paradigm.jpeg",
    alt: "Gulf paradigm",
    url: "https://gulfparadigm.com/",
  },
  {
    name: "Faith Word",
    src: "https://cdn.saugatgiri.com.np/portfolio/Clients/faith_word.png",
    alt: "Faith Word",
    url: "https://faithword.tech/",
  },
]

export const techStack = {
  rawUrl:
    "https://skillicons.dev/icons?i=nodejs,golang,express,mongodb,nestjs,mysql,postgres,graphql,redis,kafka,rabbitmq,docker,typescript,react,nextjs,git,linux,bash,docker,ubuntu,postman,aws,prisma,nginx,grafana,prometheus,kubernetes,terraform,githubactions,elasticsearch,socket,bruno",
  categories: [
    {
      title: "Languages & Backend",
      items: [
        "Go",
        "TypeScript",
        "Node.js",
        "Express",
        "NestJS",
        "GraphQL",
        "Socket.io",
        "Bash",
      ],
    },
    {
      title: "Databases & Streaming",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Kafka",
        "RabbitMQ",
        "Elasticsearch",
        "Prisma",
      ],
    },
    {
      title: "Cloud & Infrastructure",
      items: [
        "Docker",
        "Kubernetes",
        "Terraform",
        "AWS",
        "Nginx",
        "Linux",
        "Ubuntu",
        "GitHub Actions",
        "Prometheus",
        "Grafana",
        "Git",
      ],
    },
    {
      title: "Frontend",
      items: ["React", "Next.js", "Postman", "Bruno"],
    },
  ],
}

export const work = [
  {
    period: "2025 — Present",
    role: "Software Engineer",
    org: "Freelancer",
    note: "Building and shipping software solutions for clients, focusing on backend architecture, API development, and scalable servicesBuilding and delivering software solutions for clients worldwide, specializing in backend development, scalable APIs, database architecture, and reliable cloud deployments.",
    skills: [
      "Backend Development",
      "API Development",
      "Database Architecture",
      "Cloud Deployments",
    ],
  },
]

interface IProjects {
  title: string,
  description: string,
  features?: string[],
  poster_url?: string,
  image_url?: string[],
  live_url?: string,
  github_url?: string,
  tech_stack?: Technology[]
}

export const projects: IProjects[] = [
  {
    title: "Farm2Home Nepal",
    description: "Connecting Nepalese families directly with local farmers. Fresh, ethical, and chemical-free produce from our fields to your table.",
    poster_url: "https://cdn.sanity.io/images/1dowjz3h/production/6d16e59f142e6092d52cddd7edccdedf68bf965c-1536x1024.png",
    image_url: [
      "https://cdn.sanity.io/images/1dowjz3h/production/824d51ca3fb7574ee9ed610e9c2707bdde0bbceb-812x1604.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/caace327dcd8465283008d1c411f1c35e0ac871a-1108x1342.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/e24501ebd3bbf7308e0eafe0db547393f006c8a1-1696x1972.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/1c28f3bc0da3e2e9eb394fcc32db340cb59e4a0f-1280x1906.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/052fe2ffcba19df797b75c2722dc3558f6ea3ddc-1258x1824.png"
    ],
    live_url: "https://farm2homenepal.com",
    tech_stack: [
      technologies.express,
      technologies.mongodb,
      technologies.redis,
      technologies.bullmq,
      technologies.passport,
    ]
  },
  {
    title: "Farm2Home Nepal",
    description: "Connecting Nepalese families directly with local farmers. Fresh, ethical, and chemical-free produce from our fields to your table.",
    poster_url: "https://cdn.sanity.io/images/1dowjz3h/production/6d16e59f142e6092d52cddd7edccdedf68bf965c-1536x1024.png",
    image_url: [
      "https://cdn.sanity.io/images/1dowjz3h/production/824d51ca3fb7574ee9ed610e9c2707bdde0bbceb-812x1604.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/caace327dcd8465283008d1c411f1c35e0ac871a-1108x1342.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/e24501ebd3bbf7308e0eafe0db547393f006c8a1-1696x1972.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/1c28f3bc0da3e2e9eb394fcc32db340cb59e4a0f-1280x1906.png",
      "https://cdn.sanity.io/images/1dowjz3h/production/052fe2ffcba19df797b75c2722dc3558f6ea3ddc-1258x1824.png"
    ],
    live_url: "https://farm2homenepal.com",
    tech_stack: [
      technologies.react
    ]
  },
  {
    title: "Code for Care",
    description: `
    Nyano Maya is a warm embrace in digital form,a companion built to ensure no mother walks the journey of health, nutrition, and care alone.Parents are placed into live, localized health communities using their real-time coordinates, where they can track childhood growth milestones together, stay on top of neighborhood vaccination schedules, and navigate to nearby immunization centers through verified location paths.

The platform streams real-time location updates,enabling precise navigation to nearby immunization centers, shared community routes, and live facility status tracking. Completed health logs and child growth metrics are processed into structured time-series and spatial data, allowing accurate developmental milestone tracking, growth curve plotting, and coverage calculations. Neighborhood dashboards rank local healthcare accessibility, track regional vaccination coverage, and highlight proactive caregiving, while automated push reminders and routine streaks encourage continuous, timely healthcare engagement rather than reactive visits.

    `,
    poster_url: "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/2.jpeg",
    image_url: [
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/1.jpg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/3.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/4.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/5.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/6.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/7.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/nayano_maya/2.jpeg"
    ],
    github_url: "https://github.com/saugat1070/CodeforCare",
    tech_stack: [
      technologies.express,
      technologies.mongodb,
    ]
  },
  {
    title: "Paila",
    description: "Paila is a location-powered community fitness platform that turns walking and running into a shared game. Users are automatically placed into live, district-based rooms using real-time coordinates, where they can track activity together, compete locally, and build territory through valid walking or running routes.\n\nThe platform streams live location updates using sockets, enabling group walks, shared visibility, and real-time validation. Completed activities are processed into GeoJSON LineString and Polygon data, allowing accurate distance, area, and territory calculations. Leaderboards rank users based on distance covered, territory claimed, and consistency, while rewards and streaks encourage long-term engagement rather than short bursts of activity.",
    poster_url: "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila.webp",
    image_url: [
      "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila_1.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila_2.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila_3.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila_4.jpeg",
      "https://cdn.saugatgiri.com.np/portfolio/Projects/paila/paila_5.jpeg",
    ],
    github_url: "https://github.com/saugat1070/Team-USA",
    tech_stack: [
      technologies.express,
      technologies.mongodb,
      technologies.redis
    ]
  }
]


export const teaching = {
  intro:
    "I’ve always enjoyed the moment when something finally clicks for someone, when a confusing concept starts to make sense and curiosity takes over.",
  note: "Teaching keeps me honest about what I actually understand — and reminds me that the best work is often helping someone else do theirs.",
  images: [
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.48%20PM.jpeg",
      alt: "Mentor speaking with two colleagues at a conference table",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.49%20PM%20(1).jpeg",
      alt: "Someone sketching ideas on a whiteboard",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.49%20PM.jpeg",
      alt: "Person writing code on a laptop",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.50%20PM.jpeg",
      alt: "Two people in conversation",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_103.png",
      alt: "A classroom in black and white",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_104.jpg",
      alt: "Three people gathered around a laptop",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_105.jpg",
      alt: "Two people pairing in front of a laptop",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_106.jpg",
      alt: "A group standing in front of a whiteboard",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_107.jpg",
      alt: "Mentor speaking with two colleagues at a conference table",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_108.jpg",
      alt: "Saugat",
    },
    {
      src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_109.jpg",
      alt: "Saugat",
    },
  ],
}

// Put the PDF in public/ with this filename; the navbar icon and Contact link open it in a new tab.
export const cv = {
  href: "https://cdn.saugatgiri.com.np/portfolio/saugat_resume.pdf",
}

export const contact = {
  email: "hello@saugatgiri.com.np",
  links: [
    { label: "GitHub", href: "https://github.com/saugat1070" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saugat-giri-1070s/" },
    { label: "Résumé", href: cv.href },
  ],
}

interface Achievement {
  title: string,
  description: string,
  position: string,
  photos?: string[],
  github_url?: string,
  posts?: string[]
}

export const achievements: Achievement[] = [{
  title: "Winner Hackathon-Nova 2026",
  description: "Secured 1st place at Hackathon Nova 2026, competing against 15+ teams with Paila, a location-based fitness platform that turns physical activity into an interactive territory-capturing game. Built as part of Team USA, alongside Upendra and Anurag, the project combined technology, gamification, and real-world fitness to encourage healthier lifestyles.",
  position: "1st",
  photos: [
    "https://cdn.saugatgiri.com.np/portfolio/achievement/hackathon-nova/team_usa.jpeg",
    "https://cdn.saugatgiri.com.np/portfolio/achievement/hackathon-nova/team_usa_2.jpeg",
    "https://cdn.saugatgiri.com.np/portfolio/achievement/hackathon-nova/team_usa_3.jpeg",
    "https://cdn.saugatgiri.com.np/portfolio/achievement/hackathon-nova/Screenshot%20From%202026-11-14%2018-51-29.png"
  ],
  github_url: " https://github.com/saugat1070/Team-USA"
}, {
  title: " Runner-up Code with Coffe",
  description: "I secured the runner-up position in the Code with Coffee programming competition, where over 100 talented participants showcased their skills. This event was a fantastic platform to demonstrate problem-solving abilities and expertise in data structures and algorithms (DSA).",
  position: "2nd",
  photos: [
    "https://cdn.saugatgiri.com.np/portfolio/achievement/code_with_coffe/cfc.jpeg"
  ]
}]

// GitHub activity shown in the About section (fetched live from public APIs).
export const github = {
  username: "saugat1070",
  // Languages to hide, with the language their share is added to instead.
  mergeLanguages: { HTML: "Go" } as Record<string, string>,
  // Languages left out of the chart entirely.
  hideLanguages: ["CSS", "SCSS"],
}

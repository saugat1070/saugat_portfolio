// Edit this file to update the copy across the site.

export const verse = {
  devanagari: ['योगः कर्मसु कौशलम् ॥'],
  reference: 'Bhagavad Gītā · 2.50',
  translation:
    'Yoga is excellence in action,\u00A0\u00A0To work with purpose, pursue mastery with patience, and find meaning in every step of the journey.',
}

export const statement =
  'The goal is not merely to achieve something, but to become someone through the work it takes to get there.'

export const about = [
  'Hi, I’m Saugat! I love building things, breaking them, and figuring out why they broke.',
  'I’m curious about how things work behind the scenes, especially on the backend. I spend a lot of time experimenting, learning, and sometimes going down rabbit holes just to understand something better. I’m still figuring things out, one bug and one project at a time — and that’s the fun part.',
  'Outside of work I read philosophy, walk long distances, and return often to the Gītā — less as scripture than as a practical guide to doing one’s work well.',
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

  }
]

export const techStack = {
  rawUrl:
    'https://skillicons.dev/icons?i=nodejs,golang,express,mongodb,nestjs,mysql,postgres,graphql,redis,kafka,rabbitmq,docker,typescript,react,nextjs,git,linux,bash,docker,ubuntu,postman,aws,prisma,nginx,grafana,prometheus,kubernetes,terraform,githubactions,elasticsearch,socket,bruno',
  categories: [
    {
      title: 'Languages & Backend',
      items: ['Go', 'TypeScript', 'Node.js', 'Express', 'NestJS', 'GraphQL', 'Socket.io', 'Bash'],
    },
    {
      title: 'Databases & Streaming',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ', 'Elasticsearch', 'Prisma'],
    },
    {
      title: 'Cloud & Infrastructure',
      items: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Nginx', 'Linux', 'Ubuntu', 'GitHub Actions', 'Prometheus', 'Grafana', 'Git'],
    },
    {
      title: 'Frontend',
      items: ['React', 'Next.js', 'Postman', 'Bruno'],
    },
  ],
}

export const work = [
  {
    period: '2025 — Present',
    role: 'Software Engineer',
    org: 'Freelancer',
    note: 'Building and shipping software solutions for clients, focusing on backend architecture, API development, and scalable servicesBuilding and delivering software solutions for clients worldwide, specializing in backend development, scalable APIs, database architecture, and reliable cloud deployments.',
    skills: ['Backend Development', 'API Development', 'Database Architecture', 'Cloud Deployments', 'Scalable Services'],
  }
]

export const projects = [
  {
    index: '01',
    title: 'Distributed Task Queue',
    year: '2024',
    stack: 'Go · Redis · gRPC',
    summary:
      'A small, dependable job runner with at-least-once delivery, backoff, and an inspectable dashboard.',
    href: '#',
  },
  {
    index: '02',
    title: 'Notes Engine',
    year: '2023',
    stack: 'TypeScript · SQLite · CRDT',
    summary: 'A local-first notes system with conflict-free sync and plain-text export as a first-class feature.',
    href: '#',
  },
  {
    index: '03',
    title: 'Observability Toolkit',
    year: '2022',
    stack: 'Python · OpenTelemetry',
    summary: 'Lightweight tracing and structured logging conventions adopted across several internal services.',
    href: '#',
  },
  {
    index: '04',
    title: 'Sanskrit Text Reader',
    year: '2022',
    stack: 'React · Unicode · NLP',
    summary: 'A reader for classical texts with word-by-word glosses, transliteration, and sandhi splitting.',
    href: '#',
  },
]

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=800&fit=crop&q=75&auto=format`

export const teaching = {
  intro:
    'I’ve always enjoyed the moment when something finally clicks for someone, when a confusing concept starts to make sense and curiosity takes over.',
  note: 'Teaching keeps me honest about what I actually understand — and reminds me that the best work is often helping someone else do theirs.',
  images: [
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.48%20PM.jpeg", alt: 'Mentor speaking with two colleagues at a conference table' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.49%20PM%20(1).jpeg", alt: 'Someone sketching ideas on a whiteboard' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.49%20PM.jpeg", alt: 'Person writing code on a laptop' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/WhatsApp%20Image%202025-07-17%20at%2011.23.50%20PM.jpeg", alt: 'Two people in conversation' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_103.png", alt: 'A classroom in black and white' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_104.jpg", alt: 'Three people gathered around a laptop' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_105.jpg", alt: 'Two people pairing in front of a laptop' },
    { src: "https://cdn.saugatgiri.com.np/portfolio/Mentor/mentor_106.jpg", alt: 'A group standing in front of a whiteboard' },
  ],
}

// Put the PDF in public/ with this filename; the navbar icon and Contact link open it in a new tab.
export const cv = {
  href: '/Saugat-Giri-CV.pdf',
}

export const contact = {
  email: 'hello@saugatgiri.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/saugat1070' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Résumé', href: cv.href },
  ],
}

// GitHub activity shown in the About section (fetched live from public APIs).
export const github = {
  username: 'saugat1070',
  // Languages to hide, with the language their share is added to instead.
  mergeLanguages: { HTML: 'Go' } as Record<string, string>,
  // Languages left out of the chart entirely.
  hideLanguages: ['CSS', 'SCSS'],
}

export interface Technology {
  name: string
  logo_url: string
}

// Shared logo catalog. Reference these objects in a project's tech_stack.
// Skill Icons: https://github.com/tandpfun/skill-icons
const skill = (name: string, icon: string): Technology => ({
  name,
  logo_url: `https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/${icon}.svg`,
})

export const technologies = {
  express: skill("Express.js", "ExpressJS-Dark"),
  mongodb: skill("MongoDB", "MongoDB"),
  redis: skill("Redis", "Redis-Dark"),
  bullmq: {
    name: "BullMQ",
    logo_url: "https://bullmq.io/images/bullmq-logo.png",
  },
  passport: {
    name: "Passport.js",
    logo_url: "https://www.passportjs.org/images/PassportJS.svg",
  },
  nodejs: skill("Node.js", "NodeJS-Dark"),
  typescript: skill("TypeScript", "TypeScript"),
  javascript: skill("JavaScript", "JavaScript"),
  go: skill("Go", "GoLang"),
  nestjs: skill("NestJS", "NestJS-Dark"),
  graphql: skill("GraphQL", "GraphQL-Dark"),
  postgresql: skill("PostgreSQL", "PostgreSQL-Dark"),
  mysql: skill("MySQL", "MySQL-Dark"),
  prisma: skill("Prisma", "Prisma"),
  kafka: skill("Kafka", "Kafka"),
  rabbitmq: skill("RabbitMQ", "RabbitMQ-Dark"),
  elasticsearch: skill("Elasticsearch", "Elasticsearch-Dark"),
  react: skill("React", "React-Dark"),
  nextjs: skill("Next.js", "NextJS-Dark"),
  tailwind: skill("Tailwind CSS", "TailwindCSS-Dark"),
  docker: skill("Docker", "Docker"),
  kubernetes: skill("Kubernetes", "Kubernetes"),
  terraform: skill("Terraform", "Terraform-Dark"),
  aws: skill("AWS", "AWS-Dark"),
  nginx: skill("Nginx", "Nginx"),
  linux: skill("Linux", "Linux-Dark"),
  ubuntu: skill("Ubuntu", "Ubuntu-Dark"),
  bash: skill("Bash", "Bash-Dark"),
  git: skill("Git", "Git"),
  githubactions: skill("GitHub Actions", "GithubActions-Dark"),
  postman: skill("Postman", "Postman"),
  grafana: skill("Grafana", "Grafana-Dark"),
  prometheus: skill("Prometheus", "Prometheus"),
} satisfies Record<string, Technology>

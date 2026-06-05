// Single source of truth for all site content.
// Editing copy, links, or ordering here updates every section.

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly handle: string;
}

export interface ResearchItem {
  readonly title: string;
  readonly tagline: string;
  readonly body: string;
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
  readonly status: string;
  readonly venue?: string;
  readonly href?: string;
  readonly hrefLabel?: string;
  readonly featured?: boolean;
}

export interface ProjectItem {
  readonly title: string;
  readonly kind: string;
  readonly year: string;
  readonly body: string;
  readonly tags: readonly string[];
  readonly href?: string;
  readonly hrefLabel?: string;
  readonly repoPrivate?: boolean;
}

export interface ExperienceItem {
  readonly org: string;
  readonly role: string;
  readonly location: string;
  readonly period: string;
  readonly body: string;
  readonly tags?: readonly string[];
  readonly upcoming?: boolean;
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export const site = {
  name: "Lucas Burgett",
  role: "Math @ Stanford · Reinforcement learning for robots",
  location: "San Diego & Stanford, California",
  email: "lburgett@stanford.edu",
  resume: "/Lucas-Burgett-Resume.pdf",
  // Short, scannable hero statement. The serif emphasis is applied in the template.
  heroLead:
    "I'm Lucas — a math major at Stanford teaching machines to act. I work in reinforcement learning for robotics, from training pipelines to production.",
  heroSub:
    "Right now: fine-tuning vision-language models with RL to give robots usable long-horizon memory. This summer I join Parametric (YC F25) to build and ship RL models for robots.",
  about: [
    "I study Mathematics (with a CS minor) at Stanford, where I spend most of my time on the question of how machines learn to act under uncertainty. That pulls me across reinforcement learning, robotics, and the systems work that makes experiments reproducible.",
    "My current research replaces imitation learning with RL in hierarchical robot policies — training the model to remember what actually makes future tasks succeed, not just to copy what a human did. Alongside research I ship: AI products, developer tooling, and evaluation infrastructure.",
    "Outside the terminal I help run the Blythe Fund and Stanford AI Club, write about early-stage startups, and speak Portuguese.",
  ],
} as const;

export const socials: readonly SocialLink[] = [
  { label: "Email", href: "mailto:lburgett@stanford.edu", handle: "lburgett@stanford.edu" },
  { label: "GitHub", href: "https://github.com/lucasburgett", handle: "@lucasburgett" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-burgett-494a98207",
    handle: "in/lucas-burgett",
  },
];

// Headline status used in the hero "now" strip — keeps the summer role prominent.
export const now = {
  summer: {
    label: "Summer 2026",
    org: "Parametric",
    badge: "YC F25",
    role: "Incoming Software Engineering Intern",
    detail: "Reinforcement learning for robotics — full ML lifecycle, training to production.",
    location: "San Francisco, CA",
  },
  research: {
    label: "Now",
    org: "Stanford — VLA Memory & Fan Lab",
    detail: "RL-trained memory for long-horizon manipulation; multi-agent nanophotonic design.",
  },
} as const;

export const research: readonly ResearchItem[] = [
  {
    title: "VLA Memory",
    tagline: "RL-trained memory for long-horizon robot manipulation",
    body:
      "A hierarchical VLM + VLA system for robots that have to remember across tasks. A Qwen2.5-VL-7B planner is fine-tuned with GRPO to pick the keyframes that actually matter and issue subtask instructions; a frozen π₀.₅ policy handles low-level execution.",
    highlights: [
      "Replaces imitation learning (MemER, ICLR 2026) with reinforcement learning — the planner is rewarded for downstream task success, not for copying which keyframes a human chose.",
      "Same architecture, backbone, and benchmark as prior work; the training algorithm is the single variable under test.",
      "GRPO loop: sample G rollouts per prompt with the frozen VLA, score on episode success, update with group-normalized advantage and a KL anchor to the SFT reference.",
    ],
    tags: ["GRPO", "Reinforcement Learning", "Qwen2.5-VL", "π₀.₅", "JAX / openpi", "Modal · A100"],
    status: "Research paper in progress",
    venue: "Benchmarked on RoboMME (ICML 2026 Spotlight) — 16 tasks, 15th variant",
    href: "https://github.com/lucasburgett/vla-memory-new",
    hrefLabel: "RoboMME evaluation harness",
    featured: true,
  },
  {
    title: "VLAScore",
    tagline: "A reproducible evaluation platform for vision-language-action policies",
    body:
      "An evaluation harness that runs VLA policies — OpenVLA, ACT, Octo — head-to-head on a Franka tabletop manipulation environment, with deterministic trials, stall detection, and CSV comparison reports.",
    highlights: [
      "Native-MuJoCo Franka env plus robosuite Lift, with smoke tests that pin model output shapes and GPU availability.",
      "Runs anywhere: local, Colab, and Stanford's FarmShare GPU cluster via a standalone micromamba + Slurm setup.",
    ],
    tags: ["OpenVLA", "MuJoCo", "robosuite", "Octo", "FarmShare · Slurm"],
    status: "Research infrastructure",
  },
  {
    title: "Fan Lab — Autonomous Nanophotonic Design",
    tagline: "Multi-agent design and LLM evaluation for metasurfaces",
    body:
      "Research assistant in Stanford's Fan Lab, contributing to MetaChat 2.0 — a multi-agent framework for autonomous nanophotonic device design — and building an evaluation set that measures how well language models reason over a corpus of Tidy3D metasurface papers and simulation notebooks.",
    highlights: [
      "MetaGraph-Eval: a deterministic, graded benchmark built from paper-linked simulation notebooks with reference answers and automated graders.",
    ],
    tags: ["Multi-agent systems", "LLM evaluation", "Nanophotonics", "Tidy3D"],
    status: "Stanford research · Winter 2026 – present",
  },
];

export const projects: readonly ProjectItem[] = [
  {
    title: "Coinvest",
    kind: "AI product",
    year: "2026",
    body:
      "An AI investment-thesis research tool: enter a thesis, get a structured report with data-driven confidence scores, company comparisons, historical parallels, and invalidation analysis. A multi-agent Claude pipeline grounds every score in real yfinance and NewsAPI signals, with scheduled re-research, portfolio tracking, and an AI morning brief.",
    tags: ["Claude API", "Multi-agent", "FastAPI", "React", "Postgres", "Fly.io"],
    repoPrivate: true,
  },
  {
    title: "CodeSentry",
    kind: "Developer tool",
    year: "2026",
    body:
      "AI code review for AI-generated code, shipped as a GitHub App. It pairs Semgrep (16 custom rules for common AI mistakes) with Claude behavioral analysis to flag bugs a static linter misses, then posts a risk-scored PR comment. LLM flags are gated by static evidence to suppress false positives.",
    tags: ["GitHub App", "Semgrep", "Claude", "FastAPI", "SQLite"],
    href: "https://github.com/lucasburgett/codesentry",
    hrefLabel: "View source",
  },
  {
    title: "Reproducible RL Pipeline",
    kind: "RL infrastructure",
    year: "2025",
    body:
      "A production-ready template for reproducible deep RL: deterministic seeding, Hydra-managed configs, version locking, experiment logging, CI, and Docker. PPO agents on CartPole, LunarLander, and Reacher with mean ± std reported across seeds — bit-for-bit reproducible runs.",
    tags: ["PPO", "Stable-Baselines3", "Hydra", "MuJoCo", "CI/CD"],
    href: "https://github.com/lucasburgett/rl-reward-tuning-pipeline",
    hrefLabel: "View source",
  },
  {
    title: "Latent Rectified-Flow CT Reconstruction",
    kind: "CS 231N · Deep Learning for CV",
    year: "2026",
    body:
      "Low-dose CT and X-ray reconstruction with a latent rectified-flow model. A frozen VAE compresses the image; a learned vector field transports the noisy latent to a clean one along a straight path, decoding in 5–10 ODE steps. Adds per-pixel uncertainty maps to flag where the model may have hallucinated detail.",
    tags: ["Rectified Flow", "VAE", "PyTorch", "Diffusion", "SSIM / FID"],
    href: "https://github.com/nikiyoon05/medical-diffusion-reconstruction",
    hrefLabel: "View source",
  },
  {
    title: "Nano Defect Detector",
    kind: "Computer vision",
    year: "2025",
    body:
      "A lightweight PyTorch pipeline for spotting nanoscale defects in SEM/TEM images. Produces OK/NG classifications and pixel-level defect heatmaps at under 10 ms per 512×512 tile on a laptop, served through a FastAPI + Gradio web viewer with an ONNX runtime path.",
    tags: ["PyTorch", "OpenCV", "Anomaly detection", "FastAPI", "ONNX"],
    href: "https://github.com/lucasburgett/nano-defect-detector",
    hrefLabel: "View source",
  },
  {
    title: "Personalized Writing-Style Tool",
    kind: "LLM application",
    year: "2025",
    body:
      "A multi-agent system that learns a person's writing style from samples and generates style-matched content with the Claude API, then runs an iterative refinement loop against GPTZero feedback to keep the output natural.",
    tags: ["Claude API", "Multi-agent", "NLP"],
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    org: "Parametric",
    role: "Software Engineering Intern (Incoming)",
    location: "San Francisco, CA · YC F25",
    period: "Summer 2026",
    body:
      "Developing and deploying reinforcement learning models for robotics applications, contributing across the full ML lifecycle from training to production.",
    tags: ["Reinforcement Learning", "Robotics", "MLOps"],
    upcoming: true,
  },
  {
    org: "Fan Lab, Stanford University",
    role: "Research Assistant",
    location: "Stanford, CA",
    period: "Winter 2026 – present",
    body:
      "Contributing to MetaChat 2.0, a multi-agent framework for autonomous nanophotonic device design, and building LLM evaluation infrastructure over a metasurface research corpus.",
    tags: ["Multi-agent", "LLM eval", "Nanophotonics"],
  },
  {
    org: "Startups To Join",
    role: "Research Fellow",
    location: "Stanford, CA",
    period: "Winter 2026",
    body:
      "Researching, interviewing, and writing about high-growth startups including Imprint and Midship, with mentorship from experienced founders and operators.",
  },
  {
    org: "Platform Science",
    role: "Engineering Intern",
    location: "San Diego, CA",
    period: "Summer 2025",
    body:
      "Built a proof-of-concept model that computes Time-to-Collision from live vehicle video feeds at 80% accuracy, using TensorFlow and OpenCV with AWS SageMaker training and Snowflake data pipelines.",
    tags: ["Computer Vision", "TensorFlow", "AWS SageMaker", "Snowflake"],
  },
  {
    org: "Treeline Interactive",
    role: "Product Manager Intern",
    location: "San Diego, CA",
    period: "Summer 2023",
    body:
      "Worked across product development, market analysis, and roadmapping, helping launch Five Iron Golf's online booking software.",
  },
];

export const education = {
  school: "Stanford University",
  degree: "B.S. Mathematics · Minor in Computer Science",
  period: "2024 – 2028",
  detail: "GPA 3.79 · Blythe Fund · Stanford AI Club",
  coursework: [
    "CS 224R — Deep Reinforcement Learning",
    "CS 231N — Deep Learning for Computer Vision",
    "CS 109 — Probability for Computer Scientists",
    "CS 107 — Computer Organization & Systems",
    "Math 104 — Applied Matrix Theory",
    "Math 53 — ODEs, Linear Algebra & Fourier Methods",
  ],
} as const;

export const skills: readonly SkillGroup[] = [
  { label: "Languages", items: ["Python", "Java", "C++", "C", "MATLAB", "SQL"] },
  {
    label: "ML & RL",
    items: ["PyTorch", "JAX", "TensorFlow", "Stable-Baselines3", "GRPO / PPO", "Hugging Face", "OpenCV"],
  },
  {
    label: "Infrastructure",
    items: ["Modal", "AWS SageMaker", "Docker", "Fly.io", "Snowflake", "Hydra", "W&B"],
  },
  { label: "Product", items: ["React", "FastAPI", "Postgres", "Claude API"] },
  { label: "Spoken", items: ["English", "Portuguese"] },
];

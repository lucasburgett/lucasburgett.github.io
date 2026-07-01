// Single source of truth for all site content.
// Editing copy, links, or ordering here updates every section.

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly handle: string;
}

export interface WorkMedia {
  readonly src: string;
  readonly poster: string;
  readonly caption: string;
}

// A single "Projects & Personal Research" entry. Covers both shipped projects and
// research write-ups; optional fields let research items carry a tagline, highlights,
// and a demo video, while projects can fall back to a repo note. `inProgress` shows a
// small "in progress" tag — that is the only status an item ever displays.
export interface WorkItem {
  readonly title: string;
  readonly tagline?: string;
  readonly body: string;
  readonly highlights?: readonly string[];
  readonly tags: readonly string[];
  readonly href?: string;
  readonly hrefLabel?: string;
  readonly repoNote?: string; // shown when there is no href
  readonly inProgress?: boolean;
  readonly featured?: boolean;
  readonly media?: WorkMedia;
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

export interface Course {
  readonly code: string;
  readonly title: string;
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export const site = {
  name: "Lucas Burgett",
  role: "Math + CS @ Stanford · Intern @ Parametric (F25)",
  location: "Stanford & San Diego, California",
  email: "lburgett@stanford.edu",
  resume: "/Lucas-Burgett-Resume.pdf",
  heroLead:
    "I'm studying math and computer science at Stanford. I'm super interested in physical AI systems. I love learning about VLA's, Reinforcement learning, and how to deploy reliable policies in the real world.",
  about: [
    "In my free time, I love working out, golfing, seeing the world, and meeting new people. I'm also half Brazilian, so I try to go visit my family there as much as I can.",
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

// Headline status used in the hero "now" strip.
export const now = {
  summer: {
    label: "Now",
    org: "Parametric",
    badge: "YC F25",
    role: "Software Engineering Intern",
    detail:
      "Building out the policy eval pipeline, and designing the metrics and statistics that decipher if a policy is usable in the real world.",
    location: "San Francisco, CA",
  },
  research: {
    label: "Now",
    org: "Fan Lab, Stanford University",
    detail:
      "Contributing to the development of MetaChat 2.0, a multi-agentic framework for autonomous nanophotonic device design.",
  },
} as const;

// Projects & personal research, in display order. The featured item leads the section
// with its demo video; the rest render as a blended list of cards. The Fan Lab /
// nanophotonics work is intentionally not here — it lives under Experience.
export const work: readonly WorkItem[] = [
  {
    title: "VLA Memory",
    tagline: "RL-trained memory for long-horizon robot manipulation",
    body:
      "A hierarchical VLM + VLA system for robots that have to remember across tasks. A Qwen2.5-VL-7B planner is fine-tuned with GRPO to pick the keyframes that actually matter and issue the next subtask; a frozen π₀.₅ policy carries out the low-level motion.",
    highlights: [
      "Swaps the imitation learning used in MemER (ICLR 2026) for reinforcement learning. The planner is rewarded for whether the task gets done, not for copying which keyframes a human looked at.",
      "Same architecture, backbone, and benchmark as the prior work, so the training algorithm is the only thing that changes.",
      "GRPO loop: sample several rollouts per prompt with the frozen policy, score each on episode success, and update the planner with a group-normalized advantage and a KL anchor to the supervised model.",
    ],
    tags: ["GRPO", "Reinforcement Learning", "Qwen2.5-VL", "π₀.₅", "JAX / openpi", "Modal · A100"],
    href: "https://github.com/lucasburgett/vla-memory-new",
    hrefLabel: "RoboMME evaluation harness",
    featured: true,
    media: {
      src: "/media/vla-memory-run.mp4",
      poster: "/media/vla-memory-poster.png",
      caption:
        "A successful eval rollout: π₀.₅ carrying out a subgoal the memory planner issued on a RoboMME permanence task. The on-screen subgoal is the planner's output.",
    },
  },
  {
    title: "Coinvest",
    body:
      "An AI investment-thesis research tool: type a thesis, get back a structured report with data-driven confidence scores, company comparisons, historical parallels, and the conditions that would prove it wrong. A multi-agent Claude pipeline grounds every score in live yfinance and NewsAPI data, with scheduled re-research, portfolio tracking, and a daily morning brief.",
    tags: ["Claude API", "Multi-agent", "FastAPI", "React", "Postgres", "Fly.io"],
    repoNote: "Private repository",
  },
  {
    title: "Latent Rectified-Flow CT Reconstruction",
    tagline: "Denoising low-dose medical scans with a latent flow model",
    body:
      "Low-dose CT and X-ray scans are noisy, and standard diffusion models need hundreds of steps to clean them. This model learns a straight-line flow between paired low-dose and normal-dose images in a compressed latent space, so a scan reconstructs in 5 to 10 solver steps.",
    highlights: [
      "A frozen VAE compresses each scan; a learned vector field transports the noisy latent toward the clean one along a straight path, trained by velocity matching.",
      "Adds a per-pixel uncertainty map, from SDE-variance sampling or an exact log-likelihood, so a radiologist can see where the model may have invented detail.",
      "Measured against a residual U-Net baseline on the Mayo Clinic low-dose CT data with SSIM and FID.",
    ],
    tags: ["Rectified Flow", "VAE", "PyTorch", "Uncertainty", "SSIM / FID"],
  },
  {
    title: "CodeSentry",
    body:
      "AI code review for AI-generated code, shipped as a GitHub App. It pairs Semgrep (16 custom rules for common AI mistakes) with Claude behavioral analysis to catch bugs a static linter misses, then posts a risk-scored PR comment. LLM flags only survive if Semgrep backs them up, which kills most false positives.",
    tags: ["GitHub App", "Semgrep", "Claude", "FastAPI", "SQLite"],
    href: "https://github.com/lucasburgett/codesentry",
    hrefLabel: "View source",
  },
  {
    title: "Reproducible RL Pipeline",
    body:
      "A template for deep RL experiments that actually reproduce: deterministic seeding, Hydra configs, version locking, experiment logging, CI, and Docker. PPO agents on CartPole, LunarLander, and Reacher, with mean ± std across seeds. Two runs of the same config give bit-for-bit identical results.",
    tags: ["PPO", "Stable-Baselines3", "Hydra", "MuJoCo", "CI/CD"],
    href: "https://github.com/lucasburgett/rl-reward-tuning-pipeline",
    hrefLabel: "View source",
  },
  {
    title: "Nano Defect Detector",
    body:
      "A lightweight PyTorch pipeline for spotting nanoscale defects in SEM and TEM images. It returns OK/NG classifications and pixel-level defect heatmaps in under 10 ms per 512×512 tile on a laptop, served through a FastAPI and Gradio viewer with an ONNX runtime path.",
    tags: ["PyTorch", "OpenCV", "Anomaly detection", "FastAPI", "ONNX"],
    href: "https://github.com/lucasburgett/nano-defect-detector",
    hrefLabel: "View source",
  },
  {
    title: "Personalized Writing-Style Tool",
    body:
      "A multi-agent system that learns a person's writing style from samples and generates content that matches it with the Claude API, then runs a refinement loop against GPTZero feedback to keep the writing natural.",
    tags: ["Claude API", "Multi-agent", "NLP"],
    repoNote: "Source unavailable",
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    org: "Parametric",
    role: "Software Engineering Intern",
    location: "San Francisco, CA · YC F25",
    period: "Summer 2026 – present",
    body:
      "Building and deploying reinforcement learning models for robotics, across the full ML lifecycle from training to production.",
    tags: ["Reinforcement Learning", "Robotics", "MLOps"],
  },
  {
    org: "Fan Lab, Stanford University",
    role: "Research Assistant",
    location: "Stanford, CA",
    period: "Winter 2026 – present",
    body:
      "Contributing to MetaChat 2.0, a multi-agent framework for autonomous nanophotonic device design, and building the LLM evaluation set that measures it.",
    tags: ["Multi-agent", "LLM eval", "Nanophotonics"],
  },
  {
    org: "Platform Science",
    role: "Engineering Intern",
    location: "San Diego, CA",
    period: "Summer 2025",
    body:
      "Built a proof-of-concept model that computes Time-to-Collision from live vehicle video at 80% accuracy, using TensorFlow and OpenCV, with model training on AWS SageMaker and data in Snowflake.",
    tags: ["Computer Vision", "TensorFlow", "AWS SageMaker", "Snowflake"],
  },
  {
    org: "Treeline Interactive",
    role: "Product Manager Intern",
    location: "San Diego, CA",
    period: "Summer 2023",
    body:
      "Worked across product development, market analysis, and roadmapping, and helped launch Five Iron Golf's online booking software.",
  },
];

export const education = {
  school: "Stanford University",
  degree: "B.S. Mathematics · Minor in Computer Science",
  period: "2024 – 2028",
  detail: "GPA 3.80 · Xfund Ethics Fellow · Stanford AI Club · Blythe Fund · Startups To Join",
  coursework: [
    { code: "CS 224R", title: "Deep Reinforcement Learning" },
    { code: "CS 231N", title: "Deep Learning for Computer Vision" },
    { code: "CS 109", title: "Probability for Computer Scientists" },
    { code: "CS 107", title: "Computer Organization & Systems" },
    { code: "Math 104", title: "Applied Matrix Theory" },
    { code: "Math 53", title: "ODEs, Linear Algebra & Fourier Methods" },
  ] satisfies readonly Course[],
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

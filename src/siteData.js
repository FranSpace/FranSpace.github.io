export const siteData = {
  seo: {
    siteTitle: "FranSpace | Personal Archive",
    description:
      "A quiet personal archive for notes, research, projects, and reusable tools.",
  },

  profile: {
    name: "Frano",
    badge: "FranSpace",
    aboutLabel: "About",
    eyebrow: "Research / Engineering / Notes",
    title: "FranSpace — A quiet archive for ideas, systems and work.",
    intro:
      "FranSpace is a personal space for organizing research themes, engineering practice, project work, and structured notes in a calm editorial form.",
    introZh: "“为思想留白，为时间存档。”",
  },

  nav: ["Home", "Notes", "Research", "Projects", "Resources", "Journal"],

  about: {
    meta: "archive overview",
    heroDesc:
      "A short map of what this site is for, how the material is organized, and the kind of work it is meant to support.",
    summary:
      "FranSpace is designed as a calm working archive. It brings together research themes, implementation notes, project snapshots, and reusable references so ideas can move from reading to modeling to code without getting lost.",
    summaryZh:
      "FranSpace 更像一套持续整理中的个人工作底稿：把研究主题、实现笔记、项目进展与可复用资源放在同一个安静的结构里，让阅读、推导、实现与验证能够彼此连起来。",
    highlights: [
      { label: "Focus", value: "Mechanics", note: "research-centered archive" },
      {
        label: "Mode",
        value: "Build",
        note: "notes connected to implementation",
      },
      {
        label: "Rhythm",
        value: "Iterate",
        note: "small systems, repeated refinement",
      },
      {
        label: "Intent",
        value: "Preserve",
        note: "working knowledge worth returning to",
      },
    ],
    blocks: [
      {
        label: "Notes",
        title: "Structured knowledge",
        desc: "Core concepts, derivations, numerical methods, and implementation details are kept in a form that is easier to revisit than scattered documents.",
        descZh:
          "把基础概念、推导、数值方法与实现细节整理成可反复回看的条目，而不是分散在临时文档里。",
        accent: "blue",
      },
      {
        label: "Research",
        title: "Longer-running questions",
        desc: "Themes collect the threads that are still evolving: constitutive modeling, PINN ideas, uncertainty quantification, and related technical directions.",
        descZh:
          "研究页收拢那些仍在推进中的主线问题，例如本构建模、PINN 思路、不确定性量化及其相关技术方向。",
        accent: "sage",
      },
      {
        label: "Projects",
        title: "Theory meeting code",
        desc: "Projects are where abstractions become libraries, verification sandboxes, tools, and small systems that can actually be run and checked.",
        descZh:
          "项目页对应理论真正落到代码的部分，把抽象思路变成可运行、可验证的小型系统、工具和库。",
        accent: "blue",
      },
    ],
    principles: [
      {
        label: "01",
        title: "Clarity before accumulation",
        desc: "New material should make the archive easier to navigate, not merely larger. Stable naming, consistent structure, and readable summaries matter.",
      },
      {
        label: "02",
        title: "Theory should stay close to implementation",
        desc: "Notes are most useful when they can inform code, validation, and design decisions instead of remaining isolated explanations.",
      },
      {
        label: "03",
        title: "Reusable work beats one-off effort",
        desc: "Templates, conversion routines, checks, and small workflow improvements are treated as assets that reduce future friction.",
      },
    ],
  },

  metrics: [
    {
      label: "Themes",
      value: "05",
      note: "research directions",
      to: "/research",
    },
    {
      label: "Projects",
      value: "04",
      note: "active & archived",
      to: "/projects",
    },
    { label: "Notes", value: "06", note: "structured entries", to: "/notes" },
    { label: "Writing", value: "03", note: "essays & logs", to: "/journal" },
  ],

  home: {
    spotlights: [
      {
        label: "Research",
        meta: "Themes",
        title: "Longer-running technical directions",
        desc: "Follow the threads that connect constitutive modeling, AI-assisted research workflows, uncertainty quantification, and mechanics-oriented exploration.",
        descZh:
          "沿着本构建模、AI 辅助研究、不确定性量化与力学计算这些持续推进中的方向继续展开。",
        to: "/research",
        cta: "Browse research ↗",
        accent: "blue",
      },
      {
        label: "Projects",
        meta: "Builds",
        title: "Codebases, sandboxes, and tools",
        desc: "See how theory turns into libraries, verification environments, conversion suites, and lightweight numerical utilities.",
        descZh:
          "查看理论是如何继续落到代码、验证环境、转换工具集与轻量数值工作台中的。",
        to: "/projects",
        cta: "View projects ↗",
        accent: "sage",
      },
      {
        label: "Journal",
        meta: "Writing",
        title: "Progress notes and reflections",
        desc: "The journal keeps track of design choices, technical writing habits, and the small decisions that shape a working archive.",
        descZh:
          "Journal 记录那些影响工作方式的设计选择、写作习惯，以及不断累积成系统的小决定。",
        to: "/journal",
        cta: "Read journal ↗",
        accent: "blue",
      },
    ],
    footer: {
      followLabel: "Follow",
      copyright: "© 2026 FranSpace. Built for the long term.",
      declaration: "Math, Mechanic and Code should reinforce each other.",
      links: [
        {
          label: "Email",
          title: "franspace2026@outlook.com",
          icon: "email",
          href: "mailto:franspace2026@outlook.com",
        },
        {
          label: "GitHub",
          title: "FranSpace on GitHub",
          icon: "github",
          href: "https://github.com/FranSpace",
        },
        {
          label: "Repo",
          title: "FranSpace.github.io",
          icon: "repo",
          href: "https://github.com/FranSpace/FranSpace.github.io",
        },
        {
          label: "Xiaohongshu",
          title: "小红书号: 1151432594",
          icon: "xiaohongshu",
          href: "https://www.xiaohongshu.com/user/profile/60d1e7d20000000001003d25",
        },
        {
          label: "WeChat",
          title: "WeChat Official Account",
          icon: "wechat",
          qrImage: "QRCode.jpg",
        },
      ],
    },
  },

  noteCollections: [
    {
      slug: "pinn-lecture-notes",
      title: "从机器学习到物理信息神经网络",
      descZh: "从ML到PINN与力学PDE问题的系列讲义入口。",
      icon: "PINN",
      accent: "blue",
      featuredOnHome: true,
      content: {
        summary:
          "A series of lecture notes on PINN-based numerical methods for solving PDEs in mechanics and related fields.",
      },
    },
  ],

  notes: [
    {
      slug: "continuum-strain-measures",
      title: "Continuum Mechanics & Strain Measures",
      descZh: "围绕变形、应变测度、不变量以及本构分析基础语言的系统化笔记。",
      meta: "23 notes",
      icon: "CM",
      accent: "blue",
      featuredOnHome: true,
      content: {
        summary:
          "A structured entry point into continuum kinematics, strain measures, and constitutive reasoning.",
        paragraphs: [
          "This section gathers foundational notes on continuum kinematics, tensor quantities, strain definitions, and the language used in constitutive modeling.",
          "It serves as a stable reference layer for later work on hyperelasticity, material models, and implementation details.",
        ],
      },
    },
    {
      slug: "hyperelasticity-material-models",
      title: "Hyperelasticity & Material Models",
      descZh: "整理超弹性材料模型、应变能形式、验证案例与实现细节。",
      meta: "32 notes",
      icon: "HM",
      accent: "sage",
      featuredOnHome: true,
      content: {
        summary:
          "A working archive of hyperelastic constitutive forms, parameter interpretation, and verification logic.",
        paragraphs: [
          "This topic focuses on model structure, stress computation, volumetric terms, parameter meaning, and reusable conversion routines.",
          "It also serves as the bridge between continuum theory and implementation-oriented projects.",
        ],
      },
    },
    {
      slug: "numerical-methods",
      title: "Numerical Methods",
      descZh: "关于牛顿法、特征分解、插值方法与稳定性检查的可复用笔记。",
      meta: "9 notes",
      icon: "NM",
      accent: "blue",
      featuredOnHome: true,
      content: {
        summary:
          "Reusable numerical tools and solver patterns used across research and engineering work.",
        paragraphs: [
          "The emphasis here is not only on formulas, but also on implementation decisions and reusable abstractions.",
          "This topic connects algorithmic patterns to actual code organization and repeatable validation.",
        ],
      },
    },
    {
      slug: "cpp-tooling",
      title: "C++ Tooling",
      descZh:
        "关于 Qt、MinGW、链接、DLL、项目组织与数值工具封装的开发工作笔记。",
      meta: "8 notes",
      icon: "CPP",
      accent: "sage",
      content: {
        summary:
          "A practical reference for maintaining a C++ numerical codebase and development workflow.",
        paragraphs: [
          "This topic connects build setup, library organization, debugging habits, and reusable tooling choices in day-to-day development.",
          "It is intended to reduce repeated setup costs and preserve working solutions across projects.",
        ],
      },
    },
  ],

  research: [
    {
      slug: "constitutive-modeling",
      title: "Constitutive Modeling",
      tags: ["Mechanics", "Modeling"],
      descZh: "围绕应变测度、超弹性本构关系与体积修正方法展开的研究主题。",
      meta: "5 themes",
      content: {
        summary:
          "A research thread connecting theory, modeling assumptions, and computational realization.",
        paragraphs: [
          "This theme links material laws, strain measures, and implementation structure into one evolving research line.",
          "It is where continuum reasoning meets constitutive form and computational verification.",
        ],
      },
    },
    {
      slug: "ai-assisted-research",
      title: "AI-assisted Research",
      tags: ["PINN", "Workflow"],
      descZh: "探索技术写作、代码生成与计算研究工作流之间的协同方式。",
      meta: "7 essays",
      content: {
        summary:
          "A broader thread about using AI to support reading, coding, note-keeping, and prototyping.",
        paragraphs: [
          "This direction is less about novelty and more about building a practical research operating system.",
          "It treats AI as a productivity layer that can assist structure, not replace thinking.",
        ],
      },
    },
    {
      slug: "phase-field-pinn",
      title: "Phase-field PINN",
      tags: ["PINN", "Mechanics"],
      descZh: "探索将相场光滑化 PINN 从线弹性推广到超弹性材料中的思路与路径。",
      meta: "4 notes",
      content: {
        summary:
          "A focused line on combining phase-field ideas, PINN formulations, and nonlinear constitutive behavior.",
        paragraphs: [
          "The main challenge is how to reinterpret smoothing and constitutive representation once material behavior becomes hyperelastic.",
          "This topic explores what can be preserved from linear elasticity workflows and what must be reformulated.",
        ],
      },
    },
    {
      slug: "fatigue-life-modeling",
      title: "Fatigue Life Modeling",
      tags: ["Fatigue", "UQ"],
      descZh: "围绕疲劳寿命预测、不确定性建模、PCE 与数据驱动方法的研究主题。",
      meta: "6 notes",
      content: {
        summary:
          "A long-term thread linking fatigue prediction, uncertainty quantification, and surrogate modeling.",
        paragraphs: [
          "This line spans traditional uncertainty approaches as well as newer hybrid data-driven workflows.",
          "The emphasis is on balancing interpretability, computational tractability, and predictive usefulness.",
        ],
      },
    },
    {
      slug: "tensor-methods-uq",
      title: "Tensor Methods in UQ",
      tags: ["Tensor", "PCE"],
      descZh: "研究张量表示、随机 Galerkin 系统与高维不确定性降维方法。",
      meta: "5 notes",
      content: {
        summary:
          "A research theme focused on high-dimensional stochastic systems and low-rank tensor structure.",
        paragraphs: [
          "This includes TT representations, block TT-cross ideas, and their relationship to intrusive stochastic formulations.",
          "The broader goal is to preserve structure while controlling computational growth in high dimensions.",
        ],
      },
    },
  ],

  projects: [
    {
      slug: "material-model-library",
      index: "01",
      title: "Material Model Library",
      stack: "C++ / Qt / Eigen",
      descZh: "持续扩展的本构模型、应变转换与数值求解工具实现集合。",
      status: "Active",
      statusTone: "blue",
      content: {
        summary:
          "A long-running implementation project for constitutive modeling and reusable solver components.",
        paragraphs: [
          "This project gathers material models, conversion routines, and validation-oriented helper functions into a structured codebase.",
          "Its role is both practical and architectural: implement models, and at the same time distill reusable patterns.",
        ],
      },
    },
    {
      slug: "verification-sandbox",
      index: "02",
      title: "Verification Sandbox",
      stack: "C++ / Testing",
      descZh: "用于应变转换、应力输出与数值行为检查的小型测试与验证环境。",
      status: "Prototype",
      statusTone: "sage",
      content: {
        summary:
          "A compact environment for verifying numerical results and conversion consistency.",
        paragraphs: [
          "It is designed for quick experiments, direct comparisons, and regression-style checks.",
          "The project aims to keep validation lightweight enough to use often, yet structured enough to trust.",
        ],
      },
    },
    {
      slug: "strain-conversion-suite",
      index: "03",
      title: "Strain Conversion Suite",
      stack: "C++ / Continuum Mechanics",
      desc: "A collection of reusable routines for transforming among finite-strain measures.",
      descZh: "一个面向有限应变测度转换的可复用函数集合与验证套件。",
      status: "Active",
      statusTone: "blue",
      content: {
        summary:
          "A project centered on turning scattered conversion code into a coherent reusable toolkit.",
        paragraphs: [
          "It covers theoretical interpretation, coding conventions, and structured verification inputs.",
          "The emphasis is on reliability, naming clarity, and consistent tensor conventions.",
        ],
      },
    },
    {
      slug: "qt-numerical-workbench",
      index: "04",
      title: "Qt Numerical Workbench",
      stack: "Qt / MinGW / Tooling",
      desc: "A local workbench for testing numerical utilities, linked libraries, and small interactive tools.",
      descZh: "一个用于测试数值工具、链接库与小型交互工具的 Qt 本地工作台。",
      status: "Prototype",
      statusTone: "sage",
      content: {
        summary:
          "A utility project that sits between engineering tooling and lightweight experimentation.",
        paragraphs: [
          "It is intended as a stable local platform for running small calculations, checks, and interface experiments.",
          "The project values speed of iteration and local convenience over product-level polish.",
        ],
      },
    },
  ],

  resources: [
    {
      slug: "equation-template",
      title: "Equation Template",
      kind: "LaTeX",
      desc: "Reusable layouts for derivations, aligned equations, and long-form technical notes.",
      descZh: "适用于推导、对齐公式与长篇技术笔记的 LaTeX 模板。",
      accent: "blue",
      content: {
        summary:
          "A reusable formatting base for technical writing and derivation-heavy notes.",
        paragraphs: [
          "Designed for clarity, consistency, and later reuse across research notes.",
          "The main goal is to support dense mathematical writing without losing visual calm.",
        ],
      },
    },
    {
      slug: "qt-build-notes",
      title: "Qt Build Notes",
      kind: "Setup",
      desc: "Reference notes for Qt, MinGW, linking, DLL handling, and project structure.",
      descZh: "关于 Qt、MinGW、链接、DLL 处理与项目结构的参考说明。",
      accent: "sage",
      content: {
        summary:
          "A practical build reference for maintaining Qt-based numerical projects on Windows.",
        paragraphs: [
          "This includes setup patterns, common linking issues, and recurring debugging notes.",
          "It is intended as a durable internal reference for avoiding repeated environment friction.",
        ],
      },
    },
    {
      slug: "research-workflow",
      title: "Research Workflow",
      kind: "Guide",
      desc: "A lightweight system for reading, writing, prototyping, and verification.",
      descZh: "一个轻量化的阅读、写作、原型开发与验证工作流框架。",
      accent: "blue",
      content: {
        summary:
          "A reusable structure for turning scattered research activity into a coherent working loop.",
        paragraphs: [
          "The goal is to reduce friction between note-taking, implementation, and verification.",
          "This resource emphasizes continuity rather than productivity theater.",
        ],
      },
    },
    {
      slug: "latex-note-template",
      title: "LaTeX Note Template",
      kind: "Template",
      desc: "A template system for clean note pages with theorem blocks, derivations, and remarks.",
      descZh: "用于清晰笔记页面、定理环境、推导块与注释块的模板系统。",
      accent: "sage",
      content: {
        summary:
          "A note-writing template that balances readability, density, and technical clarity.",
        paragraphs: [
          "Built for formula-heavy content that still needs to remain visually calm and readable.",
          "It helps preserve a consistent editorial tone across technical documents.",
        ],
      },
    },
    {
      slug: "cpp-project-skeleton",
      title: "C++ Project Skeleton",
      kind: "Codebase",
      desc: "A reusable skeleton for numerical C++ projects with separated model, math, and test layers.",
      descZh: "面向数值计算项目的 C++ 骨架，分离模型层、数学层与测试层。",
      accent: "blue",
      content: {
        summary:
          "A practical scaffold for organizing reusable mechanics and numerical computing code.",
        paragraphs: [
          "Intended to reduce repeated setup work when starting a new mechanics-oriented codebase.",
          "The scaffold emphasizes long-term maintainability over one-off convenience.",
        ],
      },
    },
  ],

  journal: [
    {
      slug: "strain-conversion-system",
      date: "Mar 2026",
      cat: "Engineering",
      title: "Reframing strain conversion as a reusable system",
      desc: "Notes on extracting solver patterns and conversion logic into reusable building blocks.",
      descZh: "讨论如何将求解模式与应变转换逻辑抽象为可复用的系统组件。",
      content: {
        summary:
          "A journal entry on turning scattered conversion logic into structured reusable design.",
        paragraphs: [
          "This note reflects on abstraction, naming, and reuse when building numerical mechanics code.",
          "The key question is how to turn many local routines into a system that remains understandable over time.",
        ],
      },
    },
    {
      slug: "technical-notes-readable",
      date: "Feb 2026",
      cat: "Writing",
      title: "On keeping technical notes readable",
      desc: "A reflection on structure, notation, and clarity in formula-heavy writing.",
      descZh: "关于在公式密集型写作中保持结构、符号与表达清晰的一点思考。",
      content: {
        summary:
          "A short note on balancing mathematical density with visual and conceptual clarity.",
        paragraphs: [
          "Technical writing becomes more reusable when notation, structure, and pacing are carefully controlled.",
          "This entry treats note-writing as part of research infrastructure rather than mere documentation.",
        ],
      },
    },
    {
      slug: "qt-workbench-log",
      date: "Jan 2026",
      cat: "Tooling",
      title: "Building a small numerical workbench in Qt",
      desc: "A process note on linking libraries, organizing utilities, and keeping the tool lightweight.",
      descZh: "记录在 Qt 中搭建小型数值工作台时的链接、组织与轻量化思路。",
      content: {
        summary:
          "A small development log on tooling, local utility design, and keeping interfaces simple.",
        paragraphs: [
          "The emphasis is not on feature count, but on making repeated numerical tasks easier to run and verify.",
          "A small tool becomes useful when it lowers friction without creating a maintenance burden.",
        ],
      },
    },
  ],
};

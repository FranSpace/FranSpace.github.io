export const siteData = {
  profile: {
    name: "Frank",
    badge: "FranSpace",
    aboutLabel: "About",
    eyebrow: "Research / Engineering / Notes",
    title: "FranSpace — A quiet archive for ideas, systems and work.",
    intro:
      "FranSpace is a personal space for organizing research themes, engineering practice, project work, and structured notes in a calm editorial form.",
    introZh: "“为思想留白，为时间存档。”",
  },

  nav: ["Home", "Notes", "Research", "Projects", "Resources", "Journal"],

  metrics: [
    { label: "Themes", value: "05", note: "research directions" },
    { label: "Projects", value: "04", note: "active & archived" },
    { label: "Notes", value: "06", note: "structured entries" },
    { label: "Writing", value: "03", note: "essays & logs" },
  ],

  notes: [
    {
      slug: "continuum-mechanics",
      title: "Continuum Mechanics",
      desc: "Notes on deformation, strain measures, invariants, and constitutive foundations.",
      descZh: "围绕变形、应变测度、不变量与本构基础的系统化笔记。",
      meta: "12 notes",
      icon: "◌",
      accent: "blue",
      content: {
        summary:
          "A structured entry point into deformation, tensor measures, and constitutive reasoning.",
        paragraphs: [
          "This section gathers foundational notes on continuum kinematics, tensor quantities, and the language used in constitutive modeling.",
          "It is intended as a stable reference layer that supports later work on hyperelasticity, numerical methods, and implementation details.",
        ],
      },
    },
    {
      slug: "hyperelasticity",
      title: "Hyperelasticity",
      desc: "Summaries of material models, conversions, verification cases, and implementation details.",
      descZh: "整理超弹性材料模型、应变转换、验证案例与实现细节。",
      meta: "18 notes",
      icon: "△",
      accent: "sage",
      content: {
        summary:
          "A working archive of constitutive models, strain conversions, and verification logic.",
        paragraphs: [
          "This topic focuses on model structure, stress computation, volumetric terms, and reusable conversion routines.",
          "It also serves as the bridge between theory notes and implementation-oriented projects.",
        ],
      },
    },
    {
      slug: "numerical-methods",
      title: "Numerical Methods",
      desc: "Reusable notes on Newton solvers, eigendecomposition, interpolation, and stability checks.",
      descZh: "关于牛顿法、特征分解、插值方法与稳定性检查的可复用笔记。",
      meta: "9 notes",
      icon: "✦",
      accent: "blue",
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
      slug: "strain-measures",
      title: "Strain Measures",
      desc: "Biot, Green–Lagrange, Almansi, logarithmic strain, and engineering strain conversions.",
      descZh:
        "整理 Biot、Green–Lagrange、Almansi、对数应变与工程应变之间的联系与转换。",
      meta: "11 notes",
      icon: "◇",
      accent: "blue",
      content: {
        summary:
          "A compact knowledge base for understanding and converting between major finite-strain measures.",
        paragraphs: [
          "This section focuses on the interpretation, notation, and conversion logic behind commonly used finite-strain measures.",
          "It serves as a bridge between continuum theory and implementation routines used in actual computational work.",
        ],
      },
    },
    {
      slug: "material-models",
      title: "Material Models",
      desc: "Neo-Hookean, Mooney-Rivlin, Yeoh, Ogden, Arruda–Boyce, and reduced polynomial models.",
      descZh:
        "梳理 Neo-Hookean、Mooney-Rivlin、Yeoh、Ogden、Arruda–Boyce 与 reduced polynomial 等模型。",
      meta: "14 notes",
      icon: "□",
      accent: "sage",
      content: {
        summary:
          "A structured comparison of constitutive model forms, parameters, and stress responses.",
        paragraphs: [
          "Model assumptions, strain-energy structure, parameter roles, and verification curves are collected in this section.",
          "The goal is to connect physical interpretation, mathematical form, and implementation strategy.",
        ],
      },
    },
    {
      slug: "cpp-tooling",
      title: "C++ Tooling",
      desc: "Qt, MinGW, linking, DLL handling, project structure, and numerical utility organization.",
      descZh:
        "关于 Qt、MinGW、链接、DLL、项目组织与数值工具封装的开发工作笔记。",
      meta: "8 notes",
      icon: "⌘",
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
      desc: "Themes around strain measures, hyperelastic constitutive laws, and volumetric correction methods.",
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
      desc: "Experiments in combining technical writing, code generation, and computational research workflows.",
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
      desc: "Extending phase-field smoothing and PINN ideas from linear elasticity to hyperelastic settings.",
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
      desc: "Uncertainty modeling, PCE formulations, and data-driven fatigue life prediction workflows.",
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
      desc: "Tensor-train representations, stochastic Galerkin systems, and high-dimensional uncertainty reduction.",
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
      desc: "A growing implementation set for constitutive models, strain conversions, and solver utilities.",
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
      desc: "Small drivers and structured checks for conversions, stress outputs, and numerical behavior.",
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

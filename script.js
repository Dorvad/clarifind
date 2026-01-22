(() => {
  const year = document.getElementById("year");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".header");
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const languageSelectors = document.querySelectorAll("[data-lang-select]");

  const translations = {
    en: {
      meta: {
        title: "Clarifind | Learning Solutions",
        description: "Clarifind develops tailored learning solutions—videos, eLearning, courses, workshops, mini-sites and AI agents—based on your learning goals.",
        ogDescription: "Clarifind builds goal-first learning solutions, from videos and eLearning to workshops, mini-sites, and AI agents.",
      },
      skip: "Skip to content",
      brand: {
        home: "Clarifind home",
        logoAlt: "Clarifind logo",
        tag: "Learning Solutions",
      },
      nav: {
        label: "Primary",
        services: "Services",
        process: "Process",
        useCases: "Use Cases",
        projects: "Projects",
        about: "About",
        contact: "Contact",
        openMenu: "Open menu",
      },
      language: {
        label: "Language",
      },
      theme: {
        dark: "Dark mode",
        light: "Light mode",
      },
      hero: {
        pill: "Learning Design • Training Content • AI Support",
        title: "Clear training people can actually use.",
        lead: "Clarifind builds learning tools for teams—videos, eLearning, workshops, mini-sites, and AI support.\nWe start with your goal, choose the right format, and deliver training people can apply right away.",
        ctaPrimary: "Schedule a short call",
        ctaSecondary: "Explore services",
        metrics: {
          goals: {
            value: "Defined goals",
            label: "We align on outcomes and success metrics.",
          },
          formats: {
            value: "Practical formats",
            label: "Choose videos, eLearning, workshops, or hubs.",
          },
          adoption: {
            value: "Adoption focus",
            label: "Built for real workflows, not slide decks.",
          },
        },
        trust: {
          teams: {
            title: "Built for teams",
            text: "Practical learning for education, nonprofit, and public teams.",
          },
          process: {
            title: "Simple process",
            text: "Clear steps from discovery to delivery.",
          },
          results: {
            title: "Measurable results",
            text: "We track progress and improve based on feedback.",
          },
        },
      },
      logoStrip: {
        label: "Trusted by teams in education, nonprofits, and enterprise",
        items: {
          nonprofits: "Nonprofits",
          education: "Education",
          healthcare: "Healthcare",
          publicSector: "Public Sector",
          techTeams: "Tech Teams",
          ngos: "NGOs",
          compliance: "Compliance",
        },
      },
      problem: {
        title: "Training often exists, but it isn’t working.",
        lead: "Teams already have documents and decks, but learners still feel lost or disengaged.\nWithout structure, practice, and feedback, the content doesn’t stick.",
        items: {
          solution: {
            title: "Solution before the problem",
            text: "“We need a course” shows up before goals, audience, and constraints are clear.",
          },
          content: {
            title: "Too much content",
            text: "Important details get buried, so learners tune out.",
          },
          adoption: {
            title: "Low adoption",
            text: "Even good content fails when it doesn’t match day-to-day work.",
          },
        },
      },
      services: {
        title: "Services",
        lead: "Choose the format that fits your goal, audience, and timeline.\nI help you design the right solution and deliver it end to end.",
        tabsLabel: "Service categories",
        tabs: {
          videos: "Learning Videos",
          elearning: "Interactive eLearning",
          courses: "Courses",
          workshops: "Workshops",
          minisites: "Mini-sites",
          ai: "AI Agents",
        },
        videos: {
          title: "Learning Videos",
          lead: "Short, clear explainers for onboarding, processes, or key concepts.",
          items: {
            script: "Script and narrative structure",
            storyboard: "Storyboard guidance",
            production: "Production-ready copy and visuals direction",
          },
          media: {
            label: "Storyboard preview",
            caption: "Animated lower-thirds and clarity cues",
          },
        },
        elearning: {
          title: "eLearning & Interactive Modules",
          lead: "Self-paced learning with practice, feedback, and clear progression.",
          items: {
            architecture: "Module architecture",
            flow: "UX-first learning flow",
            assessments: "Assessments and micro-activities",
          },
          media: {
            label: "Interactive path",
            caption: "Micro-activities, feedback, and checkpoints",
          },
        },
        courses: {
          title: "Courses (online / hybrid)",
          lead: "Structured learning journeys for skills and deeper capability-building.",
          items: {
            curriculum: "Curriculum design",
            sequencing: "Sequencing and pacing",
            retention: "Retention and reinforcement",
          },
          media: {
            label: "Course blueprint",
            caption: "Curriculum arcs with retention touchpoints",
          },
        },
        workshops: {
          title: "Workshops & Live Training",
          lead: "Facilitated sessions that create insight, practice, and behavior change.",
          items: {
            plan: "Facilitation plan",
            exercises: "Exercises and group flow",
            materials: "Trainer notes and participant handouts",
          },
          media: {
            label: "Live session flow",
            caption: "Breakout timing and interactive moments",
          },
        },
        minisites: {
          title: "Mini-sites & Knowledge Hubs",
          lead: "Organized, navigable content for multiple audiences and needs.",
          items: {
            architecture: "Information architecture",
            navigation: "Content structure and navigation",
            mobile: "Mobile-first clarity",
          },
          media: {
            label: "Hub layout",
            caption: "Navigation tiles and content pathways",
          },
        },
        ai: {
          title: "AI Agents for Learning & Support",
          lead: "Goal-driven agents for practice, guidance, and on-demand knowledge access.",
          items: {
            usecase: "Use-case design",
            safety: "Conversation and safety boundaries",
            scaffolding: "Knowledge scaffolding and prompts",
          },
          media: {
            label: "Agent prompts",
            caption: "Guided conversations with guardrails",
          },
        },
      },
      process: {
        title: "How we work",
        lead: "A simple process with clear milestones and regular check-ins.",
        steps: {
          one: {
            title: "1) Set goals and audience",
            text: "Define outcomes, constraints, and what success looks like.",
          },
          two: {
            title: "2) Pick the best format",
            text: "Video, eLearning, workshop, or hub—based on real needs.",
          },
          three: {
            title: "3) Design and build",
            text: "Structure the content, write it, and design the experience.",
          },
          four: {
            title: "4) Test and improve",
            text: "Refine based on usability, comprehension, and real feedback.",
          },
        },
      },
      principles: {
        title: "Design principles that help people learn",
        lead: "Clear structure and gentle guidance keep learners focused and confident.",
        items: {
          clarity: {
            title: "Clarity and feedback",
            text: "Every step shows what to do next and how progress is going.",
          },
          structure: {
            title: "Consistent structure",
            text: "Predictable layout and language help people move faster.",
          },
          practice: {
            title: "Guided practice",
            text: "Examples and cues reduce effort and build confidence.",
          },
        },
      },
      useCases: {
        title: "Where this helps most",
        lead: "Common situations where teams ask for support.",
        items: {
          onboarding: {
            title: "Onboarding & role readiness",
            text: "Reduce ramp-up time with clear, structured training that respects busy schedules.",
          },
          knowledge: {
            title: "Knowledge stuck in experts",
            text: "Turn tacit know-how into tools other people can use quickly.",
          },
          compliance: {
            title: "Process & compliance training",
            text: "Create practical training and reinforcement that people will follow on the job.",
          },
          ai: {
            title: "Scaling facilitation with AI",
            text: "Use AI for practice, Q&A, and guidance with clear boundaries.",
          },
        },
      },
      projects: {
        title: "Projects",
        lead: "A short look at recent work. Explore the full list for more examples.",
        actions: {
          view: "View project",
          visit: "Visit project",
          viewAll: "View all projects",
        },
        items: {
          bass: {
            alt: "Preview of the Bass Clef Trainer practice tool",
            text: "A practice tool that helps learners build bass-clef sight-reading skills quickly.",
            tags: {
              tool: "Practice tool",
              music: "Music learning",
            },
          },
          aliyah: {
            alt: "Preview of the Aliyah learning platform",
            text: "A bilingual learning hub that guides new immigrants through essential steps and resources.",
            tags: {
              platform: "Learning platform",
              ux: "UX writing",
            },
          },
          jafi: {
            alt: "Preview of the JAFI AI training partner interface",
            text: "A guided practice experience that pairs learners with an AI coach before real conversations.",
            tags: {
              ai: "AI coaching",
              practice: "Skill practice",
            },
          },
        },
      },
      about: {
        title: "About",
        lead: "I help teams turn complex knowledge into clear, usable learning.\nMy work blends content strategy, UX, and practical training design.",
        location: "Based in Israel • Working with organizations, NGOs, educators, and teams.",
        stats: {
          strength: {
            title: "Strength",
            value: "Clarity and structure",
          },
          approach: {
            title: "Approach",
            value: "Goal-first learning design",
          },
          deliverables: {
            title: "Deliverables",
            value: "Clear scope, delivery-ready assets",
          },
        },
      },
      contact: {
        title: "Tell me what you need",
        lead: "If training isn’t landing, let’s talk.\nWe’ll clarify the goal, audience, and the right format for your team.",
        discounts: "Discounts are available for small businesses, nonprofits, and reserve veterans’ businesses.",
        chips: {
          onboarding: "Onboarding",
          workshops: "Workshops",
          elearning: "eLearning",
          minisites: "Mini-sites",
          ai: "AI agents",
        },
        email: {
          prefix: "Prefer email?",
        },
        form: {
          nameLabel: "Name",
          namePlaceholder: "Your name",
          emailLabel: "Email",
          emailPlaceholder: "name@company.com",
          messageLabel: "What do you need help with?",
          messagePlaceholder: "Tell me about your audience, topic, and goal.",
          submit: "Send",
          hint: "This demo form doesn’t send yet. I can connect it using Formspree or Netlify.",
        },
      },
      footer: {
        rights: {
          prefix: "©",
          suffix: "Clarifind. All rights reserved.",
        },
      },
    },
    he: {
      meta: {
        title: "Clarifind | פתרונות למידה",
        description: "Clarifind מפתחת פתרונות למידה מותאמים—סרטונים, eLearning, קורסים, סדנאות, מיני־אתרים וסוכני AI—בהתאם למטרות הלמידה שלכם.",
        ogDescription: "Clarifind בונה פתרונות למידה ממוקדי מטרה, מסרטונים ו‑eLearning ועד סדנאות, מיני־אתרים וסוכני AI.",
      },
      skip: "דלג לתוכן",
      brand: {
        home: "בית Clarifind",
        logoAlt: "לוגו Clarifind",
        tag: "פתרונות למידה",
      },
      nav: {
        label: "תפריט ראשי",
        services: "שירותים",
        process: "תהליך",
        useCases: "מקרי שימוש",
        projects: "פרויקטים",
        about: "אודות",
        contact: "צור קשר",
        openMenu: "פתיחת תפריט",
      },
      language: {
        label: "שפה",
      },
      theme: {
        dark: "מצב כהה",
        light: "מצב בהיר",
      },
      hero: {
        pill: "עיצוב למידה • תוכן הדרכה • תמיכת AI",
        title: "הדרכה ברורה שאנשים באמת משתמשים בה.",
        lead: "Clarifind בונה כלי למידה לצוותים—סרטונים, eLearning, סדנאות, מיני־אתרים ותמיכת AI.\nאנחנו מתחילים במטרה שלך, בוחרים את הפורמט הנכון ומספקים הדרכה שאנשים יכולים ליישם מיד.",
        ctaPrimary: "תיאום שיחה קצרה",
        ctaSecondary: "לגלות את השירותים",
        metrics: {
          goals: {
            value: "מטרות מוגדרות",
            label: "אנחנו מיישרים קו על תוצאות ומדדי הצלחה.",
          },
          formats: {
            value: "פורמטים פרקטיים",
            label: "בחרו סרטונים, eLearning, סדנאות או מרכזי ידע.",
          },
          adoption: {
            value: "מיקוד באימוץ",
            label: "נבנה לעבודה היומיומית, לא למצגות.",
          },
        },
        trust: {
          teams: {
            title: "נבנה לצוותים",
            text: "למידה מעשית לצוותי חינוך, עמותות וציבור.",
          },
          process: {
            title: "תהליך פשוט",
            text: "שלבים ברורים מגילוי ועד מסירה.",
          },
          results: {
            title: "תוצאות מדידות",
            text: "עוקבים אחרי התקדמות ומשפרים לפי משוב.",
          },
        },
      },
      logoStrip: {
        label: "אמון מצד צוותים בחינוך, עמותות וארגונים",
        items: {
          nonprofits: "עמותות",
          education: "חינוך",
          healthcare: "בריאות",
          publicSector: "מגזר ציבורי",
          techTeams: "צוותי טכנולוגיה",
          ngos: "ארגונים לא ממשלתיים",
          compliance: "ציות",
        },
      },
      problem: {
        title: "הדרכה קיימת, אבל היא לא עובדת.",
        lead: "לצוותים כבר יש מסמכים ומצגות, אבל הלומדים עדיין מרגישים אבודים או מנותקים.\nבלי מבנה, תרגול ומשוב, התוכן לא נטמע.",
        items: {
          solution: {
            title: "פתרון לפני הבעיה",
            text: "“אנחנו צריכים קורס” עולה לפני שמטרות, קהל ואילוצים ברורים.",
          },
          content: {
            title: "יותר מדי תוכן",
            text: "פרטים חשובים נקברים, והלומדים מאבדים קשב.",
          },
          adoption: {
            title: "אימוץ נמוך",
            text: "גם תוכן טוב נכשל אם הוא לא מתאים לעבודה היומיומית.",
          },
        },
      },
      services: {
        title: "שירותים",
        lead: "בחרו את הפורמט שמתאים למטרה, לקהל ולזמן שלכם.\nאני עוזר לעצב את הפתרון הנכון ולספק אותו מקצה לקצה.",
        tabsLabel: "קטגוריות שירות",
        tabs: {
          videos: "סרטוני למידה",
          elearning: "eLearning אינטראקטיבי",
          courses: "קורסים",
          workshops: "סדנאות",
          minisites: "מיני־אתרים",
          ai: "סוכני AI",
        },
        videos: {
          title: "סרטוני למידה",
          lead: "מסבירים קצרים וברורים לחניכה, תהליכים או מושגים מרכזיים.",
          items: {
            script: "תסריט ומבנה נרטיבי",
            storyboard: "הנחיית סטוריבורד",
            production: "טקסט מוכן להפקה וכיוון ויזואלי",
          },
          media: {
            label: "תצוגת סטוריבורד",
            caption: "כתוביות מונפשות וסימני בהירות",
          },
        },
        elearning: {
          title: "מודולי eLearning אינטראקטיביים",
          lead: "למידה בקצב עצמי עם תרגול, משוב והתקדמות ברורה.",
          items: {
            architecture: "ארכיטקטורת מודולים",
            flow: "זרימת למידה ממוקדת UX",
            assessments: "מבדקים ומיקרו־פעילויות",
          },
          media: {
            label: "מסלול אינטראקטיבי",
            caption: "מיקרו־פעילויות, משוב ונקודות בקרה",
          },
        },
        courses: {
          title: "קורסים (אונליין / היברידי)",
          lead: "מסעות למידה מובנים לפיתוח מיומנויות ויכולת עמוקה.",
          items: {
            curriculum: "עיצוב תוכנית לימודים",
            sequencing: "רצף וקצב",
            retention: "שימור וחיזוק",
          },
          media: {
            label: "תכנית קורס",
            caption: "קשתות תוכן עם נקודות חיזוק",
          },
        },
        workshops: {
          title: "סדנאות והדרכות חיות",
          lead: "מפגשים מונחים שמייצרים תובנה, תרגול ושינוי התנהגות.",
          items: {
            plan: "תוכנית הנחיה",
            exercises: "תרגילים וזרימת קבוצה",
            materials: "הערות למנחה וחומרים למשתתפים",
          },
          media: {
            label: "זרימת מפגש חי",
            caption: "תזמון חלוקה ורגעים אינטראקטיביים",
          },
        },
        minisites: {
          title: "מיני־אתרים ומרכזי ידע",
          lead: "תוכן מאורגן ונגיש לקהלים וצרכים שונים.",
          items: {
            architecture: "ארכיטקטורת מידע",
            navigation: "מבנה תוכן וניווט",
            mobile: "בהירות מובייל־פירסט",
          },
          media: {
            label: "פריסת מרכז ידע",
            caption: "אריחי ניווט ומסלולי תוכן",
          },
        },
        ai: {
          title: "סוכני AI ללמידה ותמיכה",
          lead: "סוכנים ממוקדי מטרה לתרגול, הכוונה וגישה לידע לפי דרישה.",
          items: {
            usecase: "עיצוב מקרי שימוש",
            safety: "שיחות וגבולות בטיחות",
            scaffolding: "פיגומי ידע והנחיות",
          },
          media: {
            label: "הנחיות לסוכן",
            caption: "שיחות מודרכות עם מעקות בטיחות",
          },
        },
      },
      process: {
        title: "כך אנחנו עובדים",
        lead: "תהליך פשוט עם אבני דרך ברורות ובדיקות תקופתיות.",
        steps: {
          one: {
            title: "1) הגדרת מטרות וקהל",
            text: "מגדירים תוצאות, אילוצים ומה נראה כהצלחה.",
          },
          two: {
            title: "2) בחירת הפורמט המתאים",
            text: "סרטון, eLearning, סדנה או מרכז ידע—בהתאם לצרכים אמיתיים.",
          },
          three: {
            title: "3) עיצוב ובנייה",
            text: "מבנים את התוכן, כותבים אותו ומעצבים את החוויה.",
          },
          four: {
            title: "4) בדיקה ושיפור",
            text: "מחדדים לפי שימושיות, הבנה ומשוב אמיתי.",
          },
        },
      },
      principles: {
        title: "עקרונות עיצוב שעוזרים ללמוד",
        lead: "מבנה ברור והכוונה עדינה שומרים על מיקוד וביטחון.",
        items: {
          clarity: {
            title: "בהירות ומשוב",
            text: "כל שלב מראה מה לעשות בהמשך ואיך ההתקדמות.",
          },
          structure: {
            title: "מבנה עקבי",
            text: "פריסה ושפה צפויות עוזרות להתקדם מהר.",
          },
          practice: {
            title: "תרגול מונחה",
            text: "דוגמאות ורמזים מפחיתים מאמץ ובונים ביטחון.",
          },
        },
      },
      useCases: {
        title: "היכן זה עוזר במיוחד",
        lead: "מצבים נפוצים שבהם צוותים מבקשים תמיכה.",
        items: {
          onboarding: {
            title: "חניכה ומוכנות לתפקיד",
            text: "צמצום זמן כניסה עם הדרכה ברורה ומובנית שמכבדת לוחות זמנים.",
          },
          knowledge: {
            title: "ידע שנשאר אצל מומחים",
            text: "הפיכת ידע סמוי לכלים שאחרים יכולים להשתמש בהם במהירות.",
          },
          compliance: {
            title: "הדרכת תהליכים וציות",
            text: "יצירת הדרכה מעשית וחיזוק שאנשים יישמו בעבודה.",
          },
          ai: {
            title: "הרחבת הנחיה בעזרת AI",
            text: "שימוש ב‑AI לתרגול, שאלות ותשובות והכוונה עם גבולות ברורים.",
          },
        },
      },
      projects: {
        title: "פרויקטים",
        lead: "מבט קצר על עבודה אחרונה. אפשר לראות את הרשימה המלאה לעוד דוגמאות.",
        actions: {
          view: "צפייה בפרויקט",
          visit: "ביקור בפרויקט",
          viewAll: "צפייה בכל הפרויקטים",
        },
        items: {
          bass: {
            alt: "תצוגה מקדימה של כלי התרגול Bass Clef Trainer",
            text: "כלי תרגול שעוזר ללומדים לפתח במהירות מיומנויות קריאת תווים במפתח בס.",
            tags: {
              tool: "כלי תרגול",
              music: "למידת מוזיקה",
            },
          },
          aliyah: {
            alt: "תצוגה מקדימה של פלטפורמת הלמידה Aliyah",
            text: "מרכז למידה דו-לשוני שמנחה עולים חדשים בשלבים ובמשאבים החיוניים.",
            tags: {
              platform: "פלטפורמת למידה",
              ux: "כתיבת UX",
            },
          },
          jafi: {
            alt: "תצוגה מקדימה של ממשק האימון JAFI AI Training Partner",
            text: "חוויית תרגול מודרכת שמחברת בין לומדים למאמן AI לפני שיחות אמיתיות.",
            tags: {
              ai: "אימון AI",
              practice: "תרגול מיומנויות",
            },
          },
        },
      },
      about: {
        title: "אודות",
        lead: "אני מסייע לצוותים להפוך ידע מורכב ללמידה ברורה ושימושית.\nהעבודה שלי משלבת אסטרטגיית תוכן, UX ועיצוב הדרכה מעשי.",
        location: "מבוסס בישראל • עובד עם ארגונים, עמותות, אנשי חינוך וצוותים.",
        stats: {
          strength: {
            title: "חוזקה",
            value: "בהירות ומבנה",
          },
          approach: {
            title: "גישה",
            value: "עיצוב למידה ממוקד מטרה",
          },
          deliverables: {
            title: "תוצרים",
            value: "היקף ברור ונכסים מוכנים למסירה",
          },
        },
      },
      contact: {
        title: "ספרו לי מה צריך",
        lead: "אם ההדרכה לא עובדת, בואו נדבר.\nנבהיר את המטרה, הקהל והפורמט הנכון לצוות שלכם.",
        discounts: "הנחות זמינות לעסקים קטנים, עמותות ועסקים של אנשי מילואים.",
        chips: {
          onboarding: "חניכה",
          workshops: "סדנאות",
          elearning: "eLearning",
          minisites: "מיני־אתרים",
          ai: "סוכני AI",
        },
        email: {
          prefix: "מעדיפים אימייל?",
        },
        form: {
          nameLabel: "שם",
          namePlaceholder: "השם שלך",
          emailLabel: "אימייל",
          emailPlaceholder: "name@company.com",
          messageLabel: "במה צריך עזרה?",
          messagePlaceholder: "ספרו לי על הקהל, הנושא והמטרה שלכם.",
          submit: "שליחה",
          hint: "טופס הדמו הזה עדיין לא שולח. אפשר לחבר אותו באמצעות Formspree או Netlify.",
        },
      },
      footer: {
        rights: {
          prefix: "©",
          suffix: "Clarifind. כל הזכויות שמורות.",
        },
      },
    },
  };

  const themeToggles = [themeToggle, themeToggleMobile].filter(Boolean);
  let currentLanguage = "en";

  const getTranslation = (key, language) => {
    const lookup = (lang) => key.split(".").reduce((acc, part) => (acc ? acc[part] : null), translations[lang]);
    return lookup(language) || lookup("en") || "";
  };

  const applyTranslations = (language) => {
    currentLanguage = language;
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "he" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const text = getTranslation(key, language);
      if (text) {
        el.textContent = text;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const mappings = el.dataset.i18nAttr.split(";").map((item) => item.trim()).filter(Boolean);
      mappings.forEach((mapping) => {
        const [attr, key] = mapping.split(":");
        if (!attr || !key) return;
        const value = getTranslation(key.trim(), language);
        if (value) {
          el.setAttribute(attr.trim(), value);
        }
      });
    });

    const currentTheme = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
    updateThemeToggleText(currentTheme);
  };

  const setLanguage = (language) => {
    const normalized = translations[language] ? language : "en";
    applyTranslations(normalized);
    languageSelectors.forEach((select) => {
      select.value = normalized;
    });
    localStorage.setItem("language", normalized);
  };

  const getPreferredTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setToggleLabel = (toggle, text) => {
    const label = toggle.querySelector(".toggle__label");
    if (label) {
      label.textContent = text;
    } else {
      toggle.textContent = text;
    }
  };

  const updateThemeToggleText = (theme) => {
    const textKey = theme === "dark" ? "theme.light" : "theme.dark";
    const text = getTranslation(textKey, currentLanguage);
    themeToggles.forEach((toggle) => {
      setToggleLabel(toggle, text);
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    });
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeToggleText(theme);
  };

  if (year) year.textContent = String(new Date().getFullYear());

  const storedLanguage = localStorage.getItem("language");
  const initialLanguage = storedLanguage || document.documentElement.getAttribute("lang") || "en";
  setLanguage(initialLanguage);

  languageSelectors.forEach((select) => {
    select.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  });

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
      if (!isOpen) {
        header?.classList.remove("header--hidden");
      }
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      }
    });
  }

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });

  setTheme(getPreferredTheme());

  if (header) {
    const mobileMedia = window.matchMedia("(max-width: 980px)");
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = mobileMedia.matches && isScrollingDown && currentScrollY > 80;

      if (!burger || burger.getAttribute("aria-expanded") !== "true") {
        header.classList.toggle("header--hidden", shouldHide);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    });

    mobileMedia.addEventListener("change", () => {
      header.classList.remove("header--hidden");
      lastScrollY = window.scrollY;
    });
  }

  const servicesRoot = document.querySelector("[data-services]");
  if (servicesRoot) {
    const tabs = servicesRoot.querySelectorAll(".services__tab");
    const panels = servicesRoot.querySelectorAll(".services__panel");

    const activateService = (targetId) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.service === targetId;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateService(tab.dataset.service);
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const parallaxTarget = document.querySelector("[data-hero-parallax]");
  if (parallaxTarget && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let targetX = 0;
    let targetY = 0;
    let frame = null;

    const updateParallax = () => {
      parallaxTarget.style.setProperty("--parallax-x", `${targetX}px`);
      parallaxTarget.style.setProperty("--parallax-y", `${targetY}px`);
      frame = null;
    };

    const handleMove = (event) => {
      const rect = parallaxTarget.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = relativeX * 12;
      targetY = relativeY * 10;
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    const resetParallax = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    parallaxTarget.addEventListener("mousemove", handleMove);
    parallaxTarget.addEventListener("mouseleave", resetParallax);
  }

})();

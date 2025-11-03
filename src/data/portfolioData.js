// Portfolio data with all the missing concepts filled in
export const portfolioData = {
  personal: {
    name: "Mohammed Sidhiq M",
    title: "Software Developer & Full Stack Engineer",
    tagline: "Building high-impact web and mobile applications with clean code and intuitive design",
    bio: "Dynamic and results-driven Software Developer with extensive expertise in Python, specializing in the development of high-impact mobile and web applications that enhance performance and elevate user experience. Committed to writing clean, efficient code while employing innovative problem-solving techniques to address complex challenges. Strong advocate for creating intuitive and scalable solutions that align with user needs and drive business success. Proven track record of effective collaboration within teams, consistently delivering projects on time and exceeding expectations.",
    email: "msidhiq335@gmail.com",
    phone: "+91 9566808659",
    location: "Tamil Nadu, India",
    resume: "/assets/MOHAMMED SIDHIQ M Resume.pdf",
    avatar: process.env.PUBLIC_URL + "/assets/sid-pro.png",
    yearsOfExperience: 1,
  },

  social: {
    github: "https://github.com/mohammedsidhiq",
    linkedin: "https://www.linkedin.com/in/mohammedsidhiq",
    twitter: "https://twitter.com/mohammedsidhiq",
    instagram: "https://www.instagram.com/sidhiq_78?igsh=MXVwZWRrbW9wcW80ZA==",
    dribbble: "https://dribbble.com/mohammedsidhiq",
    youtube: "https://youtube.com/@mohammedsidhiq",
  },

  skills: [
    { name: "Python", level: 80, category: "Programming", icon: "🐍" },
    { name: "Python (Django)", level: 75, category: "Backend", icon: "🌟" },
    { name: "HTML", level: 80, category: "Frontend", icon: "🌐" },
    { name: "CSS", level: 60, category: "Frontend", icon: "🎨" },
    { name: "PHP", level: 80, category: "Backend", icon: "💜" },
    { name: "SQL", level: 80, category: "Database", icon: "🗄️" },
    { name: "Java", level: 75, category: "Backend", icon: "☕" },
    { name: "AWS", level: 70, category: "Cloud", icon: "☁️" },
    { name: "MS Office", level: 70, category: "Tools", icon: "📊" },
    { name: "JavaScript", level: 70, category: "Programming", icon: "🟨" },
    { name: "Git", level: 65, category: "Tools", icon: "📂" },
    { name: "Bootstrap", level: 75, category: "Frontend", icon: "💨" },
    { name: "Firebase", level: 70, category: "Database", icon: "🔥" },
    { name: "Flutter", level: 75, category: "Mobile", icon: "📱" },
    { name: "Problem Solving", level: 85, category: "Soft Skills", icon: "🧩" },
  ],

  languages: [
    { name: "English", level: 85, type: "Professional" },
    { name: "Tamil", level: 100, type: "Native" },
    { name: "Hindi", level: 80, type: "Conversational" },
    { name: "Urdu", level: 100, type: "Native" },
  ],

  certifications: [
    {
      name: "Full-Stack Developer Certification",
      issuer: "Professional Development",
      date: "March 2024",
      link: "#",
    },
    {
      name: "Diploma in Computer Applications (DCA)",
      issuer: "Professional Certification",
      date: "June 2023",
      link: "#",
    },
  ],

  achievements: [
    {
      title: "MCA Academic Excellence",
      description: "Achieved CGPA of 8.6/10 in Master of Computer Applications program",
      year: "2024-2026",
      icon: "🎓",
    },
    {
      title: "Time's Up App Development",
      description: "Successfully developed and deployed cross-platform mobile application",
      year: "2024",
      icon: "📱",
    },
    {
      title: "Full-Stack Certification",
      description: "Completed comprehensive full-stack development training",
      year: "2024",
      icon: "🏆",
    },
    {
      title: "Bachelor's Degree Completion",
      description: "Completed B.Sc Computer Science with CGPA of 7.8/10",
      year: "2024",
      icon: "🎓",
    },
  ],

  workExperience: [
    {
      id: 1,
      company: "Codveda Technologies",
      position: "Python Development Intern",
      location: "Chandrapur, Maharashtra, India",
      type: "Remote",
      startDate: "September 2025",
      endDate: "October 2025",
      description: "Involved in designing, developing, and maintaining Python-based software applications. Collaborated with the team to write clean, efficient, and reusable code. Supported debugging, testing, and performance optimization of existing modules. Enhanced technical skills in Python programming, problem-solving, and software development workflows.",
      responsibilities: [
        "Designed, developed, and maintained Python-based software applications",
        "Collaborated with team members to write clean, efficient, and reusable code",
        "Supported debugging, testing, and performance optimization of existing modules",
        "Enhanced technical skills in Python programming and software development workflows"
      ],
      technologies: ["Python", "Software Development", "Debugging", "Testing", "Performance Optimization"],
      current: false
    },
    {
      id: 2,
      company: "Viswa Digital Technology",
      position: "Data Science and Machine Learning Intern",
      location: "Salem, Tamilnadu",
      type: "Remote",
      startDate: "May 2025",
      endDate: "June 2025",
      description: "Completed internship training focused on Data Science and Machine Learning concepts and applications. Gained hands-on experience with data preprocessing, model development, and evaluation techniques. Worked on implementing Python-based ML algorithms for data analysis and predictive modeling. Strengthened knowledge in statistical analysis, data visualization, and problem-solving.",
      responsibilities: [
        "Completed comprehensive training in Data Science and Machine Learning concepts",
        "Gained hands-on experience with data preprocessing and model development",
        "Implemented Python-based ML algorithms for data analysis and predictive modeling",
        "Strengthened knowledge in statistical analysis and data visualization"
      ],
      technologies: ["Python", "Data Science", "Machine Learning", "Statistical Analysis", "Data Visualization", "Predictive Modeling"],
      current: false
    }
  ],

  timeline: [
    {
      year: "2025",
      title: "Python Development Intern",
      company: "Codveda Technologies",
      description: "Designing and maintaining Python-based software applications with focus on clean code and performance optimization",
      type: "work",
    },
    {
      year: "2025",
      title: "Data Science and ML Intern",
      company: "Viswa Digital Technology",
      description: "Hands-on experience with ML algorithms, data preprocessing, and predictive modeling",
      type: "work",
    },
    {
      year: "2024",
      title: "Master of Computer Applications",
      company: "Periyar University, Salem",
      description: "Started MCA program focusing on advanced computer applications",
      type: "education",
    },
    {
      year: "2024",
      title: "Bachelor of Computer Science",
      company: "Sacred Heart College, Tirupattur",
      description: "Completed B.Sc CS with CGPA: 7/10",
      type: "education",
    },
    {
      year: "2024",
      title: "Full-Stack Developer Certification",
      company: "Professional Development",
      description: "Completed comprehensive full-stack development training",
      type: "achievement",
    },
    
    {
      year: "2023",
      title: "Diploma in Computer Applications",
      company: "Professional Certification",
      description: "Enhanced computer application skills and knowledge",
      type: "achievement",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Time's Up Mobile App",
      description: "Cross-platform mobile application for student attendance management",
      longDescription: "Developed a cross-platform mobile application using Flutter and Firebase to manage student attendance. Implemented user authentication, real-time database, and an intuitive UI to improve task efficiency.",
      image: "/assets/project1.jpg",
      tags: ["Flutter", "Firebase", "Mobile Development", "Real-time Database"],
      category: "Mobile",
      github: "https://github.com/mohammedsidhiq/times-up-app",
      demo: "#",
      featured: true,
      caseStudy: {
        challenge: "Creating an efficient attendance management system for educational institutions.",
        solution: "Built cross-platform mobile app with Firebase backend for real-time data synchronization.",
        results: "Improved attendance tracking efficiency and provided intuitive user interface.",
        technologies: ["Flutter", "Firebase", "Dart", "Authentication"],
        duration: "2 months",
        team: "Individual project",
      },
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing skills and projects",
      longDescription: "Created a responsive portfolio website using HTML, CSS, and JavaScript with Bootstrap framework. Features smooth animations and modern design.",
      image: "/assets/project2.jpg",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      category: "Web",
      github: "https://github.com/mohammedsidhiq/portfolio",
      demo: "#",
      featured: true,
      caseStudy: {
        challenge: "Designing a professional portfolio to showcase technical skills and projects.",
        solution: "Built responsive website with modern design and smooth user experience.",
        results: "Created effective personal branding and project showcase platform.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
        duration: "1 month",
        team: "Individual project",
      },
    },
    {
      id: 3,
      title: "Web Development Projects",
      description: "Various web development projects using PHP and SQL",
      longDescription: "Multiple web development projects demonstrating proficiency in PHP, SQL, and database management. Focus on creating dynamic web applications with database integration.",
      image: "/assets/project3.jpg",
      tags: ["PHP", "SQL", "MySQL", "Web Development"],
      category: "Web",
      github: "https://github.com/mohammedsidhiq",
      demo: "#",
      featured: false,
      caseStudy: {
        challenge: "Building dynamic web applications with database functionality.",
        solution: "Utilized PHP for server-side logic and MySQL for data management.",
        results: "Successfully created functional web applications with CRUD operations.",
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        duration: "Ongoing",
        team: "Individual projects",
      },
    },
  ],

  blogPosts: [
    {
      id: 1,
      title: "Building Cross-Platform Mobile Apps with Flutter",
      excerpt: "A comprehensive guide to developing mobile applications using Flutter framework and Firebase backend integration.",
      content: "Flutter has revolutionized mobile app development...",
      author: "Mohammed Sidhiq M",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Flutter", "Mobile Development", "Firebase"],
      image: "/assets/blog1.jpg",
      slug: "flutter-mobile-apps",
    },
    {
      id: 2,
      title: "Python Web Development: From Basics to Advanced",
      excerpt: "Exploring Python web development frameworks and best practices for creating robust web applications.",
      content: "Python remains one of the most popular programming languages for web development...",
      author: "Mohammed Sidhiq M",
      date: "2024-01-08",
      readTime: "12 min read",
      tags: ["AI", "Web Development", "Future Tech"],
      image: "/assets/blog2.jpg",
      slug: "ai-web-development-future",
    },
    
    /*{
      id: 3,
      title: "Microservices vs Monoliths: Making the Right Choice",
      excerpt: "A comprehensive guide to choosing between microservices and monolithic architecture for your next project.",
      content: "Full article content here...",
      author: "Mohammed Sidhiq M",
      date: "2024-01-01",
      readTime: "10 min read",
      tags: ["Architecture", "Microservices", "Backend"],
      image: "/assets/blog3.jpg",
      slug: "microservices-vs-monoliths",
    },*/
  ],

  services: [
    {
      title: "Web Development",
      description: "Creating responsive and engaging websites tailored to user needs",
      icon: "💻",
      features: ["HTML/CSS", "JavaScript", "PHP", "Bootstrap", "Responsive Design"],
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using Flutter and Firebase",
      icon: "📱",
      features: ["Flutter", "Firebase", "User Authentication", "Real-time Database", "UI/UX"],
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing designs that enhance user experience",
      icon: "🎨",
      features: ["User Interface Design", "User Experience", "Prototyping", "Visual Design"],
    },
    {
      title: "Database Management",
      description: "Efficient database design and SQL optimization for robust applications",
      icon: "�️",
      features: ["SQL", "MySQL", "Database Design", "Data Optimization", "Query Performance"],
    },
  ],

  interests: [
    {
      name: "Mobile App Development",
      description: "Passionate about creating innovative mobile solutions",
      icon: "📱",
    },
    {
      name: "Web Technologies",
      description: "Staying updated with latest web development trends",
      icon: "🌐",
    },
    {
      name: "Open Source",
      description: "Contributing to open source projects and community",
      icon: "🔓",
    },
    {
      name: "Problem Solving",
      description: "Enjoy tackling complex programming challenges",
      icon: "🧩",
    },
    {
      name: "Continuous Learning",
      description: "Always learning new technologies and best practices",
      icon: "📚",
    },
  ],

  personalDetails: {
    dateOfBirth: "Available upon request",
    nationality: "Indian",
    maritalStatus: "Single",
    workAuthorization: "Authorized to work in India",
    availability: "Available for immediate joining",
    preferredLocation: "Tamil Nadu, India (Open to relocation)",
  },
};

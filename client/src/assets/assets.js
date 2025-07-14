// src/assets/index.js - LMS Course Data

// Company logos
import microsoft from './microsoft.png'
import accenture from './accenture.png'
import adobe from './adobe.png'
import paypal from './paypal.png'
import walmart from './walmart.png'
import academy from './academy.png'

import star from './star.png'
import arrow from './arrow.png'

const dummyTestimonial = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.5,
    feedback: "This platform transformed my career. The courses are well-structured and easy to follow."
  },
  {
    name: "Mark Thompson",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    feedback: "Excellent content and instructors. I landed my dream job thanks to these courses."
  },
  {
    name: "Sophia Lee",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    feedback: "The hands-on projects helped me build a strong portfolio. Highly recommend!"
  }
]

// Dummy course data without thumbnail and instructor avatar references
const dummyCourses = [
  {
    id: 1,
    title: "Complete JavaScript Mastery",
    description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern web development.",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "40 hours",
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    totalRatings: 2847,
    studentsEnrolled: 15420,
    instructor: {
      name: "John Doe",
      title: "Senior JavaScript Developer",
      experience: "8+ years"
    },
    features: [
      "40+ hours of video content",
      "50+ coding exercises",
      "Real-world projects",
      "Certificate of completion",
      "Lifetime access"
    ],
    curriculum: [
      {
        section: "JavaScript Fundamentals",
        lessons: 12,
        duration: "8 hours",
        topics: ["Variables & Data Types", "Functions", "Control Flow", "Arrays & Objects"]
      },
      {
        section: "Advanced JavaScript",
        lessons: 15,
        duration: "12 hours",
        topics: ["Closures", "Prototypes", "Async/Await", "Modules"]
      },
      {
        section: "DOM Manipulation",
        lessons: 10,
        duration: "8 hours",
        topics: ["Event Handling", "Dynamic Content", "Form Validation"]
      },
      {
        section: "Modern JavaScript",
        lessons: 18,
        duration: "12 hours",
        topics: ["ES6+ Features", "Webpack", "Testing", "Performance"]
      }
    ],
    tags: ["JavaScript", "Web Development", "Programming", "Frontend"],
    isPopular: true,
    isBestseller: true,
    lastUpdated: "2024-03-15",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 2,
    title: "Python for Data Science & AI",
    description: "Learn Python programming with focus on data science, machine learning, and artificial intelligence applications.",
    category: "Data Science",
    level: "Beginner",
    duration: "35 hours",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    totalRatings: 1925,
    studentsEnrolled: 8750,
    instructor: {
      name: "Jane Smith",
      title: "Data Scientist & AI Engineer",
      experience: "10+ years"
    },
    features: [
      "35+ hours of content",
      "Hands-on projects",
      "Industry datasets",
      "Python libraries mastery",
      "Job placement support"
    ],
    curriculum: [
      {
        section: "Python Basics",
        lessons: 14,
        duration: "10 hours",
        topics: ["Syntax", "Data Structures", "Functions", "OOP"]
      },
      {
        section: "Data Analysis",
        lessons: 12,
        duration: "10 hours",
        topics: ["Pandas", "NumPy", "Data Cleaning", "Visualization"]
      },
      {
        section: "Machine Learning",
        lessons: 16,
        duration: "12 hours",
        topics: ["Scikit-learn", "Algorithms", "Model Evaluation"]
      },
      {
        section: "AI & Deep Learning",
        lessons: 8,
        duration: "8 hours",
        topics: ["TensorFlow", "Neural Networks", "Computer Vision"]
      }
    ],
    tags: ["Python", "Data Science", "Machine Learning", "AI"],
    isPopular: true,
    isBestseller: false,
    lastUpdated: "2024-02-28",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 3,
    title: "React.js Complete Course",
    description: "Build modern web applications with React.js, hooks, context API, and popular libraries in the ecosystem.",
    category: "Frontend Development",
    level: "Intermediate",
    duration: "45 hours",
    price: 99.99,
    originalPrice: 179.99,
    rating: 4.9,
    totalRatings: 3241,
    studentsEnrolled: 12680,
    instructor: {
      name: "Mike Brown",
      title: "React Developer & Tech Lead",
      experience: "6+ years"
    },
    features: [
      "45+ hours of content",
      "Build 5+ real projects",
      "Modern React patterns",
      "Testing strategies",
      "Deployment guide"
    ],
    curriculum: [
      {
        section: "React Fundamentals",
        lessons: 16,
        duration: "12 hours",
        topics: ["Components", "Props", "State", "Event Handling"]
      },
      {
        section: "Advanced React",
        lessons: 20,
        duration: "15 hours",
        topics: ["Hooks", "Context API", "Performance", "Patterns"]
      },
      {
        section: "React Ecosystem",
        lessons: 14,
        duration: "10 hours",
        topics: ["React Router", "Redux", "Styled Components", "Testing"]
      },
      {
        section: "Real-world Projects",
        lessons: 18,
        duration: "18 hours",
        topics: ["E-commerce App", "Social Media App", "Dashboard"]
      }
    ],
    tags: ["React", "Frontend", "JavaScript", "Web Development"],
    isPopular: true,
    isBestseller: true,
    lastUpdated: "2024-03-10",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Master server-side development with Node.js, Express, databases, and API development.",
    category: "Backend Development",
    level: "Intermediate",
    duration: "38 hours",
    price: 94.99,
    originalPrice: 159.99,
    rating: 4.6,
    totalRatings: 1567,
    studentsEnrolled: 6890,
    instructor: {
      name: "Sarah Wilson",
      title: "Full Stack Developer",
      experience: "7+ years"
    },
    features: [
      "38+ hours of content",
      "REST & GraphQL APIs",
      "Database integration",
      "Authentication & security",
      "Production deployment"
    ],
    curriculum: [
      {
        section: "Node.js Basics",
        lessons: 12,
        duration: "9 hours",
        topics: ["Node.js Core", "NPM", "File System", "Events"]
      },
      {
        section: "Express.js Framework",
        lessons: 15,
        duration: "12 hours",
        topics: ["Routing", "Middleware", "Template Engines", "Error Handling"]
      },
      {
        section: "Database & APIs",
        lessons: 16,
        duration: "13 hours",
        topics: ["MongoDB", "MySQL", "REST APIs", "GraphQL"]
      },
      {
        section: "Advanced Topics",
        lessons: 10,
        duration: "8 hours",
        topics: ["Authentication", "Security", "Testing", "Deployment"]
      }
    ],
    tags: ["Node.js", "Backend", "JavaScript", "API Development"],
    isPopular: false,
    isBestseller: false,
    lastUpdated: "2024-02-15",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 5,
    title: "Full Stack Web Development Bootcamp",
    description: "Complete web development course covering frontend, backend, databases, and deployment.",
    category: "Full Stack Development",
    level: "Beginner to Advanced",
    duration: "80 hours",
    price: 149.99,
    originalPrice: 299.99,
    rating: 4.8,
    totalRatings: 4521,
    studentsEnrolled: 23450,
    instructor: {
      name: "John Doe",
      title: "Senior Full Stack Developer",
      experience: "8+ years"
    },
    features: [
      "80+ hours of content",
      "Complete portfolio projects",
      "Industry best practices",
      "Job interview preparation",
      "Career guidance"
    ],
    curriculum: [
      {
        section: "Frontend Development",
        lessons: 25,
        duration: "25 hours",
        topics: ["HTML5", "CSS3", "JavaScript", "React.js"]
      },
      {
        section: "Backend Development",
        lessons: 20,
        duration: "20 hours",
        topics: ["Node.js", "Express.js", "APIs", "Server Management"]
      },
      {
        section: "Database & Storage",
        lessons: 15,
        duration: "15 hours",
        topics: ["SQL", "NoSQL", "Database Design", "Cloud Storage"]
      },
      {
        section: "DevOps & Deployment",
        lessons: 20,
        duration: "20 hours",
        topics: ["Git", "CI/CD", "Docker", "Cloud Deployment"]
      }
    ],
    tags: ["Full Stack", "Web Development", "React", "Node.js"],
    isPopular: true,
    isBestseller: true,
    lastUpdated: "2024-03-20",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 6,
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms essential for technical interviews and competitive programming.",
    category: "Computer Science",
    level: "Intermediate to Advanced",
    duration: "50 hours",
    price: 109.99,
    originalPrice: 199.99,
    rating: 4.7,
    totalRatings: 2134,
    studentsEnrolled: 9876,
    instructor: {
      name: "Mike Brown",
      title: "Software Engineer & Algorithm Expert",
      experience: "6+ years"
    },
    features: [
      "50+ hours of content",
      "200+ coding problems",
      "Interview preparation",
      "Complexity analysis",
      "Multiple programming languages"
    ],
    curriculum: [
      {
        section: "Arrays & Strings",
        lessons: 15,
        duration: "12 hours",
        topics: ["Array Operations", "String Manipulation", "Two Pointers", "Sliding Window"]
      },
      {
        section: "Linked Lists & Stacks",
        lessons: 12,
        duration: "10 hours",
        topics: ["Singly Linked Lists", "Doubly Linked Lists", "Stack Operations", "Queue Operations"]
      },
      {
        section: "Trees & Graphs",
        lessons: 18,
        duration: "15 hours",
        topics: ["Binary Trees", "BST", "Graph Traversal", "Shortest Path"]
      },
      {
        section: "Advanced Algorithms",
        lessons: 20,
        duration: "18 hours",
        topics: ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Divide & Conquer"]
      }
    ],
    tags: ["Data Structures", "Algorithms", "Programming", "Interview Prep"],
    isPopular: true,
    isBestseller: false,
    lastUpdated: "2024-01-30",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 7,
    title: "Modern Web Development with HTML5 & CSS3",
    description: "Learn modern web development with HTML5, CSS3, responsive design, and CSS frameworks.",
    category: "Web Development",
    level: "Beginner",
    duration: "28 hours",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.5,
    totalRatings: 1876,
    studentsEnrolled: 11234,
    instructor: {
      name: "Sarah Wilson",
      title: "Frontend Developer & UI Designer",
      experience: "7+ years"
    },
    features: [
      "28+ hours of content",
      "Responsive design projects",
      "CSS Grid & Flexbox",
      "Modern CSS techniques",
      "Real-world websites"
    ],
    curriculum: [
      {
        section: "HTML5 Fundamentals",
        lessons: 10,
        duration: "8 hours",
        topics: ["Semantic HTML", "Forms", "Media Elements", "HTML5 APIs"]
      },
      {
        section: "CSS3 Styling",
        lessons: 12,
        duration: "10 hours",
        topics: ["Selectors", "Box Model", "Positioning", "Transitions"]
      },
      {
        section: "Responsive Design",
        lessons: 8,
        duration: "6 hours",
        topics: ["Media Queries", "Flexible Layouts", "Mobile-first Design"]
      },
      {
        section: "Advanced CSS",
        lessons: 10,
        duration: "8 hours",
        topics: ["CSS Grid", "Flexbox", "Animations", "CSS Variables"]
      }
    ],
    tags: ["HTML5", "CSS3", "Web Development", "Responsive Design"],
    isPopular: false,
    isBestseller: false,
    lastUpdated: "2024-02-10",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 8,
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile apps with React Native for iOS and Android platforms.",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "42 hours",
    price: 119.99,
    originalPrice: 199.99,
    rating: 4.6,
    totalRatings: 1456,
    studentsEnrolled: 5678,
    instructor: {
      name: "Jane Smith",
      title: "Mobile App Developer",
      experience: "10+ years"
    },
    features: [
      "42+ hours of content",
      "Build 3 complete apps",
      "iOS & Android deployment",
      "Native modules integration",
      "Performance optimization"
    ],
    curriculum: [
      {
        section: "React Native Basics",
        lessons: 14,
        duration: "12 hours",
        topics: ["Setup", "Components", "Navigation", "Styling"]
      },
      {
        section: "Advanced Features",
        lessons: 16,
        duration: "14 hours",
        topics: ["State Management", "API Integration", "Local Storage", "Push Notifications"]
      },
      {
        section: "Native Integration",
        lessons: 12,
        duration: "10 hours",
        topics: ["Native Modules", "Camera", "Maps", "Device Features"]
      },
      {
        section: "Deployment & Publishing",
        lessons: 8,
        duration: "6 hours",
        topics: ["App Store", "Google Play", "Code Signing", "Testing"]
      }
    ],
    tags: ["React Native", "Mobile Development", "iOS", "Android"],
    isPopular: false,
    isBestseller: false,
    lastUpdated: "2024-03-01",
    language: "English",
    hasSubtitles: true
  }
];

// Arrow icon function
const arrowIcon = () => arrow;

// Course categories
const categories = [
  "All Courses",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "Computer Science"
];

// Course levels
const levels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Beginner to Advanced",
  "Intermediate to Advanced"
];

// Export all assets
export default {
  // Company logos
  microsoft,
  accenture,
  adobe,
  paypal,
  walmart,

  // Star assets
  star,

  // Testimonial data
  dummyTestimonial,

  // Course data
  courses: dummyCourses,
  categories,
  levels,

  // Helper functions
  getCourseById: (id) => dummyCourses.find(course => course.id === id),
  getCoursesByCategory: (category) => category === "All Courses" 
    ? dummyCourses 
    : dummyCourses.filter(course => course.category === category),
  getCoursesByLevel: (level) => level === "All Levels" 
    ? dummyCourses 
    : dummyCourses.filter(course => course.level === level),
  getPopularCourses: () => dummyCourses.filter(course => course.isPopular),
  getBestsellerCourses: () => dummyCourses.filter(course => course.isBestseller),
  getFeaturedCourses: () => dummyCourses.filter(course => course.isPopular || course.isBestseller),

  // Course statistics
  getTotalCourses: () => dummyCourses.length,
  getTotalStudents: () => dummyCourses.reduce((total, course) => total + course.studentsEnrolled, 0),
  getAverageRating: () => {
    const totalRating = dummyCourses.reduce((sum, course) => sum + course.rating, 0);
    return (totalRating / dummyCourses.length).toFixed(1);
  },

  // Arrow icon function
  arrowIcon,
};

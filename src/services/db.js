import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { 
  INITIAL_SETTINGS, 
  INITIAL_BARBERS, 
  INITIAL_SERVICES, 
  INITIAL_HAIRCUTS, 
  INITIAL_COURSES, 
  INITIAL_LESSONS, 
  INITIAL_FEED_POSTS, 
  INITIAL_REVIEWS, 
  INITIAL_BOOKINGS 
} from "../data/mockData";

const STORAGE_KEYS = {
  SETTINGS: "aamill_settings",
  BARBERS: "aamill_barbers",
  SERVICES: "aamill_services",
  HAIRCUTS: "aamill_haircuts",
  COURSES: "aamill_courses",
  LESSONS: "aamill_lessons",
  FEED: "aamill_feed",
  REVIEWS: "aamill_reviews",
  BOOKINGS: "aamill_bookings",
  STUDENTS: "aamill_students"
};

// Helper to initialize local storage with mock data if empty
function getLocalItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Storage access error:", e);
    return fallback;
  }
}

function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

// Firebase Cloud Firestore instance holder
let firebaseApp = null;
let firestoreDb = null;

export function initFirebase(config) {
  if (!config || !config.apiKey || !config.projectId) {
    firestoreDb = null;
    return null;
  }
  try {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApp();
    }
    firestoreDb = getFirestore(firebaseApp);
    return firestoreDb;
  } catch (err) {
    console.error("Firebase init failed, continuing in Local Storage mode:", err);
    firestoreDb = null;
    return null;
  }
}

// Check initial firestore configuration from settings
const currentSettings = getLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
if (currentSettings?.firebaseConfig?.apiKey) {
  initFirebase(currentSettings.firebaseConfig);
}

// DATABASE API
export const db = {
  // SETTINGS
  getSettings: () => getLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (newSettings) => {
    setLocalItem(STORAGE_KEYS.SETTINGS, newSettings);
    if (newSettings?.firebaseConfig?.apiKey) {
      initFirebase(newSettings.firebaseConfig);
    }
    return newSettings;
  },

  // BOOKINGS
  getBookings: () => getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS),
  createBooking: (bookingData) => {
    const list = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    const newBooking = {
      id: `BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      ...bookingData
    };
    const updated = [newBooking, ...list];
    setLocalItem(STORAGE_KEYS.BOOKINGS, updated);
    return newBooking;
  },
  updateBookingStatus: (id, status) => {
    const list = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    setLocalItem(STORAGE_KEYS.BOOKINGS, updated);
    return updated;
  },
  deleteBooking: (id) => {
    const list = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    const updated = list.filter((item) => item.id !== id);
    setLocalItem(STORAGE_KEYS.BOOKINGS, updated);
    return updated;
  },

  // HAIRCUTS
  getHaircuts: () => getLocalItem(STORAGE_KEYS.HAIRCUTS, INITIAL_HAIRCUTS),
  saveHaircut: (haircut) => {
    const list = getLocalItem(STORAGE_KEYS.HAIRCUTS, INITIAL_HAIRCUTS);
    let updated;
    if (haircut.id) {
      updated = list.map((item) => (item.id === haircut.id ? haircut : item));
    } else {
      const newItem = {
        id: `hc-${Date.now()}`,
        ...haircut
      };
      updated = [newItem, ...list];
    }
    setLocalItem(STORAGE_KEYS.HAIRCUTS, updated);
    return updated;
  },
  deleteHaircut: (id) => {
    const list = getLocalItem(STORAGE_KEYS.HAIRCUTS, INITIAL_HAIRCUTS);
    const updated = list.filter((item) => item.id !== id);
    setLocalItem(STORAGE_KEYS.HAIRCUTS, updated);
    return updated;
  },

  // BARBERS
  getBarbers: () => getLocalItem(STORAGE_KEYS.BARBERS, INITIAL_BARBERS),
  saveBarber: (barber) => {
    const list = getLocalItem(STORAGE_KEYS.BARBERS, INITIAL_BARBERS);
    let updated;
    if (barber.id) {
      updated = list.map((item) => (item.id === barber.id ? barber : item));
    } else {
      const newItem = { id: `b-${Date.now()}`, ...barber };
      updated = [...list, newItem];
    }
    setLocalItem(STORAGE_KEYS.BARBERS, updated);
    return updated;
  },

  // SERVICES
  getServices: () => getLocalItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (services) => setLocalItem(STORAGE_KEYS.SERVICES, services),

  // COURSES
  getCourses: () => getLocalItem(STORAGE_KEYS.COURSES, INITIAL_COURSES),
  saveCourse: (course) => {
    const list = getLocalItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    let updated;
    if (course.id) {
      updated = list.map((item) => (item.id === course.id ? course : item));
    } else {
      const newItem = { id: `crs-${Date.now()}`, studentCount: 0, rating: 5.0, ...course };
      updated = [...list, newItem];
    }
    setLocalItem(STORAGE_KEYS.COURSES, updated);
    return updated;
  },

  // LESSONS
  getLessons: () => getLocalItem(STORAGE_KEYS.LESSONS, INITIAL_LESSONS),
  saveLesson: (lesson) => {
    const list = getLocalItem(STORAGE_KEYS.LESSONS, INITIAL_LESSONS);
    let updated;
    if (lesson.id) {
      updated = list.map((item) => (item.id === lesson.id ? lesson : item));
    } else {
      const newItem = { id: `lsn-${Date.now()}`, ...lesson };
      updated = [...list, newItem];
    }
    setLocalItem(STORAGE_KEYS.LESSONS, updated);
    return updated;
  },

  // COURSE REGISTRATIONS (STUDENTS)
  getStudents: () => getLocalItem(STORAGE_KEYS.STUDENTS, [
    {
      id: "std-1",
      name: "Muhammad Ilham",
      phone: "081298765432",
      courseId: "crs-1",
      courseTitle: "Kelas Barber Basic (Pemula Nol)",
      registeredAt: "2026-11-10",
      status: "Aktif Belajar",
      notes: "Ingin buka usaha barbershop di Garut"
    },
    {
      id: "std-2",
      name: "Bagus Setiawan",
      phone: "085611223344",
      courseId: "crs-2",
      courseTitle: "Masterclass Fade & Modern Styling",
      registeredAt: "2026-11-12",
      status: "Terdaftar / Verifikasi",
      notes: "Sudah pengalaman 1 tahun, ingin perdalam skin fade"
    }
  ]),
  registerStudent: (studentData) => {
    const list = db.getStudents();
    const newStudent = {
      id: `std-${Date.now()}`,
      registeredAt: new Date().toISOString().split("T")[0],
      status: "Terdaftar / Verifikasi",
      ...studentData
    };
    const updated = [newStudent, ...list];
    setLocalItem(STORAGE_KEYS.STUDENTS, updated);
    return newStudent;
  },
  updateStudentStatus: (id, status) => {
    const list = db.getStudents();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    setLocalItem(STORAGE_KEYS.STUDENTS, updated);
    return updated;
  },

  // FEED POSTS
  getFeedPosts: () => getLocalItem(STORAGE_KEYS.FEED, INITIAL_FEED_POSTS),
  saveFeedPost: (post) => {
    const list = getLocalItem(STORAGE_KEYS.FEED, INITIAL_FEED_POSTS);
    const newPost = {
      id: `post-${Date.now()}`,
      timestamp: "Baru saja",
      likesCount: 0,
      commentsCount: 0,
      comments: [],
      ...post
    };
    const updated = [newPost, ...list];
    setLocalItem(STORAGE_KEYS.FEED, updated);
    return updated;
  },
  likePost: (postId) => {
    const list = getLocalItem(STORAGE_KEYS.FEED, INITIAL_FEED_POSTS);
    const updated = list.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    });
    setLocalItem(STORAGE_KEYS.FEED, updated);
    return updated;
  },
  addComment: (postId, user, text) => {
    const list = getLocalItem(STORAGE_KEYS.FEED, INITIAL_FEED_POSTS);
    const updated = list.map((post) => {
      if (post.id === postId) {
        const newComments = [
          ...(post.comments || []),
          { user, text, time: "Baru saja" }
        ];
        return {
          ...post,
          comments: newComments,
          commentsCount: newComments.length
        };
      }
      return post;
    });
    setLocalItem(STORAGE_KEYS.FEED, updated);
    return updated;
  },

  // REVIEWS
  getReviews: () => getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS),
  addReview: (review) => {
    const list = getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const newReview = {
      id: `rev-${Date.now()}`,
      date: "Hari ini",
      ...review
    };
    const updated = [newReview, ...list];
    setLocalItem(STORAGE_KEYS.REVIEWS, updated);
    return updated;
  },

  // RESET
  resetAll: () => {
    localStorage.clear();
    return true;
  }
};

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
  INITIAL_BOOKINGS,
  INITIAL_MEMBERS,
  INITIAL_COMMUNITY_MESSAGES
} from "../data/mockData";

const STORAGE_KEYS = {
  SETTINGS: "aamill_settings_v2",
  BARBERS: "aamill_barbers_v2",
  SERVICES: "aamill_services_v2",
  HAIRCUTS: "aamill_haircuts_v2",
  COURSES: "aamill_courses_v2",
  LESSONS: "aamill_lessons_v2",
  FEED: "aamill_feed_v2",
  REVIEWS: "aamill_reviews_v2",
  BOOKINGS: "aamill_bookings_v2",
  STUDENTS: "aamill_students_v2",
  MEMBERS: "aamill_members_v2",
  COMMUNITY_MSGS: "aamill_community_msgs_v2"
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

  // BOOKINGS & TRANSACTIONS
  getBookings: () => getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS),
  createBooking: (bookingData) => {
    const list = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    const barbers = getLocalItem(STORAGE_KEYS.BARBERS, INITIAL_BARBERS);
    
    // Find capster commission rate
    const capster = barbers.find(b => b.id === bookingData.barberId) || barbers[0];
    const commissionRate = capster.commissionRate || 0.60;
    const price = bookingData.totalPrice || 65000;
    const capsterCommission = Math.round(price * commissionRate);
    const barberShopShare = price - capsterCommission;

    const newBooking = {
      id: `BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      capsterCommission,
      barberShopShare,
      paymentMethod: "QRIS / Kasir",
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

  // MEMBERS & CUSTOMER CLUB
  getMembers: () => getLocalItem(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS),
  addMember: (memberData) => {
    const list = getLocalItem(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const newMember = {
      id: `MBR-${Math.floor(100 + Math.random() * 900)}`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      tier: "Silver Member",
      cutsCount: 1,
      joinedDate: "Baru saja",
      badge: "⚡ New Member",
      ...memberData
    };
    const updated = [newMember, ...list];
    setLocalItem(STORAGE_KEYS.MEMBERS, updated);
    return newMember;
  },

  // COMMUNITY MESSAGES / DISKUSI GRUP
  getCommunityMessages: () => getLocalItem(STORAGE_KEYS.COMMUNITY_MSGS, INITIAL_COMMUNITY_MESSAGES),
  sendCommunityMessage: (author, content, avatar = null) => {
    const list = getLocalItem(STORAGE_KEYS.COMMUNITY_MSGS, INITIAL_COMMUNITY_MESSAGES);
    const newMsg = {
      id: `msg-${Date.now()}`,
      author: author || "Pelanggan AA'MILL",
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      content,
      timestamp: "Baru saja",
      likes: 0,
      replies: []
    };
    const updated = [newMsg, ...list];
    setLocalItem(STORAGE_KEYS.COMMUNITY_MSGS, updated);
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
      const newItem = { id: `b-${Date.now()}`, commissionRate: 0.60, ...barber };
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

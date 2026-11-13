import React, { useState, useEffect } from 'react';
import { db } from './services/db';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingModal from './components/BookingModal';
import LookbookModal from './components/LookbookModal';
import ConsultationQuizModal from './components/ConsultationQuizModal';
import AcademyModal from './components/AcademyModal';
import LMSViewerModal from './components/LMSViewerModal';

// Views
import HomeView from './views/HomeView';
import LookbookView from './views/LookbookView';
import BookingView from './views/BookingView';
import AcademyView from './views/AcademyView';
import FeedView from './views/FeedView';
import AdminView from './views/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Data states
  const [settings, setSettings] = useState(db.getSettings());
  const [haircuts, setHaircuts] = useState(db.getHaircuts());
  const [barbers, setBarbers] = useState(db.getBarbers());
  const [services, setServices] = useState(db.getServices());
  const [courses, setCourses] = useState(db.getCourses());
  const [lessons, setLessons] = useState(db.getLessons());
  const [feedPosts, setFeedPosts] = useState(db.getFeedPosts());
  const [reviews, setReviews] = useState(db.getReviews());
  const [bookings, setBookings] = useState(db.getBookings());
  const [students, setStudents] = useState(db.getStudents());

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedHaircut, setPreselectedHaircut] = useState(null);

  const [lookbookModalOpen, setLookbookModalOpen] = useState(false);
  const [activeHaircutDetail, setActiveHaircutDetail] = useState(null);

  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [activeCourseDetail, setActiveCourseDetail] = useState(null);

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeLessonDetail, setActiveLessonDetail] = useState(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Handlers for booking
  const handleOpenBooking = (preselected = null) => {
    setPreselectedHaircut(preselected);
    setBookingModalOpen(true);
  };

  const handleBookingCreated = (bookingData) => {
    const created = db.createBooking(bookingData);
    setBookings(db.getBookings());
    return created;
  };

  const handleUpdateBookingStatus = (id, status) => {
    const updated = db.updateBookingStatus(id, status);
    setBookings(updated);
  };

  const handleDeleteBooking = (id) => {
    const updated = db.deleteBooking(id);
    setBookings(updated);
  };

  // Handlers for haircuts
  const handleOpenHaircutDetail = (haircut) => {
    setActiveHaircutDetail(haircut);
    setLookbookModalOpen(true);
  };

  const handleSaveHaircut = (haircut) => {
    const updated = db.saveHaircut(haircut);
    setHaircuts(updated);
  };

  const handleDeleteHaircut = (id) => {
    const updated = db.deleteHaircut(id);
    setHaircuts(updated);
  };

  // Handlers for Academy
  const handleOpenCourseModal = (course) => {
    setActiveCourseDetail(course);
    setCourseModalOpen(true);
  };

  const handleRegisterStudent = (studentData) => {
    const created = db.registerStudent(studentData);
    setStudents(db.getStudents());
    return created;
  };

  const handleUpdateStudentStatus = (id, status) => {
    const updated = db.updateStudentStatus(id, status);
    setStudents(updated);
  };

  const handleOpenLessonModal = (lesson) => {
    setActiveLessonDetail(lesson);
    setLessonModalOpen(true);
  };

  // Handlers for Feed
  const handleLikePost = (postId) => {
    const updated = db.likePost(postId);
    setFeedPosts(updated);
  };

  const handleAddComment = (postId, user, text) => {
    const updated = db.addComment(postId, user, text);
    setFeedPosts(updated);
  };

  const handleNewPost = (postData) => {
    const updated = db.saveFeedPost(postData);
    setFeedPosts(updated);
  };

  // Handlers for Settings & Reset
  const handleSaveSettings = (newSettings) => {
    const saved = db.saveSettings(newSettings);
    setSettings(saved);
  };

  const handleResetAllData = () => {
    db.resetAll();
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenQuiz={() => setQuizModalOpen(true)}
        barbershopName={settings.barbershopName}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={setCurrentTab}
            onOpenBooking={() => handleOpenBooking(null)}
            onOpenQuiz={() => setQuizModalOpen(true)}
            onOpenHaircutDetail={handleOpenHaircutDetail}
            haircuts={haircuts}
            services={services}
            barbers={barbers}
            reviews={reviews}
            courses={courses}
            settings={settings}
          />
        )}

        {currentTab === 'lookbook' && (
          <LookbookView
            haircuts={haircuts}
            onOpenHaircutDetail={handleOpenHaircutDetail}
            onSelectForBooking={(hc) => handleOpenBooking(hc)}
            onOpenQuiz={() => setQuizModalOpen(true)}
          />
        )}

        {currentTab === 'booking' && (
          <BookingView
            bookings={bookings}
            onOpenBookingModal={() => handleOpenBooking(null)}
            settings={settings}
          />
        )}

        {currentTab === 'academy' && (
          <AcademyView
            courses={courses}
            lessons={lessons}
            onOpenCourseModal={handleOpenCourseModal}
            onOpenLessonModal={handleOpenLessonModal}
            settings={settings}
          />
        )}

        {currentTab === 'feed' && (
          <FeedView
            posts={feedPosts}
            haircuts={haircuts}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onNewPost={handleNewPost}
            onSelectHaircutForBooking={(hc) => handleOpenBooking(hc)}
            isAdmin={isAdmin}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            bookings={bookings}
            haircuts={haircuts}
            courses={courses}
            students={students}
            barbers={barbers}
            feedPosts={feedPosts}
            settings={settings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onDeleteBooking={handleDeleteBooking}
            onSaveHaircut={handleSaveHaircut}
            onDeleteHaircut={handleDeleteHaircut}
            onSaveCourse={(c) => setCourses(db.saveCourse(c))}
            onSaveBarber={(b) => setBarbers(db.saveBarber(b))}
            onSaveSettings={handleSaveSettings}
            onUpdateStudentStatus={handleUpdateStudentStatus}
            onDeletePost={(id) => {}}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenBooking={() => handleOpenBooking(null)}
        settings={settings}
      />

      {/* Persistent Floating WhatsApp Widget */}
      <FloatingWhatsApp settings={settings} />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedHaircut={preselectedHaircut}
        services={services}
        barbers={barbers}
        haircuts={haircuts}
        onBookingCreated={handleBookingCreated}
        settings={settings}
      />

      <LookbookModal
        isOpen={lookbookModalOpen}
        onClose={() => setLookbookModalOpen(false)}
        haircut={activeHaircutDetail}
        onSelectForBooking={(hc) => handleOpenBooking(hc)}
      />

      <ConsultationQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        haircuts={haircuts}
        onSelectHaircutForBooking={(hc) => handleOpenBooking(hc)}
        onOpenHaircutDetail={handleOpenHaircutDetail}
      />

      <AcademyModal
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        course={activeCourseDetail}
        onRegisterStudent={handleRegisterStudent}
        settings={settings}
      />

      <LMSViewerModal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        lesson={activeLessonDetail}
      />

    </div>
  );
}

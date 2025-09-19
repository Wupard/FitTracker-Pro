import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import WorkoutPlanner from '@/components/WorkoutPlanner';
import NutritionTracker from '@/components/NutritionTracker';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import ExerciseLibrary from '@/components/ExerciseLibrary';
import Profile from '@/components/Profile';
import AuthModal from '@/components/AuthModal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    workoutsThisWeek: 4,
    totalWorkouts: 156,
    streak: 12,
    prs: 23,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('fittracker_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('fittracker_user');
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('fittracker_user', JSON.stringify(updatedUser));
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <Dashboard onGetStarted={() => setShowAuthModal(true)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} stats={stats} setActiveTab={setActiveTab} />;
      case 'workout':
        return <WorkoutPlanner user={user} setStats={setStats} />;
      case 'nutrition':
        return <NutritionTracker user={user} />;
      case 'analytics':
        return <ProgressAnalytics user={user} />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} onUpdateUser={handleUserUpdate} />;
      default:
        return <Dashboard user={user} stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>FitTracker Pro - Your Ultimate Gym Companion</title>
        <meta name="description" content="Transform your fitness journey with FitTracker Pro. Track workouts, plan nutrition, analyze progress, and connect with a fitness community." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAuthenticated={isAuthenticated}
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          user={user}
        />
        
        <main className="pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
        
        <Toaster />
      </div>
    </>
  );
}

export default App;
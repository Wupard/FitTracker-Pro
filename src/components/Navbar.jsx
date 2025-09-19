import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Home, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  BookOpen, 
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = ({ activeTab, setActiveTab, isAuthenticated, onLogin, onLogout, user }) => {
  const [hidden, setHidden] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hidden) {
      controls.start('hidden');
    } else {
      controls.start('visible');
    }
  }, [hidden, controls]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'workout', label: 'Antrenman', icon: Dumbbell },
    { id: 'nutrition', label: 'Beslenme', icon: Apple },
    { id: 'analytics', label: 'Analitik', icon: TrendingUp },
    { id: 'exercises', label: 'Egzersizler', icon: BookOpen },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={controls}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FitTracker Pro</span>
          </motion.div>

          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('profile')}
                  className="text-white hover:bg-white/10 bg-white/5 rounded-full"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User avatar" className="w-6 h-6 rounded-full mr-2 object-cover" src="https://images.unsplash.com/photo-1642888621621-ff7d83f3fdcf" />
                  ) : (
                    <User className="w-4 h-4 mr-2" />
                  )}
                  {user?.name || 'Profil'}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Giriş Yap
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Flame,
  Clock,
  Apple as NutritionIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = ({ user, onGetStarted, stats, setActiveTab }) => {

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <img 
                className="w-32 h-32 mx-auto mb-6 rounded-full object-cover neon-glow"
                alt="Fitness motivation"
                 src="https://images.unsplash.com/photo-1666624830967-1d292de85e2d" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="gradient-text">FitTracker</span> Pro
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Fitness yolculuğunu dönüştür! Antrenmanları takip et, beslenme planla, 
              ilerlemeni analiz et.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-lg mx-auto">
              <motion.div 
                className="workout-card p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Dumbbell className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Akıllı Antrenman</h3>
                <p className="text-white/70">Kişiselleştirilmiş programlar ve progressive overload</p>
              </motion.div>
              
              <motion.div 
                className="workout-card p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Hedef Takibi</h3>
                <p className="text-white/70">Ölçüler, fotoğraflar ve performans analizi</p>
              </motion.div>
            </div>
            
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 rounded-xl neon-glow"
            >
              Hemen Başla 🚀
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const displayStats = [
    { label: 'Bu Hafta Antrenman', value: `${stats.workoutsThisWeek}/6`, icon: Dumbbell, color: 'text-orange-400' },
    { label: 'Streak', value: `${stats.streak} gün`, icon: Flame, color: 'text-red-400' },
    { label: 'Toplam Antrenman', value: stats.totalWorkouts, icon: Calendar, color: 'text-blue-400' },
    { label: 'PR Sayısı', value: stats.prs, icon: Award, color: 'text-yellow-400' },
  ];

  const recentWorkouts = [
    { name: 'Push Day', date: 'Bugün', duration: '75 dk', sets: 18 },
    { name: 'Pull Day', date: 'Dün', duration: '68 dk', sets: 16 },
    { name: 'Leg Day', date: '2 gün önce', duration: '82 dk', sets: 20 },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hoş geldin, {user.name}! 💪
          </h1>
          <p className="text-white/70 text-lg">Bugün harika bir antrenman günü!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="workout-card p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="workout-card p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Hızlı İşlemler</h2>
            <div className="space-y-4">
              <Button
                onClick={() => setActiveTab('workout')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white justify-start"
              >
                <Dumbbell className="w-5 h-5 mr-3" />
                Antrenman Başlat
              </Button>
              <Button
                onClick={() => setActiveTab('nutrition')}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
              >
                <NutritionIcon className="w-5 h-5 mr-3" />
                Beslenme Kaydet
              </Button>
              <Button
                onClick={() => setActiveTab('analytics')}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                İlerleme Görüntüle
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="workout-card p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Son Antrenmanlar</h2>
            <div className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setActiveTab('workout')}
                >
                  <div>
                    <div className="font-medium text-white">{workout.name}</div>
                    <div className="text-sm text-white/70">{workout.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-white/70 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {workout.duration}
                    </div>
                    <div className="text-white/70 text-sm">{workout.sets} set</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 workout-card p-8 rounded-xl text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Günün Motivasyonu 🔥</h2>
          <p className="text-lg text-white/80 italic">
            "Başarı, küçük çabaların günlük olarak tekrarlanmasıdır."
          </p>
          <p className="text-white/60 mt-2">- Robert Collier</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
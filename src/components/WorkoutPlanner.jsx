import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Save,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const WorkoutPlanner = ({ user, setStats }) => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const workoutTemplates = [
    {
      id: 1,
      name: 'Push Day',
      duration: '60-75 dk',
      exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips', 'Push-ups'],
      difficulty: 'Orta'
    },
    {
      id: 2,
      name: 'Pull Day',
      duration: '55-70 dk',
      exercises: ['Pull-ups', 'Barbell Row', 'Lat Pulldown', 'Bicep Curls'],
      difficulty: 'Orta'
    },
    {
      id: 3,
      name: 'Leg Day',
      duration: '70-85 dk',
      exercises: ['Squats', 'Deadlifts', 'Leg Press', 'Calf Raises'],
      difficulty: 'Zor'
    },
    {
      id: 4,
      name: 'Full Body',
      duration: '45-60 dk',
      exercises: ['Burpees', 'Mountain Climbers', 'Planks', 'Jumping Jacks'],
      difficulty: 'Kolay'
    }
  ];

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const startWorkout = (template) => {
    setActiveWorkout(template);
    setTimer(0);
    setIsTimerRunning(true);
    toast({
      title: "Antrenman Başladı! 💪",
      description: `${template.name} antrenmanına başladın. İyi antrenmanlar!`,
    });
  };

  const saveWorkout = () => {
    setIsTimerRunning(false);
    setActiveWorkout(null);
    setStats(prevStats => ({
      ...prevStats,
      workoutsThisWeek: prevStats.workoutsThisWeek + 1,
      totalWorkouts: prevStats.totalWorkouts + 1,
      streak: prevStats.streak + 1,
    }));
    toast({
      title: "Antrenman Kaydedildi! 🎉",
      description: "Harika iş! İlerlemen kaydedildi.",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

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
            Antrenman Planlayıcı 🏋️‍♂️
          </h1>
          <p className="text-white/70 text-lg">Kişiselleştirilmiş antrenman programların</p>
        </motion.div>

        {activeWorkout && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="workout-card p-6 rounded-xl mb-8 neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{activeWorkout.name}</h2>
                <p className="text-white/70">Aktif Antrenman</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-400">{formatTime(timer)}</div>
                <p className="text-white/70">Süre</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {isTimerRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isTimerRunning ? 'Duraklat' : 'Devam Et'}
              </Button>
              
              <Button
                onClick={() => setTimer(0)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Sıfırla
              </Button>
              
              <Button
                onClick={saveWorkout}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Save className="w-5 h-5 mr-2" />
                Kaydet
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="workout-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Antrenman Şablonları</h2>
                <Button
                  onClick={() => handleFeatureClick('create-template')}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Şablon
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workoutTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{template.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        template.difficulty === 'Kolay' ? 'bg-green-500/20 text-green-400' :
                        template.difficulty === 'Orta' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-white/70 text-sm mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {template.duration}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white/70 text-sm mb-2">Egzersizler:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.exercises.slice(0, 3).map((exercise, idx) => (
                          <span key={idx} className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">
                            {exercise}
                          </span>
                        ))}
                        {template.exercises.length > 3 && (
                          <span className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">
                            +{template.exercises.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => startWorkout(template)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        disabled={activeWorkout?.id === template.id}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {activeWorkout?.id === template.id ? 'Aktif' : 'Başlat'}
                      </Button>
                      <Button
                        onClick={() => handleFeatureClick('edit-template')}
                        variant="outline"
                        size="icon"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Bu Hafta</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Antrenman</span>
                  <span className="text-white font-semibold">4/6</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="workout-progress h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Toplam Süre</span>
                  <span className="text-white font-semibold">4.5 saat</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Ortalama</span>
                  <span className="text-white font-semibold">68 dk</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Hızlı Araçlar</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleFeatureClick('1rm-calculator')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <Target className="w-4 h-4 mr-3" />
                  1RM Hesaplayıcı
                </Button>
                
                <Button
                  onClick={() => handleFeatureClick('plate-calculator')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Plaka Hesaplayıcı
                </Button>
                
                <Button
                  onClick={() => handleFeatureClick('progress-tracker')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <TrendingUp className="w-4 h-4 mr-3" />
                  İlerleme Takibi
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="workout-card p-6 rounded-xl text-center"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Günün İpucu 💡</h3>
              <p className="text-white/70 text-sm">
                Progressive overload için her hafta ağırlığı %2.5-5 artırmayı hedefle!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;
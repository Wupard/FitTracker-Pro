import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Target,
  Clock,
  Star,
  Heart,
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const categories = [
    { id: 'all', name: 'Tümü', icon: '🏋️' },
    { id: 'chest', name: 'Göğüs', icon: '💪' },
    { id: 'back', name: 'Sırt', icon: '🔙' },
    { id: 'shoulders', name: 'Omuz', icon: '🤲' },
    { id: 'arms', name: 'Kol', icon: '💪' },
    { id: 'legs', name: 'Bacak', icon: '🦵' },
    { id: 'core', name: 'Karın', icon: '🎯' },
    { id: 'cardio', name: 'Kardiyo', icon: '❤️' }
  ];

  const difficulties = [
    { id: 'all', name: 'Tüm Seviyeler' },
    { id: 'beginner', name: 'Başlangıç' },
    { id: 'intermediate', name: 'Orta' },
    { id: 'advanced', name: 'İleri' }
  ];

  const exercises = [
    { id: 1, name: 'Bench Press', category: 'chest', difficulty: 'intermediate', duration: '3-4 set', rating: 4.8, likes: 1250, description: 'Göğüs kasları için temel compound hareket', muscles: ['Göğüs', 'Triceps', 'Ön Deltoid'], equipment: 'Barbell, Bench', image: 'Man doing bench press in a gym' },
    { id: 2, name: 'Pull-ups', category: 'back', difficulty: 'intermediate', duration: '3-4 set', rating: 4.9, likes: 980, description: 'Sırt ve biceps için mükemmel compound hareket', muscles: ['Latissimus Dorsi', 'Biceps', 'Arka Deltoid'], equipment: 'Pull-up Bar', image: 'Muscular man doing pull-ups' },
    { id: 3, name: 'Squats', category: 'legs', difficulty: 'beginner', duration: '3-5 set', rating: 4.7, likes: 1500, description: 'Alt vücut için en etkili compound hareket', muscles: ['Quadriceps', 'Glutes', 'Hamstrings'], equipment: 'Barbell, Squat Rack', image: 'Woman doing squats with a barbell' },
    { id: 4, name: 'Deadlift', category: 'back', difficulty: 'advanced', duration: '3-5 set', rating: 4.9, likes: 2100, description: 'Tüm vücut için güçlü compound hareket', muscles: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Traps'], equipment: 'Barbell', image: 'Powerlifter performing a deadlift' },
    { id: 5, name: 'Push-ups', category: 'chest', difficulty: 'beginner', duration: '3-4 set', rating: 4.5, likes: 800, description: 'Vücut ağırlığı ile göğüs antrenmanı', muscles: ['Göğüs', 'Triceps', 'Core'], equipment: 'Vücut Ağırlığı', image: 'Person doing push-ups on a yoga mat' },
    { id: 6, name: 'Plank', category: 'core', difficulty: 'beginner', duration: '30-60 sn', rating: 4.6, likes: 650, description: 'Core stabilizasyonu için temel hareket', muscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques'], equipment: 'Vücut Ağırlığı', image: 'Woman holding a plank position' },
    { id: 7, name: 'Burpees', category: 'cardio', difficulty: 'intermediate', duration: '3-4 set', rating: 4.3, likes: 420, description: 'Tüm vücut kardiyovasküler antrenman', muscles: ['Tüm Vücut'], equipment: 'Vücut Ağırlığı', image: 'Athlete doing burpees in a crossfit gym' },
    { id: 8, name: 'Shoulder Press', category: 'shoulders', difficulty: 'intermediate', duration: '3-4 set', rating: 4.7, likes: 890, description: 'Omuz kasları için temel hareket', muscles: ['Deltoids', 'Triceps'], equipment: 'Dumbbells', image: 'Man doing dumbbell shoulder press' }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Başlangıç';
      case 'intermediate': return 'Orta';
      case 'advanced': return 'İleri';
      default: return difficulty;
    }
  };

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
            Egzersiz Kütüphanesi 📚
          </h1>
          <p className="text-white/70 text-lg">Video rehberler ve teknik ipuçları ile egzersizleri öğren</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="workout-card p-6 rounded-xl mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Egzersiz ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id} className="bg-slate-800">
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="workout-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20">
                <img 
                  className="w-full h-full object-cover"
                  alt={exercise.image}
                   src="https://images.unsplash.com/photo-1623874400767-0fcdeedd0f5d" />
                
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-black/50 ${getDifficultyColor(exercise.difficulty)}`}>
                    {getDifficultyLabel(exercise.difficulty)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFeatureClick('like-exercise')}
                      className="text-white/70 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleFeatureClick('share-exercise')}
                      className="text-white/70 hover:text-blue-400 transition-colors"
                    >
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4">{exercise.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400" /><span className="text-white text-sm">{exercise.rating}</span></div>
                    <div className="flex items-center space-x-1"><Heart className="w-4 h-4 text-red-400" /><span className="text-white text-sm">{exercise.likes}</span></div>
                    <div className="flex items-center space-x-1"><Clock className="w-4 h-4 text-blue-400" /><span className="text-white text-sm">{exercise.duration}</span></div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white/70 text-xs mb-2">Hedef Kaslar:</p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.muscles.map((muscle, idx) => (
                      <span key={idx} className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">{muscle}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white/70 text-xs mb-1">Ekipman:</p>
                  <p className="text-white text-sm">{exercise.equipment}</p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => handleFeatureClick('add-to-workout')} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Target className="w-4 h-4 mr-2" />Antrenman Ekle
                  </Button>
                  <Button onClick={() => handleFeatureClick('view-details')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Egzersiz bulunamadı</h3>
            <p className="text-white/70">Farklı filtreler veya arama terimleri deneyin</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
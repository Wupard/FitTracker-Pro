import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Target, 
  TrendingUp,
  Apple,
  Zap,
  Droplets,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const NutritionTracker = ({ user }) => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [water, setWater] = useState(6);

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const addWater = () => {
    if (water < 8) {
      setWater(water + 1);
      toast({
        title: "💧 Su Eklendi!",
        description: "Harika! Hidrasyon önemlidir.",
      });
    } else {
      toast({
        title: "🎉 Hedef Tamamlandı!",
        description: "Bugünkü su hedefine ulaştın!",
      });
    }
  };

  const dailyGoals = {
    calories: { current: 1850, target: 2200, unit: 'kcal' },
    protein: { current: 120, target: 150, unit: 'g' },
    carbs: { current: 180, target: 220, unit: 'g' },
    fat: { current: 65, target: 80, unit: 'g' },
    water: { current: water, target: 8, unit: 'bardak' }
  };

  const meals = [
    { id: 'breakfast', name: 'Kahvaltı', icon: '🌅', time: '07:00' },
    { id: 'lunch', name: 'Öğle', icon: '☀️', time: '12:30' },
    { id: 'dinner', name: 'Akşam', icon: '🌙', time: '19:00' },
    { id: 'snacks', name: 'Atıştırmalık', icon: '🍎', time: 'Çeşitli' }
  ];

  const recentFoods = [
    { name: 'Tavuk Göğsü', amount: '150g', calories: 165, protein: 31 },
    { name: 'Yulaf Ezmesi', amount: '50g', calories: 190, protein: 7 },
    { name: 'Muz', amount: '1 adet', calories: 105, protein: 1 },
    { name: 'Badem', amount: '30g', calories: 175, protein: 6 }
  ];

  const getProgressWidth = (current, target) => {
    return Math.min((current / target) * 100, 100);
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
            Beslenme Takibi 🍎
          </h1>
          <p className="text-white/70 text-lg">Günlük kalori ve makro hedeflerini takip et</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="workout-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Günlük Hedefler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle cx="48" cy="48" r="40" stroke="url(#calorieGradient)" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - dailyGoals.calories.current / dailyGoals.calories.target)}`} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><Zap className="w-6 h-6 text-orange-400" /></div>
                    <defs><linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ff6b6b" /><stop offset="100%" stopColor="#ee5a24" /></linearGradient></defs>
                  </div>
                  <div className="text-white font-semibold">{dailyGoals.calories.current}</div>
                  <div className="text-white/70 text-sm">/ {dailyGoals.calories.target} {dailyGoals.calories.unit}</div>
                  <div className="text-orange-400 text-sm font-medium">Kalori</div>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - dailyGoals.protein.current / dailyGoals.protein.target)}`} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><Scale className="w-6 h-6 text-green-400" /></div>
                  </div>
                  <div className="text-white font-semibold">{dailyGoals.protein.current}</div>
                  <div className="text-white/70 text-sm">/ {dailyGoals.protein.target} {dailyGoals.protein.unit}</div>
                  <div className="text-green-400 text-sm font-medium">Protein</div>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - dailyGoals.water.current / dailyGoals.water.target)}`} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><Droplets className="w-6 h-6 text-blue-400" /></div>
                  </div>
                  <div className="text-white font-semibold">{dailyGoals.water.current}</div>
                  <div className="text-white/70 text-sm">/ {dailyGoals.water.target} {dailyGoals.water.unit}</div>
                  <div className="text-blue-400 text-sm font-medium">Su</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-white/70">Karbonhidrat</span><span className="text-white">{dailyGoals.carbs.current}g / {dailyGoals.carbs.target}g</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getProgressWidth(dailyGoals.carbs.current, dailyGoals.carbs.target)}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-white/70">Yağ</span><span className="text-white">{dailyGoals.fat.current}g / {dailyGoals.fat.target}g</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getProgressWidth(dailyGoals.fat.current, dailyGoals.fat.target)}%` }}></div></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="workout-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Öğünler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {meals.map((meal) => (
                  <button key={meal.id} onClick={() => setSelectedMeal(meal.id)} className={`p-4 rounded-lg border transition-all ${selectedMeal === meal.id ? 'border-orange-500 bg-orange-500/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                    <div className="text-2xl mb-2">{meal.icon}</div>
                    <div className="text-white font-medium">{meal.name}</div>
                    <div className="text-white/70 text-sm">{meal.time}</div>
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={() => handleFeatureClick('add-food')} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Plus className="w-4 h-4 mr-2" />Yemek Ekle
                </Button>
                <Button onClick={() => handleFeatureClick('search-food')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Search className="w-4 h-4 mr-2" />Ara
                </Button>
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
              <h3 className="text-lg font-semibold text-white mb-4">Hızlı Ekle</h3>
              <div className="space-y-3">
                {recentFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleFeatureClick('quick-add')}>
                    <div>
                      <div className="text-white text-sm font-medium">{food.name}</div>
                      <div className="text-white/70 text-xs">{food.amount}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 text-sm font-medium">{food.calories} kcal</div>
                      <div className="text-white/70 text-xs">{food.protein}g protein</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Su Takibi 💧</h3>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-blue-400">{dailyGoals.water.current}/8</div>
                <div className="text-white/70 text-sm">bardak</div>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[...Array(8)].map((_, index) => (<div key={index} className={`h-8 rounded ${index < dailyGoals.water.current ? 'bg-blue-500' : 'bg-white/10'} transition-colors`} />))}
              </div>
              <Button onClick={addWater} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Droplets className="w-4 h-4 mr-2" />Su Ekle
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Haftalık İlerleme</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="text-white/70">Ortalama Kalori</span><span className="text-white font-semibold">1,950</span></div>
                <div className="flex items-center justify-between"><span className="text-white/70">Hedef Tutma</span><span className="text-green-400 font-semibold">85%</span></div>
                <div className="flex items-center justify-between"><span className="text-white/70">Su Hedefi</span><span className="text-blue-400 font-semibold">92%</span></div>
              </div>
              <Button onClick={() => handleFeatureClick('detailed-report')} variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10">
                <TrendingUp className="w-4 h-4 mr-2" />Detaylı Rapor
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
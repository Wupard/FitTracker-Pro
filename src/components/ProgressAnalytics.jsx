import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Camera,
  Scale,
  Ruler,
  Award,
  BarChart3,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ProgressAnalytics = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const periods = [
    { id: 'week', label: '1 Hafta' },
    { id: 'month', label: '1 Ay' },
    { id: '3months', label: '3 Ay' },
    { id: 'year', label: '1 Yıl' }
  ];

  const metrics = [
    { id: 'weight', label: 'Kilo', icon: Scale, color: 'text-blue-400' },
    { id: 'bodyfat', label: 'Yağ Oranı', icon: Target, color: 'text-red-400' },
    { id: 'muscle', label: 'Kas Kütlesi', icon: TrendingUp, color: 'text-green-400' },
    { id: 'measurements', label: 'Ölçüler', icon: Ruler, color: 'text-purple-400' }
  ];

  const bodyMeasurements = [
    { part: 'Göğüs', current: 102, previous: 98, unit: 'cm', date: '2025-09-18' },
    { part: 'Bel', current: 85, previous: 89, unit: 'cm', date: '2025-09-18' },
    { part: 'Kalça', current: 95, previous: 97, unit: 'cm', date: '2025-09-18' },
    { part: 'Kol', current: 38, previous: 36, unit: 'cm', date: '2025-09-18' },
    { part: 'Bacak', current: 58, previous: 56, unit: 'cm', date: '2025-09-18' }
  ];

  const getChangeColor = (current, previous) => {
    if (current > previous) return 'text-green-400';
    if (current < previous) return 'text-red-400';
    return 'text-white/70';
  };

  const getChangeIcon = (current, previous) => {
    if (current > previous) return '↗️';
    if (current < previous) return '↘️';
    return '➡️';
  };

  const chartData = {
    week: [65, 59, 80, 81, 56, 55, 40],
    month: [50, 62, 68, 75, 72, 80, 85, 82, 78, 88, 92, 90],
    '3months': [40, 45, 55, 50, 60, 65, 70, 75, 80, 85, 90, 92],
    year: [30, 32, 35, 40, 48, 55, 60, 68, 72, 80, 88, 92],
  };

  const currentChartData = chartData[selectedPeriod];

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
            İlerleme Analizi 📊
          </h1>
          <p className="text-white/70 text-lg">Fitness yolculuğundaki gelişimini takip et</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="workout-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Performans Grafikleri</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedMetric === metric.id
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                      <div className="text-white text-sm font-medium">{metric.label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white/5 rounded-lg p-6 h-64 flex items-end justify-center border border-white/10 relative">
                <div className="absolute top-4 left-4 text-white/70 text-sm">
                  {selectedMetric === 'weight' && 'Kilo (kg)'}
                  {selectedMetric === 'bodyfat' && 'Yağ Oranı (%)'}
                  {selectedMetric === 'muscle' && 'Kas Kütlesi (kg)'}
                  {selectedMetric === 'measurements' && 'Toplam Ölçü (cm)'}
                </div>
                <div className="w-full h-full flex items-end justify-around">
                  {currentChartData.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${value}%`, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="w-4 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-sm"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="workout-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Vücut Ölçüleri</h2>
                <Button
                  onClick={() => handleFeatureClick('add-measurement')}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Ruler className="w-4 h-4 mr-2" />
                  Ölçü Ekle
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bodyMeasurements.map((measurement, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{measurement.part}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${getChangeColor(measurement.current, measurement.previous)}`}>
                          {getChangeIcon(measurement.current, measurement.previous)}
                        </span>
                        <Button onClick={() => handleFeatureClick('edit-measurement')} variant="ghost" size="icon" className="w-6 h-6 text-white/50 hover:text-white"><Edit className="w-4 h-4" /></Button>
                        <Button onClick={() => handleFeatureClick('measurement-details')} variant="ghost" size="icon" className="w-6 h-6 text-white/50 hover:text-white"><MoreHorizontal className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-white">
                        {measurement.current}{measurement.unit}
                      </span>
                      <span className="text-white/70 text-xs">
                        {measurement.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Fotoğraf İlerlemesi</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                  <img className="w-full h-full object-cover rounded-lg" alt="Progress photo before" src="https://images.unsplash.com/photo-1650611338884-5c72e359a7a3" />
                </div>
                <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                  <img className="w-full h-full object-cover rounded-lg" alt="Progress photo after" src="https://images.unsplash.com/photo-1607434472257-d9f8e57a643d" />
                </div>
              </div>
              
              <div className="text-center text-white/70 text-sm mb-4">
                Başlangıç vs Şimdi
              </div>
              
              <Button
                onClick={() => handleFeatureClick('add-photo')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Camera className="w-4 h-4 mr-2" />
                Fotoğraf Ekle
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="workout-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Rapor Seçenekleri</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleFeatureClick('export-pdf')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  PDF Rapor
                </Button>
                
                <Button
                  onClick={() => handleFeatureClick('share-progress')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <Award className="w-4 h-4 mr-3" />
                  İlerleme Paylaş
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
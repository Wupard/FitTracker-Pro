import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Trophy, 
  Flame, 
  Target, 
  MessageCircle,
  Heart,
  Share,
  Award,
  Calendar,
  Medal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Community = ({ user }) => {
  const [activeTab, setActiveTab] = useState('feed');

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const tabs = [
    { id: 'feed', label: 'Ana Akış', icon: Users },
    { id: 'challenges', label: 'Challenge\'lar', icon: Target },
    { id: 'leaderboard', label: 'Liderlik Tablosu', icon: Trophy },
    { id: 'achievements', label: 'Başarılar', icon: Award }
  ];

  const feedPosts = [
    {
      id: 1,
      user: { name: 'Ahmet K.', avatar: '👨‍💼', level: 'Pro' },
      content: 'Bugün 120kg deadlift PR kırdım! 💪 Çok mutluyum!',
      image: 'Athlete celebrating deadlift personal record in gym',
      likes: 45,
      comments: 12,
      time: '2 saat önce',
      type: 'achievement'
    },
    {
      id: 2,
      user: { name: 'Zeynep M.', avatar: '👩‍🦰', level: 'Elite' },
      content: '30 günlük streak tamamlandı! Kararlılık her şeydir 🔥',
      likes: 67,
      comments: 8,
      time: '4 saat önce',
      type: 'streak'
    },
    {
      id: 3,
      user: { name: 'Mehmet S.', avatar: '👨‍🦲', level: 'Beginner' },
      content: 'İlk haftamı tamamladım. Motivasyon için teşekkürler! 🙏',
      likes: 23,
      comments: 15,
      time: '6 saat önce',
      type: 'milestone'
    },
    {
      id: 4,
      user: { name: 'Ayşe T.', avatar: '👩‍💼', level: 'Pro' },
      content: 'Yeni beslenme planım harika sonuçlar veriyor! 🥗',
      image: 'Healthy meal prep containers with balanced nutrition',
      likes: 34,
      comments: 9,
      time: '8 saat önce',
      type: 'nutrition'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '30 Gün Push-up Challenge',
      description: '30 gün boyunca her gün push-up yap',
      participants: 1250,
      daysLeft: 15,
      progress: 65,
      reward: '🏆 Push-up Master',
      difficulty: 'Orta'
    },
    {
      id: 2,
      title: 'Haftalık 10K Adım',
      description: 'Her gün 10.000 adım at',
      participants: 890,
      daysLeft: 3,
      progress: 85,
      reward: '🚶‍♂️ Step Master',
      difficulty: 'Kolay'
    },
    {
      id: 3,
      title: 'Protein Hedefi Challenge',
      description: '7 gün boyunca protein hedefini tut',
      participants: 567,
      daysLeft: 5,
      progress: 40,
      reward: '🥩 Protein Pro',
      difficulty: 'Orta'
    },
    {
      id: 4,
      title: 'Plank Endurance',
      description: '2 dakika plank tutmayı hedefle',
      participants: 345,
      daysLeft: 12,
      progress: 20,
      reward: '🎯 Core Champion',
      difficulty: 'Zor'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Fitness King', points: 2850, streak: 45, badge: '👑' },
    { rank: 2, name: 'Workout Queen', points: 2720, streak: 38, badge: '🥈' },
    { rank: 3, name: 'Gym Master', points: 2650, streak: 42, badge: '🥉' },
    { rank: 4, name: 'Strong Warrior', points: 2580, streak: 35, badge: '🏅' },
    { rank: 5, name: 'Fit Legend', points: 2490, streak: 30, badge: '⭐' },
    { rank: 6, name: user?.name || 'Sen', points: 1850, streak: 12, badge: '🔥', isUser: true }
  ];

  const achievements = [
    { 
      id: 1, 
      title: 'İlk Adım', 
      description: 'İlk antrenmanını tamamla', 
      icon: '🎯', 
      unlocked: true,
      date: '2 hafta önce'
    },
    { 
      id: 2, 
      title: 'Kararlı Başlangıç', 
      description: '7 gün üst üste antrenman yap', 
      icon: '🔥', 
      unlocked: true,
      date: '1 hafta önce'
    },
    { 
      id: 3, 
      title: 'Güçlü Gelişim', 
      description: 'İlk PR\'ını kır', 
      icon: '💪', 
      unlocked: true,
      date: '3 gün önce'
    },
    { 
      id: 4, 
      title: 'Beslenme Ustası', 
      description: '30 gün kalori hedefini tut', 
      icon: '🍎', 
      unlocked: false,
      progress: 65
    },
    { 
      id: 5, 
      title: 'Dayanıklılık Şampiyonu', 
      description: '100 antrenman tamamla', 
      icon: '🏆', 
      unlocked: false,
      progress: 45
    },
    { 
      id: 6, 
      title: 'Topluluk Lideri', 
      description: '50 kişiye motivasyon ver', 
      icon: '👥', 
      unlocked: false,
      progress: 20
    }
  ];

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'streak': return '🔥';
      case 'milestone': return '🎯';
      case 'nutrition': return '🥗';
      default: return '💪';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Kolay': return 'text-green-400';
      case 'Orta': return 'text-yellow-400';
      case 'Zor': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-6">
            {feedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="workout-card p-6 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl">
                    {post.user.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">{post.user.name}</span>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                        {post.user.level}
                      </span>
                      <span className="text-white/50 text-sm">{post.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg">{getPostTypeIcon(post.type)}</span>
                      <p className="text-white">{post.content}</p>
                    </div>
                    
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          className="w-full h-48 object-cover"
                          alt={post.content} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleFeatureClick('like-post')}
                        className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => handleFeatureClick('comment-post')}
                        className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      
                      <button
                        onClick={() => handleFeatureClick('share-post')}
                        className="flex items-center space-x-2 text-white/70 hover:text-green-400 transition-colors"
                      >
                        <Share className="w-5 h-5" />
                        <span>Paylaş</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'challenges':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="workout-card p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
                    <p className="text-white/70 text-sm">{challenge.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)} bg-white/10`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">İlerleme</span>
                    <span className="text-white">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">{challenge.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">{challenge.daysLeft} gün</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-white/70">Ödül: </span>
                    <span className="text-yellow-400">{challenge.reward}</span>
                  </div>
                  <Button
                    onClick={() => handleFeatureClick('join-challenge')}
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Katıl
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'leaderboard':
        return (
          <div className="workout-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Bu Ay Liderlik Tablosu 🏆</h2>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.isUser ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-2xl">{user.badge}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">#{user.rank}</span>
                        <span className={`font-medium ${user.isUser ? 'text-orange-400' : 'text-white'}`}>
                          {user.name}
                        </span>
                        {user.isUser && <span className="text-orange-400 text-sm">(Sen)</span>}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>{user.points} puan</span>
                        <span className="flex items-center space-x-1">
                          <Flame className="w-4 h-4 text-red-400" />
                          <span>{user.streak} gün</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {user.rank <= 3 && (
                    <div className="text-right">
                      <Medal className="w-6 h-6 text-yellow-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`workout-card p-6 rounded-xl text-center ${
                  achievement.unlocked ? 'neon-glow' : 'opacity-60'
                }`}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                <p className="text-white/70 text-sm mb-4">{achievement.description}</p>
                
                {achievement.unlocked ? (
                  <div>
                    <div className="text-green-400 font-medium mb-2">✅ Tamamlandı</div>
                    <div className="text-white/50 text-xs">{achievement.date}</div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2">
                      <div className="text-white/70 text-sm mb-1">İlerleme: {achievement.progress}%</div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-white/50 text-xs">Devam et!</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
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
            Topluluk & Motivasyon 🤝
          </h1>
          <p className="text-white/70 text-lg">Diğer sporcularla bağlan, motive ol ve yarış</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

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
      </div>
    </div>
  );
};

export default Community;
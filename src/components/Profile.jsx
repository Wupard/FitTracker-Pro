import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  LogOut, 
  Bell,
  Shield,
  Palette,
  Sun,
  Moon,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Profile = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || null,
  });
  const [theme, setTheme] = useState('dark');
  const fileInputRef = useRef(null);

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Bu özellik henüz geliştirilmedi",
      description: "Endişelenme! Bir sonraki promptunda isteyebilirsin! 🚀",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onUpdateUser(formData);
    toast({
      title: "Profil Güncellendi!",
      description: "Değişiklikler başarıyla kaydedildi.",
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        toast({
          title: "Profil Fotoğrafı Seçildi!",
          description: "Kaydet butonuna basarak değişikliği tamamla.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    toast({
      title: `Tema Değiştirildi: ${newTheme === 'dark' ? 'Koyu' : 'Açık'} Tema`,
      description: "Bu özellik yakında tam olarak entegre edilecek!",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Profil & Ayarlar ⚙️
          </h1>
          <p className="text-white/70 text-lg">Hesabını yönet ve uygulamayı kişiselleştir</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 workout-card p-6 rounded-xl text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              {formData.avatar ? (
                <img src={formData.avatar} alt="User avatar" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-5xl">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Edit className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
            <p className="text-white/70 mb-6">{formData.email}</p>
            
            <div className="flex justify-center space-x-4 mb-6">
              <div className="text-center"><div className="text-xl font-bold text-white">156</div><div className="text-white/70 text-sm">Antrenman</div></div>
              <div className="text-center"><div className="text-xl font-bold text-white">12</div><div className="text-white/70 text-sm">Streak</div></div>
              <div className="text-center"><div className="text-xl font-bold text-white">23</div><div className="text-white/70 text-sm">PR</div></div>
            </div>
            
            <Button onClick={onLogout} variant="destructive" className="w-full bg-red-500/80 hover:bg-red-500">
              <LogOut className="w-4 h-4 mr-2" />Çıkış Yap
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 workout-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Hesap Bilgileri</h2>
              {isEditing ? (
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">Kaydet</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Edit className="w-4 h-4 mr-2" />Düzenle
                </Button>
              )}
            </div>

            <div className="space-y-6 mb-8">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input type="text" name="name" placeholder="Ad Soyad" value={formData.name} onChange={handleInputChange} disabled={!isEditing} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-70" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input type="email" name="email" placeholder="E-posta" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-70" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input type="password" placeholder="********" disabled className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-70" />
                <Button onClick={() => handleFeatureClick('change-password')} variant="link" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400">Değiştir</Button>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mb-6 pt-6 border-t border-white/10">Uygulama Ayarları</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3"><Bell className="w-5 h-5 text-blue-400" /><span className="text-white">Bildirimler</span></div>
                <Button onClick={() => handleFeatureClick('notifications')} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Yönet</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3"><Shield className="w-5 h-5 text-green-400" /><span className="text-white">Gizlilik & Güvenlik</span></div>
                <Button onClick={() => handleFeatureClick('privacy')} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Yönet</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3"><Palette className="w-5 h-5 text-purple-400" /><span className="text-white">Görünüm</span></div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => toggleTheme('light')} variant="outline" size="icon" className={`border-white/20 text-white hover:bg-white/10 ${theme === 'light' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' : ''}`}>
                    <Sun className="w-5 h-5" />
                  </Button>
                  <Button onClick={() => toggleTheme('dark')} variant="outline" size="icon" className={`border-white/20 text-white hover:bg-white/10 ${theme === 'dark' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' : ''}`}>
                    <Moon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
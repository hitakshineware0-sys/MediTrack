import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, ChevronRight, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfilePageProps {
  onBack: () => void;
  t: (key: string) => string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, t }) => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    updateProfile(name);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="pb-32 pt-12 px-6 min-h-screen bg-[#020617]">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white">
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="text-3xl font-bold text-white font-display tracking-tight">{t('profile')}</h1>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-8 border-white/5 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-brand-primary/20 text-brand-primary rounded-[32px] flex items-center justify-center mb-4 border border-brand-primary/30">
            <User size={48} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
          <p className="text-sm text-slate-500 font-medium">{user?.email}</p>
        </div>

        <div className="glass-card p-6 border-white/5 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-[0.2em] ml-1">
                {t('name')}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-primary/50 transition-all text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-[0.2em] ml-1">
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="email" 
                  value={user?.email}
                  disabled
                  className="w-full pl-12 pr-5 py-4 glass border border-white/5 rounded-2xl opacity-50 text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg shadow-xl neon-glow-blue flex items-center justify-center gap-2"
          >
            {success ? (
              <>
                <CheckCircle2 size={20} />
                {t('saved')}
              </>
            ) : (
              <>
                <Save size={20} />
                {t('save_changes')}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

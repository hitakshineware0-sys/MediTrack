import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, Pill } from 'lucide-react';

interface LoginProps {
  onSwitch: () => void;
  t: (key: string) => string;
}

export const Login: React.FC<LoginProps> = ({ onSwitch, onForgotPassword, t }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        login(email);
      } else {
        setError(t('invalid_credentials'));
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#020617]">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse-glow" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 glass-card rounded-[24px] mb-6 border-white/20">
            <Pill className="w-10 h-10 text-brand-primary animate-float" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 font-display tracking-tight">
            {t('login_title')}
          </h1>
          <p className="text-slate-400">{t('app_tagline')}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-[32px] border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-[0.2em] ml-1">
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('placeholder_email')}
                  required
                  className="w-full pl-12 pr-5 py-4 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-primary/50 transition-all text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-[0.2em] ml-1">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('placeholder_password')}
                  required
                  className="w-full pl-12 pr-5 py-4 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-primary/50 transition-all text-white placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl font-bold text-lg shadow-xl neon-glow-blue flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                {t('login')}
              </>
            )}
          </motion.button>

          <div className="flex flex-col gap-4 text-center">
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-slate-400 hover:text-brand-primary transition-colors"
            >
              {t('forgot_password')}
            </button>
            <button 
              type="button"
              onClick={onSwitch}
              className="text-sm text-slate-400 hover:text-brand-primary transition-colors"
            >
              {t('dont_have_account')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

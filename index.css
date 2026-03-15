/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { ForgotPassword } from './components/Auth/ForgotPassword';
import { ProfilePage } from './components/ProfilePage';
import { 
  Pill, 
  Activity, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  CheckCircle2, 
  ChevronRight, 
  Heart, 
  Thermometer, 
  Droplets, 
  Clock,
  ArrowLeft,
  Bell,
  Languages,
  Globe,
  AlertTriangle,
  UserPlus,
  Phone,
  Info,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  Mail,
  X,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Medicine, HealthRecord, Screen, Language, Alert, Caregiver } from './types';
import { translations } from './translations';

const LANGUAGES: Language[] = [
  'English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 
  'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Odia', 'Assamese', 'Urdu'
];

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'welcome' | 'login' | 'signup' | 'forgot'>('welcome');

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'English';
  });

  const t = (key: string) => {
    return translations[language][key] || translations['English'][key] || key;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    if (authMode === 'welcome') {
      return <WelcomeScreen onStart={() => setAuthMode('login')} t={t} />;
    }
    if (authMode === 'login') {
      return <Login 
        onSwitch={() => setAuthMode('signup')} 
        onForgotPassword={() => setAuthMode('forgot')}
        t={t} 
      />;
    }
    if (authMode === 'signup') {
      return <Signup onSwitch={() => setAuthMode('login')} t={t} />;
    }
    return <ForgotPassword onBack={() => setAuthMode('login')} t={t} />;
  }

  return <MedicineApp language={language} setLanguage={setLanguage} t={t} />;
}

function WelcomeScreen({ onStart, t }: { onStart: () => void, t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden bg-[#020617]">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse-glow" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-brand-primary/30 rounded-[40px] blur-2xl animate-pulse-glow" />
        <div className="w-32 h-32 glass-card flex items-center justify-center relative z-10 border-white/20">
          <Pill className="w-16 h-16 text-white animate-float" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight font-display tracking-tight">
          <span className="text-brand-primary">{t('welcome_title_1')}</span> <br />
          {t('welcome_title_2')}
        </h1>
        <p className="text-lg text-slate-400 mb-12 max-w-xs mx-auto leading-relaxed">
          {t('welcome_desc')}
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="w-full max-w-xs py-5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-[24px] font-bold text-xl shadow-2xl neon-glow-blue relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <span className="relative z-10">{t('get_started')}</span>
      </motion.button>
    </div>
  );
}

function MedicineApp({ language, setLanguage, t }: { 
  language: Language, 
  setLanguage: (l: Language) => void,
  t: (key: string) => string 
}) {
  const { user, logout } = useAuth();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddCaregiver, setShowAddCaregiver] = useState(false);
  const [activeReminder, setActiveReminder] = useState<Medicine | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notifications_enabled');
    return saved === null ? true : saved === 'true';
  });
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem('voice_enabled');
    return saved === null ? true : saved === 'true';
  });

  // Audio for reminder
  const [audio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  // New Medicine Form State
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '' });
  // New Record Form State
  const [newRecord, setNewRecord] = useState<{ type: HealthRecord['type'], value: string }>({ type: 'Blood Pressure', value: '' });
  // New Caregiver Form State
  const [newCaregiver, setNewCaregiver] = useState<Caregiver>({ name: '', phone: '', email: '' });

  const getVoiceLanguageCode = (lang: Language) => {
    const mapping: Record<Language, string> = {
      'English': 'en-IN',
      'Hindi': 'hi-IN',
      'Marathi': 'mr-IN',
      'Tamil': 'ta-IN',
      'Telugu': 'te-IN',
      'Kannada': 'kn-IN',
      'Malayalam': 'ml-IN',
      'Gujarati': 'gu-IN',
      'Punjabi': 'pa-IN',
      'Bengali': 'bn-IN',
      'Odia': 'or-IN',
      'Assamese': 'as-IN',
      'Urdu': 'ur-IN'
    };
    return mapping[lang] || 'en-IN';
  };

  const speakReminder = (message: string, languageCode: string) => {
    if (!voiceEnabled) return;
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = languageCode;
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  // Persist language
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Persist notifications setting
  useEffect(() => {
    localStorage.setItem('notifications_enabled', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  // Persist voice setting
  useEffect(() => {
    localStorage.setItem('voice_enabled', voiceEnabled.toString());
  }, [voiceEnabled]);

  const sendCaregiverNotification = (medicineName: string, time: string, caregiverPhone: string) => {
    const message = `⚠️ Medicine Alert: A medicine was missed.\nMedicine: ${medicineName}\nScheduled Time: ${time}`;
    const whatsappURL = `https://wa.me/${caregiverPhone}?text=${encodeURIComponent(message)}`;
    
    console.log(`[WHATSAPP NOTIFICATION] Opening WhatsApp alert for ${caregiverPhone}`);
    window.open(whatsappURL, "_blank");
  };

  // Alert Monitoring Logic
  useEffect(() => {
    if (!notificationsEnabled) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      
      medicines.forEach(med => {
        if (med.taken) return;

        const [medHour, medMin] = med.time.split(':').map(Number);
        const medDate = new Date();
        medDate.setHours(medHour, medMin, 0, 0);

        // Check if snoozed
        if (med.snoozedUntil) {
          const snoozeDate = new Date(med.snoozedUntil);
          if (now < snoozeDate) return;
        }

        const diffMinutes = (now.getTime() - medDate.getTime()) / (1000 * 60);

        // Alert when time arrives (within 1 minute)
        if (Math.abs(diffMinutes) < 1 || (med.snoozedUntil && Math.abs((now.getTime() - new Date(med.snoozedUntil).getTime()) / (1000 * 60)) < 1)) {
          const alertId = `time-${med.id}-${now.toDateString()}-${now.getHours()}-${now.getMinutes()}`;
          if (!alerts.find(a => a.id === alertId)) {
            const newAlert: Alert = {
              id: alertId,
              title: t('time_to_take'),
              message: `${med.name} (${med.dosage})`,
              type: 'upcoming',
              medicineName: med.name,
              scheduledTime: med.time,
              timestamp: now.toISOString(),
              isRead: false
            };
            setAlerts(prev => [newAlert, ...prev]);
            setActiveReminder(med);
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Voice Reminder
            if (voiceEnabled) {
              const msg = t('voice_reminder_msg').replace('{medicineName}', med.name);
              speakReminder(msg, getVoiceLanguageCode(language));
            }
          }
        }

        // Alert when missed (30 minutes late)
        if (diffMinutes >= 30 && diffMinutes < 35) {
          const alertId = `missed-${med.id}-${now.toDateString()}`;
          if (!alerts.find(a => a.id === alertId)) {
            const newAlert: Alert = {
              id: alertId,
              title: t('missed'),
              message: `${t('caregiver_alert')} ${med.name}`,
              type: 'missed',
              medicineName: med.name,
              scheduledTime: med.time,
              timestamp: now.toISOString(),
              isRead: false
            };
            setAlerts(prev => [newAlert, ...prev]);
            
            // Trigger caregiver notification via WhatsApp
            if (caregiver && caregiver.phone) {
              sendCaregiverNotification(med.name, med.time, caregiver.phone);
            }
          }
        }
      });
    }, 10000); // Check every 10 seconds for better responsiveness

    return () => clearInterval(interval);
  }, [medicines, alerts, caregiver, audio]);

  const addMedicine = () => {
    if (newMed.name && newMed.time && newMed.dosage) {
      setMedicines([...medicines, { ...newMed, id: Date.now().toString(), taken: false }]);
      setNewMed({ name: '', time: '', dosage: '' });
      setShowAddMedicine(false);
    }
  };

  const markAsTaken = (id: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, taken: true, lastTakenDate: new Date().toISOString(), snoozedUntil: undefined } : m
    ));
    if (activeReminder?.id === id) {
      setActiveReminder(null);
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const snoozeMedicine = (id: string) => {
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + 5); // Snooze for 5 minutes
    
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, snoozedUntil: snoozeTime.toISOString() } : m
    ));
    setActiveReminder(null);
    audio.pause();
    audio.currentTime = 0;
  };

  const addHealthRecord = () => {
    if (newRecord.value) {
      const units: Record<HealthRecord['type'], string> = {
        'Blood Pressure': 'mmHg',
        'Sugar Level': 'mg/dL',
        'Heart Rate': 'bpm',
        'Temperature': '°F'
      };
      
      const val = parseFloat(newRecord.value);
      let isAbnormal = false;
      let abnormalMsg = '';

      if (newRecord.type === 'Blood Pressure' && (val > 140 || val < 90)) {
        isAbnormal = true;
        abnormalMsg = val > 140 ? t('high_bp') : t('low_bp');
      } else if (newRecord.type === 'Sugar Level' && (val > 200 || val < 70)) {
        isAbnormal = true;
        abnormalMsg = val > 200 ? t('high_sugar') : t('low_sugar');
      } else if (newRecord.type === 'Heart Rate' && (val > 100 || val < 60)) {
        isAbnormal = true;
        abnormalMsg = val > 100 ? t('high_heart') : t('low_heart');
      } else if (newRecord.type === 'Temperature' && val > 100.4) {
        isAbnormal = true;
        abnormalMsg = t('high_temp');
      }

      if (isAbnormal) {
        const newAlert: Alert = {
          id: `health-${Date.now()}`,
          title: t('abnormal_health'),
          message: abnormalMsg,
          type: 'abnormal',
          timestamp: new Date().toISOString(),
          isRead: false
        };
        setAlerts(prev => [newAlert, ...prev]);
      }

      setHealthRecords([
        ...healthRecords, 
        { 
          ...newRecord, 
          id: Date.now().toString(), 
          unit: units[newRecord.type], 
          timestamp: new Date().toISOString() 
        }
      ]);
      setNewRecord({ ...newRecord, value: '' });
      setShowAddRecord(false);
    }
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse-glow" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-brand-primary/30 rounded-[40px] blur-2xl animate-pulse-glow" />
        <div className="w-32 h-32 glass-card flex items-center justify-center relative z-10 border-white/20">
          <Pill className="w-16 h-16 text-white animate-float" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight font-display tracking-tight">
          <span className="text-gradient">{t('welcome_title_1')}</span> <br />
          {t('welcome_title_2')}
        </h1>
        <p className="text-lg text-slate-400 mb-12 max-w-xs mx-auto leading-relaxed">
          {t('welcome_desc')}
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen('medicine')}
        className="w-full max-w-xs py-5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-[24px] font-bold text-xl shadow-2xl neon-glow-blue relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <span className="relative z-10">{t('get_started')}</span>
      </motion.button>
    </div>
  );

  const renderMedicineScreen = () => (
    <div className="pb-32 pt-12 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold text-white font-display tracking-tight mb-1">{t('medicines')}</h2>
          <p className="text-slate-400 font-medium">{t('daily_schedule')}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddMedicine(true)}
          className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-2xl flex items-center justify-center shadow-lg neon-glow-blue"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      {medicines.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
            <Pill className="w-12 h-12 text-slate-500" />
          </div>
          <p className="text-xl font-bold text-slate-300 mb-2">{t('no_meds')}</p>
          <p className="text-slate-500 mb-8 max-w-[200px]">{t('add_first_med')}</p>
          <button 
            onClick={() => setShowAddMedicine(true)}
            className="text-brand-secondary font-bold text-lg hover:text-brand-primary transition-colors"
          >
            + {t('add_medicine')}
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {medicines.map((med, index) => (
            <motion.div 
              key={med.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 group transition-all duration-500 ${
                med.taken ? 'opacity-60 grayscale-[0.5]' : 'neon-glow-blue'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                  med.taken ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-primary/20 text-brand-primary'
                }`}>
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                  <Pill size={32} className="relative z-10" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-1 ${med.taken ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {med.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-secondary" /> {med.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" /> {med.dosage}
                    </span>
                  </div>
                </div>
                {!med.taken ? (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markAsTaken(med.id)}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                  >
                    <CheckCircle2 size={24} />
                  </motion.button>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={28} />
                  </div>
                )}
              </div>
              
              {/* Progress Indicator for active meds */}
              {!med.taken && (
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-30"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTrackerScreen = () => {
    const recordTypes: { type: HealthRecord['type'], icon: any, color: string, bg: string, glow: string }[] = [
      { type: 'Blood Pressure', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/20', glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]' },
      { type: 'Sugar Level', icon: Droplets, color: 'text-amber-400', bg: 'bg-amber-500/20', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
      { type: 'Heart Rate', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/20', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
      { type: 'Temperature', icon: Thermometer, color: 'text-sky-400', bg: 'bg-sky-500/20', glow: 'shadow-[0_0_20px_rgba(14,165,233,0.2)]' },
    ];

    return (
      <div className="pb-32 pt-12 px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white font-display tracking-tight mb-1">{t('health_tracker')}</h2>
            <p className="text-slate-400 font-medium">{t('monitor_vitals')}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddRecord(true)}
            className="w-14 h-14 bg-gradient-to-br from-brand-secondary to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg neon-glow-blue"
          >
            <Plus size={28} />
          </motion.button>
        </div>

        {healthRecords.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Activity className="w-12 h-12 text-slate-500" />
            </div>
            <p className="text-xl font-bold text-slate-300 mb-2">{t('no_records')}</p>
            <p className="text-slate-500 mb-8 max-w-[200px]">{t('start_tracking')}</p>
            <button 
              onClick={() => setShowAddRecord(true)}
              className="text-brand-secondary font-bold text-lg hover:text-brand-primary transition-colors"
            >
              + {t('new_record')}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {recordTypes.map((rt, index) => {
                const latest = [...healthRecords].reverse().find(r => r.type === rt.type);
                return (
                  <motion.div 
                    key={rt.type} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-5 border-white/5 ${rt.glow}`}
                  >
                    <div className={`w-12 h-12 ${rt.bg} ${rt.color} rounded-xl flex items-center justify-center mb-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/5 animate-pulse" />
                      <rt.icon size={24} className="relative z-10" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{t(rt.type.toLowerCase().replace(' ', '_'))}</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-white">
                        {latest ? latest.value : '--'}
                      </p>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{latest?.unit || ''}</span>
                    </div>
                    
                    {/* Tiny Sparkline Placeholder */}
                    <div className="mt-4 h-8 flex items-end gap-1">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-t-sm ${rt.color.replace('text', 'bg')} opacity-20`} 
                          style={{ height: `${h}%` }} 
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-xl font-bold text-white font-display">{t('recent_logs')}</h3>
                <button className="text-brand-secondary text-sm font-bold uppercase tracking-widest">{t('view_all')}</button>
              </div>
              <div className="space-y-4">
                {healthRecords.slice(-5).reverse().map((record, index) => (
                  <motion.div 
                    key={record.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-4 flex items-center justify-between border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-brand-secondary">
                        {(() => {
                          const Icon = recordTypes.find(rt => rt.type === record.type)?.icon;
                          return Icon ? <Icon size={20} /> : null;
                        })()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{t(record.type.toLowerCase().replace(' ', '_'))}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white text-lg">{record.value}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{record.unit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAlertsScreen = () => {
    const adherence = medicines.length > 0 
      ? Math.round((medicines.filter(m => m.taken).length / medicines.length) * 100) 
      : 0;

    return (
      <div className="pb-32 pt-12 px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white font-display tracking-tight mb-1">{t('alerts_safety')}</h2>
            <p className="text-slate-400 font-medium">{t('emergency_contacts')}</p>
          </div>
          <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-rose-400 border-rose-500/20">
            <ShieldAlert size={28} />
          </div>
        </div>

        <div className="space-y-8">
          {/* Adherence Card */}
          {medicines.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-gradient-to-br from-brand-primary to-indigo-600 rounded-[40px] text-white shadow-2xl neon-glow-blue relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{t('med_adherence')}</p>
                  <h3 className="text-5xl font-bold font-display">{adherence}%</h3>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <Activity size={28} />
                </div>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative z-10 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${adherence}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </div>
              <p className="mt-4 text-white/60 text-xs font-medium relative z-10">
                {adherence >= 80 ? t('great_job') : t('keep_it_up')}
              </p>
            </motion.div>
          )}

          {/* Recent Notifications Section */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xl font-bold text-white font-display">{t('recent_notifications')}</h3>
              <span className="px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-secondary border-brand-secondary/20">
                {alerts.length} {t('alerts')}
              </span>
            </div>
            
            {alerts.length === 0 ? (
              <div className="glass-card p-12 text-center border-white/5">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Bell className="text-slate-500" size={32} />
                </div>
                <p className="text-slate-400 font-medium">{t('no_alerts')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-5 border-white/5 ${
                      alert.type === 'missed' ? 'bg-rose-500/5 border-rose-500/20' : 
                      alert.type === 'abnormal' ? 'bg-amber-500/5 border-amber-500/20' : 
                      'bg-white/5'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        alert.type === 'missed' ? 'bg-rose-500/20 text-rose-400' : 
                        alert.type === 'abnormal' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-brand-primary/20 text-brand-primary'
                      }`}>
                        {alert.type === 'missed' || alert.type === 'abnormal' ? <AlertTriangle size={24} /> : <Bell size={24} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white">{alert.title}</h4>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3 leading-relaxed">{alert.message}</p>
                        {alert.medicineName && (
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 glass rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 border-white/5">
                              {alert.medicineName}
                            </span>
                            <span className="px-2 py-1 glass rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 border-white/5">
                              {alert.scheduledTime}
                            </span>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                              alert.type === 'missed' ? 'bg-rose-500/20 text-rose-400' : 'bg-brand-primary/20 text-brand-primary'
                            }`}>
                              {alert.type === 'missed' ? t('missed') : t('upcoming')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="pb-32 pt-12 px-6">
      <h2 className="text-4xl font-bold text-white font-display tracking-tight mb-10">{t('settings')}</h2>
      
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-2xl flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">{user?.name}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('profile')}</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen('profile')}
              className="text-brand-primary font-bold text-sm uppercase tracking-widest"
            >
              {t('edit')}
            </motion.button>
          </div>
        </div>

        {/* Caregiver Section */}
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">{t('caregiver')}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('emergency_contact')}</p>
              </div>
            </div>
            {!caregiver && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCaregiver(true)}
                className="text-brand-secondary font-bold text-sm uppercase tracking-widest"
              >
                {t('add')}
              </motion.button>
            )}
          </div>
          
          {caregiver ? (
            <div className="p-4 glass rounded-2xl flex items-center justify-between border-white/5">
              <div>
                <p className="font-bold text-white">{caregiver.name}</p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                  <Phone size={12} className="text-brand-secondary" /> {caregiver.phone}
                </p>
              </div>
              <button 
                onClick={() => setCaregiver(null)} 
                className="text-rose-400 text-[10px] font-bold uppercase tracking-widest hover:text-rose-300 transition-colors"
              >
                {t('remove')}
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic px-2">{t('no_caregiver')}</p>
          )}
        </div>

        {/* Language Section */}
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-2xl flex items-center justify-center">
              <Languages size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">{t('language')}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('choose_language')}</p>
            </div>
          </div>
          
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full p-4 glass border border-white/5 rounded-2xl focus:outline-none font-bold text-slate-300 appearance-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang} className="bg-[#020617] text-white">{lang}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronRight size={20} className="rotate-90" />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">{t('notifications')}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('manage_alerts')}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className="w-full flex items-center justify-between p-5 glass rounded-2xl border-white/5 active:bg-white/5 transition-all"
          >
            <span className="font-bold text-slate-300">{t('med_reminders')}</span>
            <div className={`w-14 h-7 rounded-full relative transition-all duration-300 ${notificationsEnabled ? 'bg-brand-primary neon-glow-blue' : 'bg-white/10'}`}>
              <motion.div 
                animate={{ x: notificationsEnabled ? 28 : 4 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              />
            </div>
          </button>
        </div>

        {/* Voice Reminders Section */}
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">{t('voice_reminders')}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('manage_alerts')}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="w-full flex items-center justify-between p-5 glass rounded-2xl border-white/5 active:bg-white/5 transition-all"
          >
            <span className="font-bold text-slate-300">{t('voice_reminders')}</span>
            <div className={`w-14 h-7 rounded-full relative transition-all duration-300 ${voiceEnabled ? 'bg-brand-primary neon-glow-blue' : 'bg-white/10'}`}>
              <motion.div 
                animate={{ x: voiceEnabled ? 28 : 4 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              />
            </div>
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen('privacy')}
            className="glass-card p-6 border-white/5 flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 bg-slate-500/10 text-slate-400 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{t('privacy')}</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen('help')}
            className="glass-card p-6 border-white/5 flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 bg-slate-500/10 text-slate-400 rounded-2xl flex items-center justify-center">
              <HelpCircle size={24} />
            </div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{t('help')}</span>
          </motion.button>
        </div>

        <div className="text-center pt-12 space-y-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => logout()}
            className="w-full py-4 glass border border-rose-500/20 text-rose-400 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            {t('logout')}
          </motion.button>
          
          <div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] mb-2">{t('app_name')} v2.0</p>
            <p className="text-[10px] text-slate-700 font-medium">{t('app_tagline')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageScreen = () => (
    <div className="pb-32 pt-12 px-6">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setScreen('settings')} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white">
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-3xl font-bold text-white font-display tracking-tight">{t('language')}</h2>
      </div>
      
      <div className="space-y-4">
        {LANGUAGES.map(lang => (
          <motion.button
            key={lang}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setLanguage(lang as Language);
              setScreen('settings');
            }}
            className={`w-full p-6 rounded-3xl border flex items-center justify-between transition-all ${
              language === lang 
                ? 'bg-brand-primary/20 border-brand-primary neon-glow-blue' 
                : 'glass border-white/5 text-slate-400'
            }`}
          >
            <span className={`font-bold ${language === lang ? 'text-white' : ''}`}>{lang}</span>
            {language === lang && <div className="w-2 h-2 bg-brand-primary rounded-full neon-glow-blue" />}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderPrivacyScreen = () => (
    <div className="pb-32 pt-12 px-6">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setScreen('settings')} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white">
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-3xl font-bold text-white font-display tracking-tight">{t('privacy')}</h2>
      </div>
      
      <div className="glass-card p-8 border-white/5 space-y-8">
        <section>
          <h3 className="text-brand-secondary font-bold text-xs uppercase tracking-widest mb-4">{t('data_security')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t('privacy_info')}
          </p>
        </section>
        
        <div className="h-px bg-white/5" />
        
        <section>
          <h3 className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-4">{t('encryption')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t('encryption_info')}
          </p>
        </section>

        <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20">
          <p className="text-xs text-brand-primary font-medium text-center">
            {t('last_updated')}: March 15, 2026
          </p>
        </div>
      </div>
    </div>
  );

  const renderHelpScreen = () => (
    <div className="pb-32 pt-12 px-6">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => setScreen('settings')} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white">
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-3xl font-bold text-white font-display tracking-tight">{t('help')}</h2>
      </div>
      
      <div className="space-y-6">
        <div className="glass-card p-8 border-white/5 text-center bg-brand-gradient">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t('help_desc')}</h3>
          <p className="text-white/60 text-sm mb-8">{t('support_team_info')}</p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:support@smartmedicine.com"
            className="inline-flex items-center justify-center w-full py-4 bg-white text-brand-primary font-bold rounded-2xl shadow-xl"
          >
            {t('support_email')}
          </motion.a>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6 px-2">{t('faq')}</h3>
          <div className="space-y-4">
            {[
              { q: t('faq_q1'), a: t('faq_a1') },
              { q: t('faq_q2'), a: t('faq_a2') },
              { q: t('faq_q3'), a: t('faq_a3') }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 border-white/5">
                <p className="font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-brand-primary">Q.</span> {item.q}
                </p>
                <p className="text-sm text-slate-400 font-medium leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] relative overflow-x-hidden text-slate-200">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[30%] bg-brand-secondary/10 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'welcome' ? (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderWelcome()}
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="min-h-screen relative z-10"
          >
            {screen === 'medicine' && renderMedicineScreen()}
            {screen === 'tracker' && renderTrackerScreen()}
            {screen === 'alerts' && renderAlertsScreen()}
            {screen === 'settings' && renderSettings()}
            {screen === 'profile' && <ProfilePage onBack={() => setScreen('settings')} t={t} />}
            {screen === 'language' && renderLanguageScreen()}
            {screen === 'privacy' && renderPrivacyScreen()}
            {screen === 'help' && renderHelpScreen()}

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-8 pt-4 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent pointer-events-none">
              <div className="glass rounded-[32px] p-2 border-white/5 flex items-center justify-between shadow-2xl pointer-events-auto">
                {[
                  { id: 'medicine', icon: Pill, label: t('medicines') },
                  { id: 'tracker', icon: Activity, label: t('tracker') },
                  { id: 'alerts', icon: ShieldAlert, label: t('alerts') },
                  { id: 'settings', icon: Settings, label: t('settings') }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setScreen(tab.id as Screen)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all relative ${
                      screen === tab.id || (tab.id === 'settings' && ['language', 'privacy', 'help'].includes(screen))
                        ? 'text-brand-primary' 
                        : 'text-slate-500'
                    }`}
                  >
                    {(screen === tab.id || (tab.id === 'settings' && ['language', 'privacy', 'help'].includes(screen))) && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-brand-primary/10 rounded-2xl border border-brand-primary/20"
                      />
                    )}
                    <tab.icon size={20} className={(screen === tab.id || (tab.id === 'settings' && ['language', 'privacy', 'help'].includes(screen))) ? 'neon-glow-blue' : ''} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Medicine Modal */}
      <AnimatePresence>
        {showAddMedicine && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-md rounded-[32px] p-8 border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white font-display">{t('add_medicine')}</h3>
                <button onClick={() => setShowAddMedicine(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('med_name')}</label>
                  <input 
                    type="text"
                    value={newMed.name}
                    onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                    placeholder={t('placeholder_med_name')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('time')}</label>
                    <input 
                      type="time"
                      value={newMed.time}
                      onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('dosage')}</label>
                    <input 
                      type="text"
                      value={newMed.dosage}
                      onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                      placeholder={t('placeholder_dosage')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addMedicine}
                  className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold mt-4 shadow-lg shadow-brand-primary/20"
                >
                  {t('save_medicine')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Health Record Modal */}
      <AnimatePresence>
        {showAddRecord && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-md rounded-[32px] p-8 border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white font-display">{t('new_record')}</h3>
                <button onClick={() => setShowAddRecord(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('vitals_type')}</label>
                  <select 
                    value={newRecord.type}
                    onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  >
                    <option value="Blood Pressure" className="bg-slate-900">{t('blood_pressure')}</option>
                    <option value="Sugar Level" className="bg-slate-900">{t('sugar_level')}</option>
                    <option value="Heart Rate" className="bg-slate-900">{t('heart_rate')}</option>
                    <option value="Temperature" className="bg-slate-900">{t('temperature')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('value')}</label>
                  <input 
                    type="text"
                    value={newRecord.value}
                    onChange={(e) => setNewRecord({...newRecord, value: e.target.value})}
                    placeholder={t('enter_value')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addHealthRecord}
                  className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold mt-4 shadow-lg shadow-brand-primary/20"
                >
                  {t('save_record')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Caregiver Modal */}
      <AnimatePresence>
        {showAddCaregiver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="glass-card w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white font-display">{t('add_caregiver')}</h3>
                <button onClick={() => setShowAddCaregiver(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400">✕</button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">{t('name')}</label>
                  <input 
                    type="text" 
                    placeholder={t('placeholder_name')}
                    className="w-full p-5 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-secondary/50 transition-all text-white placeholder:text-slate-600"
                    value={newCaregiver.name}
                    onChange={e => setNewCaregiver({...newCaregiver, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">{t('phone_number')}</label>
                  <input 
                    type="tel" 
                    placeholder={t('placeholder_phone')}
                    className="w-full p-5 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-secondary/50 transition-all text-white placeholder:text-slate-600"
                    value={newCaregiver.phone}
                    onChange={e => setNewCaregiver({...newCaregiver, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">{t('email')}</label>
                  <input 
                    type="email" 
                    placeholder={t('placeholder_email')}
                    className="w-full p-5 glass border border-white/5 rounded-2xl focus:outline-none focus:border-brand-secondary/50 transition-all text-white placeholder:text-slate-600"
                    value={newCaregiver.email}
                    onChange={e => setNewCaregiver({...newCaregiver, email: e.target.value})}
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (newCaregiver.name && (newCaregiver.phone || newCaregiver.email)) {
                      setCaregiver(newCaregiver);
                      setShowAddCaregiver(false);
                      setNewCaregiver({ name: '', phone: '', email: '' });
                    }
                  }}
                  className="w-full py-5 bg-brand-secondary text-white rounded-2xl font-bold text-lg shadow-xl neon-glow-teal mt-4"
                >
                  {t('save_caregiver')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Reminder Modal */}
      <AnimatePresence>
        {activeReminder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm rounded-[40px] p-10 border-white/10 shadow-2xl text-center"
            >
              <div className="w-24 h-24 bg-brand-primary/20 text-brand-primary rounded-[32px] flex items-center justify-center mx-auto mb-8 neon-glow-blue relative">
                <Pill size={48} />
                <div className="absolute inset-0 bg-brand-primary/20 rounded-[32px] animate-ping" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-display">{t('time_to_take')}</h3>
              <p className="text-slate-400 mb-10 font-medium text-lg">
                {activeReminder.name} <span className="text-brand-primary">({activeReminder.dosage})</span>
              </p>
              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => markAsTaken(activeReminder.id)}
                  className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-xl shadow-2xl neon-glow-blue"
                >
                  {t('taken_btn')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => snoozeMedicine(activeReminder.id)}
                  className="w-full py-5 glass text-slate-300 rounded-2xl font-bold text-lg border-white/5"
                >
                  {t('snooze')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

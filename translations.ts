export type Language = 'English' | 'Hindi' | 'Marathi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Kannada' | 'Malayalam' | 'Gujarati' | 'Punjabi' | 'Odia' | 'Assamese' | 'Urdu';

export interface Medicine {
  id: string;
  name: string;
  time: string;
  dosage: string;
  taken: boolean;
  lastTakenDate?: string;
  snoozedUntil?: string;
}

export interface HealthRecord {
  id: string;
  type: 'Blood Pressure' | 'Sugar Level' | 'Heart Rate' | 'Temperature';
  value: string;
  unit: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'missed' | 'upcoming' | 'completed' | 'abnormal';
  medicineName?: string;
  scheduledTime?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Caregiver {
  name: string;
  phone: string;
  email?: string;
}

export type Screen = 'welcome' | 'medicine' | 'tracker' | 'alerts' | 'settings' | 'language' | 'privacy' | 'help' | 'profile';

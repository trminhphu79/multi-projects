export type UserState = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  token: string;
  isAuthenticated: boolean;
  avatarUrl?: string;
  preferences?: UserPreferences;
};

export type UserPreferences = {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
};

export type AppState = {
  user: Partial<UserState>;
};

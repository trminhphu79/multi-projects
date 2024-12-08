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

export type SideBarItem = {
  label: string;
  tooltip: string;
  route: string;
  icon: string;
  badgeValue?: number;
  selected: boolean;
};
export type System = {
  sideBar: SideBarItem[];
};

export type AppState = {
  user: Partial<UserState>;
  system: System;
};

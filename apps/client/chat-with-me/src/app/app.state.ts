import { AppState } from '@client/store/model';

export const INITIAL_APP_STATE: AppState = {
  user: {
    isAuthenticated: false,
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMNpkRt1Ne0-2XKnjHeLTZG7KPczq467hQfQ&s',
    preferences: {
      theme: 'dark',
      language: 'vi',
      notificationsEnabled: false,
    },
  },
};

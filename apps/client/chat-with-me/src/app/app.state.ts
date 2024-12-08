import { AppState } from '@client/store/model';

export const SIDE_BAR_ITEM = [
  {
    label: 'Chat with me',
    tooltip: 'Chat',
    route: '',
    icon: 'pi pi-comments',
    badgeValue: 4,
    selected: true,
  },
  {
    label: 'Profile',
    tooltip: 'Profile',
    route: '/me',
    icon: 'pi pi-user',
    selected: false,
  },
  {
    label: 'Settings',
    tooltip: 'Settings',
    route: '/settings',
    icon: 'pi pi-spin pi-cog',
    selected: false,
  },
  {
    label: 'LinkedIn',
    tooltip: 'Linkedin',
    route: '/about',
    icon: 'pi pi-linkedin',
    selected: false,
  },
];

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
  system: {
    sideBar: SIDE_BAR_ITEM,
  },
};

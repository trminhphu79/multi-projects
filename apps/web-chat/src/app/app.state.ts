import { AppState } from '@client/store/model';

export const SIDE_BAR_ITEM = [
  {
    label: 'Chat with me',
    tooltip: 'Chat',
    route: '',
    icon: 'pi pi-comments',
    badgeValue: 4,
    redirect: true,
  },
  {
    label: 'Add friends',
    tooltip: 'Add friends',
    icon: 'pi pi-user-plus',
    redirect: false,
  },
  {
    label: 'Profile',
    tooltip: 'Profile',
    route: '/me',
    icon: 'pi pi-user',
    redirect: true,
  },
  {
    label: 'Settings',
    tooltip: 'Settings',
    route: '/settings',
    icon: 'pi pi-spin pi-cog',
    redirect: true,
  },
  {
    label: 'LinkedIn',
    tooltip: 'Linkedin',
    route: 'https://www.phutran.info.vn/',
    icon: 'pi pi-linkedin',
    externalLink: true,
    redirect: false,
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

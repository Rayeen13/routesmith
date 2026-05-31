
export const Routes = {
  About: 'AboutScreen',
  Home: 'HomeScreen',
  Login: 'Login',
  Profile: 'ProfileScreen',
  Settings: 'SettingsScreen',
} as const;

export const router = {
  about: () => Routes.About,
  home: () => Routes.Home,
  login: () => Routes.Login,
  profile: () => Routes.Profile,
  settings: () => Routes.Settings,
} as const;


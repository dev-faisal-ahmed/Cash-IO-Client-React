type NavLinksType = {
  title: 'Home' | 'Profile' | 'Transactions';
  path: string;
}[];

export const navLinks: NavLinksType = [
  { title: 'Home', path: '/' },
  { title: 'Profile', path: '/profile' },
  { title: 'Transactions', path: '/transactions' },
];

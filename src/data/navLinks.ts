type NavLinksType = {
  title: 'Home' | 'Profile' | 'Transactions';
  path: string;
}[];

export const navLinks: NavLinksType = [
  { title: 'Home', path: '/' },
  { title: 'Transactions', path: '/transactions' },
  { title: 'Profile', path: '/profile' },
];

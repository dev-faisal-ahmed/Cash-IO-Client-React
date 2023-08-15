type NavLinksType = {
  title: string;
  path: string;
}[];

export const navLinks: NavLinksType = [
  { title: 'Home', path: '/' },
  { title: 'Profile', path: '/profile/:userEmail' },
  { title: 'Transactions', path: '/transactions/:userEmail' },
];

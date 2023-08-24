type NavLinksType = {
  title: 'Home' | 'Wallet' | 'Transactions';
  path: string;
}[];

export const navLinks: NavLinksType = [
  { title: 'Home', path: '/' },
  { title: 'Transactions', path: '/transactions' },
  { title: 'Wallet', path: '/wallet' },
];

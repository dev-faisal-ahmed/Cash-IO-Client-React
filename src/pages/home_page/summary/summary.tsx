import { SummaryBox } from './summaryBox';
// import { BiSolidWalletAlt } from 'react-icons/bi';
// import { BsFillCalendar2MinusFill, BsCalendar2PlusFill } from 'react-icons/bs';
import { WalletType } from '../../../utils/types';

type SummaryType = {
  wallets: WalletType[];
};

export function Summary({ wallets }: SummaryType) {
  return (
    <section className='grid gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
      <SummaryBox title='Balance' data={wallets} />
      <SummaryBox title='Earnings' data={wallets} />
      <SummaryBox title='Expenses' data={wallets} />
    </section>
  );
}

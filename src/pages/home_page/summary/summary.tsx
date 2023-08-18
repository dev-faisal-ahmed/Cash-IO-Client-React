import SummaryBox from './summaryBox';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { BsFillCalendar2MinusFill, BsCalendar2PlusFill } from 'react-icons/bs';

type SummaryType = {
  balance: number;
  expense: number;
  revenue: number;
};

export function Summary({ balance, expense, revenue }: SummaryType) {
  return (
    <section className='grid gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
      <SummaryBox
        icon={<BiSolidWalletAlt size={35} />}
        title='Balance'
        value={balance}
      />
      <SummaryBox
        icon={<BsCalendar2PlusFill size={35} />}
        title='Earnings'
        value={revenue}
      />
      <SummaryBox
        icon={<BsFillCalendar2MinusFill size={35} />}
        title='Expense'
        value={expense}
      />
    </section>
  );
}

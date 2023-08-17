import SummaryBox from './summaryBox';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { BsFillCalendar2MinusFill, BsCalendar2PlusFill } from 'react-icons/bs';
export function Summary() {
  return (
    <section className='grid gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
      <SummaryBox
        icon={<BiSolidWalletAlt size={35} />}
        title='Balance'
        value={250}
      />
      <SummaryBox
        icon={<BsCalendar2PlusFill size={35} />}
        title='Earnings'
        value={250}
      />
      <SummaryBox
        icon={<BsFillCalendar2MinusFill size={35} />}
        title='Expense'
        value={250}
      />
    </section>
  );
}

import { useState } from 'react';
import { SummaryBox } from './summaryBox';
import { WalletType } from '../../../utils/types';
import { getWalletMap } from '../../../utils/helper';
import { twMerge } from 'tailwind-merge';

type SummaryType = {
  wallets: WalletType[];
};

export function Summary({ wallets }: SummaryType) {
  const { keys: walletsName, walletsMap } = getWalletMap(wallets);
  const [walletName, setWalletName] = useState<string>(walletsName[0]);

  return (
    <>
      <div className={twMerge(`center-y mb-3 mt-1 justify-between`)}>
        <h3 className='text-lg font-semibold'>Summary of {walletName}</h3>
        <div className='rounded-md bg-white px-2 py-1'>
          <select
            onChange={(e) => setWalletName(e.target.value)}
            className='cursor-pointer outline-none'
          >
            {walletsName.map((name: string) => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
        <SummaryBox
          key={'Balance'}
          title='Balance'
          value={
            (walletsMap[walletName].revenue - walletsMap[walletName].expense) |
            0
          }
        />
        <SummaryBox
          key={'Earnings'}
          title='Earnings'
          value={walletsMap[walletName].revenue | 0}
        />
        <SummaryBox
          key={'Expenses'}
          title='Expenses'
          value={walletsMap[walletName].expense | 0}
        />
      </div>
    </>
  );
}

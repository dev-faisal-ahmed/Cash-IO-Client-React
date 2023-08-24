import { useEffect, useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { AddWallet } from './addWallet';
import { twMerge } from 'tailwind-merge';
import { WalletBox } from './walletBox';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { useGetWallets } from '../../hooks/useGetWallets';

export function WalletPage() {
  const [showAddWalletModal, setShowAddWalletModal] = useState<boolean>(false);
  const { email } = useSelector((store: StoreType) => store.user);
  const { wallets, fetchWallets } = useGetWallets(email as string);

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <section>
      <button
        onClick={() => setShowAddWalletModal(true)}
        className={twMerge(`button-primary ml-auto block px-3 py-1 text-sm`)}
      >
        + Add New Wallet
      </button>
      <section className={twMerge('page-grid mt-5')}>
        {wallets.map((wallet, index) => (
          <WalletBox
            key={index}
            name={wallet.name}
            revenue={wallet.revenue}
            expense={wallet.expense}
          />
        ))}
      </section>
      <Modal
        title='Add Wallet'
        openModal={showAddWalletModal}
        setOpenModal={setShowAddWalletModal}
      >
        <AddWallet />
      </Modal>
    </section>
  );
}

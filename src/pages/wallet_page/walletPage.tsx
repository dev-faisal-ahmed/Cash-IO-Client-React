import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { AddWallet } from '../../components/wallet/addWallet';
import { twMerge } from 'tailwind-merge';

export function WalletPage() {
  const [showAddWalletModal, setShowAddWalletModal] = useState<boolean>(false);
  return (
    <section>
      <button
        onClick={() => setShowAddWalletModal(true)}
        className={twMerge(`button-primary ml-auto block px-3 py-1 text-sm`)}
      >
        + Add New Wallet
      </button>
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

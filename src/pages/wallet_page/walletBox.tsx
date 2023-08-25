import { useState } from 'react';
import { TbArrowsExchange, TbEdit } from 'react-icons/tb';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { WalletType } from '../../utils/types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Modal } from '../../components/modal/modal';
import { EditWallet } from './editWallet';
import { TransferWallet } from './transferWallet';
import { DeleteWallet } from './deleteWallet';

export function WalletBox({ name, revenue, expense }: WalletType) {
  const [showWalletMenu, setShowWalletMenu] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const ref = useOutsideClick(() => setShowWalletMenu(false));

  function handleShowEditModal() {
    setShowWalletMenu(false);
    setShowEditModal(true);
  }

  function handleShowTransferModal() {
    setShowWalletMenu(false);
    setShowTransferModal(true);
  }

  function handleShowDeleteModal() {
    setShowWalletMenu(false);
    setShowDeleteModal(true);
  }

  return (
    <>
      <div
        className={`relative rounded-lg p-8 shadow-md ${
          name === 'Cash' ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
      >
        <div className='between-y mb-2'>
          <h2 className='mb-2 text-2xl font-semibold'>{name}</h2>
          {showWalletMenu ? (
            <button onClick={() => setShowWalletMenu(false)}>
              <BsThreeDots size={20} />
            </button>
          ) : (
            <button onClick={() => setShowWalletMenu(true)}>
              <BsThreeDotsVertical size={20} />
            </button>
          )}
          {showWalletMenu && (
            <div
              ref={ref}
              className='absolute right-8 top-[60px] rounded-md border bg-white py-1 text-black shadow-md'
            >
              <p
                onClick={handleShowEditModal}
                className='flex cursor-pointer gap-3 px-3 py-1 hover:bg-gray-200'
              >
                <TbEdit size={20} /> Edit
              </p>
              <p
                onClick={handleShowTransferModal}
                className='flex cursor-pointer gap-3 px-3 py-1 hover:bg-gray-200'
              >
                <TbArrowsExchange size={20} /> Transfer
              </p>
              <p
                onClick={handleShowDeleteModal}
                className='flex cursor-pointer gap-3 px-3 py-1 hover:bg-gray-200'
              >
                <AiTwotoneDelete size={20} /> Delete
              </p>
            </div>
          )}
        </div>
        <p
          className={`between-y ${
            name === 'Cash' ? 'text-gray-100' : 'text-gray-500'
          }`}
        >
          <span>Earnings</span>
          <span>{revenue} &#2547;</span>
        </p>
        <p
          className={`between-y ${
            name === 'Cash' ? 'text-gray-100' : 'text-gray-500'
          }`}
        >
          <span>Expense</span>
          <span>{expense} &#2547;</span>
        </p>
      </div>
      {/* ------ modals ------ */}
      {/* Edit Wallet */}
      <Modal
        title={`Edit Wallet's Name`}
        openModal={showEditModal}
        setOpenModal={setShowEditModal}
      >
        <EditWallet setModalState={setShowEditModal} name={name} />
      </Modal>
      {/* Transfer money */}
      <Modal
        title='Transfer Money'
        openModal={showTransferModal}
        setOpenModal={setShowTransferModal}
      >
        <TransferWallet
          balance={revenue - expense}
          fromWalletName={name}
          setModalState={setShowTransferModal}
        />
      </Modal>
      <Modal
        title='Are you sure?'
        openModal={showDeleteModal}
        setOpenModal={setShowDeleteModal}
        width='450px'
      >
        <DeleteWallet
          name={name}
          balance={revenue - expense}
          setState={setShowDeleteModal}
        />
      </Modal>
    </>
  );
}

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { VscClose } from 'react-icons/vsc';

type ModalType = {
  children: ReactNode;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  width?: string;
};

export function Modal({
  children,
  openModal,
  setOpenModal,
  title,
  width,
}: ModalType) {
  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    openModal &&
    createPortal(
      <section onClick={handleCloseModal} className='modal p-3'>
        <section
          className='grid grid-rows-[auto_1fr] rounded-xl bg-white p-4'
          style={{
            width: width || '70%',
            minWidth: '300px',
            maxWidth: '550px',
            maxHeight: '700px',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <header className='center-y border-b px-1 pb-3'>
            <h1 className='flex-grow text-xl font-semibold'>{title}</h1>
            <button
              onClick={handleCloseModal}
              className='rounded-full bg-gray-400 p-1 font-semibold text-white'
            >
              <VscClose size={15} />
            </button>
          </header>
          <main className='hide-scrollbar h-full overflow-y-auto pt-4'>
            {children}
          </main>
        </section>
      </section>,
      document.getElementById('modal-root') as HTMLElement,
    )
  );
}

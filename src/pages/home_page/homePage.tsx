import { useState } from 'react';
import { Modal } from '../../components/modal';
export function HomePage() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setModal(true)}>open Modal</button>
      <Modal openModal={modal} setOpenModal={setModal} title='test'>
        hi this si home page
      </Modal>
    </div>
  );
}

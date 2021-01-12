import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { ModalProvider } from '../src/provider/ModalProvider';
import { useModal } from '../src/hooks/useModal';
import { ModalProps } from '../src/types/ModalProps';

Modal.setAppElement('#root');

function SaveModal({ name, closeModal, isClosing }: ModalProps<{ name: string }>) {
  const [value, setValue] = useState(name);

  function handleClose() {
    closeModal(value);
  }

  return (
    <Modal isOpen={true} onRequestClose={handleClose}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleClose} disabled={isClosing}>
        close
      </button>
    </Modal>
  );
}

function Sandbox() {
  const { openModal } = useModal();
  const [name, setName] = useState('');

  async function handleSave() {
    const data = await openModal('save', { name });
    if (data) {
      setName(data as string);
    }
  }

  return (
    <div>
      Name: <b>{name}</b>
      <button onClick={handleSave}>Change name</button>
    </div>
  );
}

ReactDOM.render(
  <ModalProvider
    modals={{
      save: SaveModal,
    }}
  >
    <Sandbox />
  </ModalProvider>,
  document.querySelector('#root'),
);

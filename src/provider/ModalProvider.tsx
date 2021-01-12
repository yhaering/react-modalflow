import React, { createContext, createElement, ReactNode, useCallback, useRef, useState } from 'react';

export interface ModalProviderContextData {
  openModal: (name: string, props?: object, onClose?: (data: unknown) => Promise<boolean | void>) => Promise<unknown>;
}

export const ModalProviderContext = createContext<ModalProviderContextData>({} as ModalProviderContextData);

export interface ModalProviderProps {
  children: ReactNode | ReactNode[];
  modals: Record<string, (props: any) => JSX.Element>;
}

export function ModalProvider({ children, modals }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<string>('');
  const [modalProps, setModalProps] = useState<object>();

  const modalPromise = useRef<Promise<void>>();
  const modalPromiseResolve = useRef<(value: unknown) => void>();
  const modalCloseCallback = useRef<any>();

  const closeModal = useCallback(
    async (data: unknown) => {
      if (!modalPromiseResolve.current) {
        return;
      }
      if (modalCloseCallback.current) {
        setModalProps({ ...modalProps, isClosing: true });
        const success = await modalCloseCallback.current(data);
        setModalProps({ ...modalProps, isClosing: false });
        if (success || typeof success === 'undefined') {
          setActiveModal('');
          modalPromiseResolve.current(data);
        }
      } else {
        setActiveModal('');
        modalPromiseResolve.current(data);
      }
    },
    [modalProps],
  );

  const openModal = useCallback(
    (name: string, props?: object, onClose?: (data: unknown) => Promise<boolean | void>) => {
      setModalProps({
        ...props,
        isClosing: false,
      });
      setActiveModal(name);
      modalCloseCallback.current = onClose;
      modalPromise.current = new Promise((resolve) => {
        modalPromiseResolve.current = resolve as (value: unknown) => void;
      });
      return modalPromise.current;
    },
    [],
  );

  return (
    <ModalProviderContext.Provider value={{ openModal }}>
      {activeModal && modals[activeModal] && createElement(modals[activeModal], { ...modalProps, closeModal })}
      {children}
    </ModalProviderContext.Provider>
  );
}

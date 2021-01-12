import { ModalProviderContext, ModalProviderContextData } from '../provider/ModalProvider';
import { useContext } from 'react';

export function useModal(): ModalProviderContextData {
  return useContext(ModalProviderContext);
}

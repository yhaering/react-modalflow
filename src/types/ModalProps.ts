export type ModalProps<T> = T & {
  isClosing: boolean;
  closeModal: (data: any) => void;
};

import { Overlay, ModalBox } from './Modal.styled';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ bigUrl, alt, onBackdrop }) => {
  return createPortal(
    <Overlay onClick={onBackdrop}>
      <ModalBox>
        <img src={bigUrl} alt={alt} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
};

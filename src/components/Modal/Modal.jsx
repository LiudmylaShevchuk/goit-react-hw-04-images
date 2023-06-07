import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImageURL } = image;
  return createPortal(
    <div onClick={onOverlayClose} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

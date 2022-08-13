import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.querySelector('#modal-root');

export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);
    return () => window.addEventListener('keydown', handelKeyDown);
  });

  const handelKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    props.onClick();
  };

  const onClickOverlay = e => {
    const { currentTarget, target } = e;
    if (currentTarget === target) onCloseModal();
  };

  return createPortal(
    <Overlay onClick={onClickOverlay}>
      <ModalContent>
        {props.children}
        {/* <img src="" alt="" /> */}
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handelKeyDown);
//   }

//   componentWillUnmount() {
//     window.addEventListener('keydown', this.handelKeyDown);
//   }

//   handelKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.onCloseModal();
//     }
//   };

//   onCloseModal = () => {
//     this.props.onClick();
//   };

//   onClickOverlay = e => {
//     const { currentTarget, target } = e;
//     if (currentTarget === target) this.onCloseModal();
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.onClickOverlay}>
//         <ModalContent>
//           {this.props.children}
//           {/* <img src="" alt="" /> */}
//         </ModalContent>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  /* z-index: 1200; */
`;

const ModalContent = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

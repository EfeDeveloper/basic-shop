import React from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';

const MODAL_CLOSE_ICON = (
  <span className="app-modal-close-icon" aria-label="Cerrar">
    ×
  </span>
);

interface AppModalProps extends Omit<ModalProps, 'className'> {
  className?: string;
}

const AppModal = ({ className, closeIcon = MODAL_CLOSE_ICON, maskClosable = true, ...rest }: AppModalProps) => (
  <Modal
    className={className ? `app-modal ${className}` : 'app-modal'}
    closeIcon={closeIcon}
    maskClosable={maskClosable}
    {...rest}
  />
);

export default AppModal;

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  showModal: boolean;
};

const Modal = ({ children, showModal }: Props) => {
  if (showModal)
    return (
      <main
        className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/30`}
      >
        {children}
      </main>
    );
  else return null;
};

export default Modal;

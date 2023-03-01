import { FC } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../redux/hooks";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

interface Props {
  //   title: string;
  //   description: string;
  //     status: boolean;
  id: number | string;
  handleCancel: VoidFunction;
}

const Modal: FC<Props> = ({ handleCancel, id }) => {
  const data = useAppSelector((state) => state?.todo?.data);
  const currentItem = data?.find((item) => item.id === id);

  return createPortal(
    <div className={s.overlay}>
      <div className={s.modal}>
        <h1>{currentItem?.title}</h1>
        <p>{currentItem?.description}</p>
        <button type="button" onClick={handleCancel}>
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;

import { FC } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import s from "./Modal.module.css";
import c from "../Table/Table.module.css";
import { setChangeComplited } from "../../redux/slice/slice";
import { IData } from "../../redux/slice/type";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

interface Props {
  id: number | string;
  handleCancel: VoidFunction;
}

const Modal: FC<Props> = ({ handleCancel, id }) => {
  const data = useAppSelector((state) => state?.todo?.data);
  const currentItem = data?.find((item) => item?.id === id);

  const dispatch = useAppDispatch();

  const onClickCompleted = (currentItem: IData) => {
    dispatch(setChangeComplited(currentItem));
  };

  return createPortal(
    <div className={s.overlay}>
      <div className={s.modal}>
        <h1 className={s.title}>{currentItem?.title}</h1>
        <div className={s.wrapen}>
          <p className={s.descriptionTitle}>Description:</p>
          <p className={s.description}>{currentItem?.description}</p>
          {currentItem && (
            <div
              onClick={() => onClickCompleted(currentItem)}
              className={currentItem?.status ? c.checkbox_on : c.checkbox_off}
            ></div>
          )}
          <button type="button" onClick={handleCancel} className={s.button}>
            Close
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;

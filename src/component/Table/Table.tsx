import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setChangeComplited } from "../../redux/slice/slice";
import { IData } from "../../redux/slice/type";
import Modal from "../Modal/Modal";
import s from "./Table.module.css";

const Table = () => {
  const [isModal, setIsModal] = useState(false);
  const [currentId, setCurrentId] = useState("");
  console.log(currentId);

  const data = useAppSelector((state) => state?.todo?.data);
  const dispatch = useAppDispatch();
  const handleCancel = () => setIsModal(false);

  const onClick = (id: any, e: any) => {
    setCurrentId(id);
    setIsModal(true);
  };

  const onClickCompleted = (todo: IData, e: any) => {
    e.stopPropagation();
    dispatch(setChangeComplited(todo));
  };

  return (
    <div className={s.tableBlock}>
      <table className={s.table}>
        <thead className={s.tableHeader}>
          <tr className={s.tableContainer}>
            <th className={s.tableCell}>id</th>
            <th className={s.tableCell}>title</th>
            <th className={s.tableCell}>description</th>
            <th className={s.tableCell}>status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((todo) => (
            <tr
              key={todo.id}
              onClick={(e) => onClick(todo.id, e)}
              className={s.items}
            >
              <td className={s.cell}>{todo?.id}</td>
              <td className={s.title}>{todo?.title}</td>
              <td className={s.description}>{todo?.description}</td>
              {/* <td>{todo?.status}</td> */}
              <td
                onClick={(e) => onClickCompleted(todo, e)}
                className={todo?.status ? s.checkbox_on : s.checkbox_off}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModal && <Modal handleCancel={handleCancel} id={currentId} />};
    </div>
  );
};
export default Table;

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setData } from "../../redux/slice/slice";
import s from "./Form.module.css";

// let form = document.getElementById("form") as HTMLElement;
const resetButton = () => {
  (document.getElementById("form") as HTMLFormElement).reset();
};

const Form = () => {
  const dispatch = useAppDispatch();
  const currentData = useAppSelector((state) => state?.todo?.data);
  let idData = 1;

  const onSubmit = (e: any) => {
    e.preventDefault();
    let titleValue = e.target.elements.title.value.trim();
    let descriptionValue = e.target.elements.description.value.trim();

    if (currentData.length > 0) {
      idData = currentData[currentData.length - 1].id + 1;
    }

    const addData = {
      id: idData,
      title: titleValue,
      description: descriptionValue,
      status: false,
    };
    dispatch(setData([...currentData, addData]));
    resetButton();
  };

  return (
    <div className={s.blockForm}>
      <form id="form" onSubmit={onSubmit} className={s.form}>
        <label className={s.label}>
          Title:
          <input
            type="text"
            name="title"
            required
            placeholder="Enter title"
            className={s.input}
          />
        </label>
        <label className={s.label}>
          Description:
          <input
            type="text"
            name="description"
            required
            placeholder="Enter description"
            className={s.input}
          />
        </label>
        <button type="submit" className={s.buttonCreate}>
          Create
        </button>
      </form>
    </div>
  );
};
export default Form;

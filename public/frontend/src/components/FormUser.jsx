import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

const FormUser = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ data: { title, description } }));

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="new-todo">یک کار جدید وارد کنید</label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          placeholder="عنوان کار را وارد کنید"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={description}
          placeholder="توضیحات کار را وارد کنید"
          onChange={(e) => setDescription(e.target.value)}

        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-block">
          ثبت
        </button>
      </div>
    </form>
  );
};

export default FormUser;

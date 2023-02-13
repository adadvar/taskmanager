import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Calendar from "./Calendar";
import { p2eDateTime } from "../utils";
import { addCategory, addTodo } from "../features/pageData/pageDataSlice";

const FormTodo = ({categories}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("00");
    const [description, setDescription] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [isCategoryInput, setIsCategoryInput] = useState(false);
    // const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addTodo({
                title,
                description,
                category_id: category,
                due_date: dueDate,
            })
        );

        setTitle("");
        setDescription("");
        setCategory("00");
    };

    const onChange = (e) => {
        if (e.target.value === "0") {
            setIsCategoryInput(true);
        } else {
            setCategory(e.target.value);
        }
    };

    const onAddCategory = (e) => {
        e.preventDefault();
        dispatch(addCategory({ title: newCategory }));
        setIsCategoryInput(false);
    };

    const onCalendarChange = (value) => {
        setDueDate(p2eDateTime(value));
    };


    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-row-reverse gap-x-5">
                <div className="form-group flex-1">
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

                <div className="form-group flex-1">
                    {!isCategoryInput && (
                        <select
                            name=""
                            id=""
                            onChange={onChange}
                            value={category}
                        >
                            <option value="00" disabled>دسته‌بندی را واردکنید</option>
                            <option value="0">افزودن دسته‌بندی</option>
                            {categories &&
                                categories.length > 0 &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))}
                        </select>
                    )}
                    {isCategoryInput && (
                        <div className="flex relative">
                            <input
                                type="text"
                                className="pl-5"
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button className="absolute left-1 top-2 p-1 text-red-600 text-xl hover:bg-gray-100 hover:rounded-xl">
                                <AiOutlineClose
                                    onClick={() => setIsCategoryInput(false)}
                                    // disabled={isLoading}
                                />
                            </button>
                            <button className="absolute left-8 top-2 p-1 text-blue-600 text-xl hover:bg-gray-100 hover:rounded-xl">
                                <AiOutlinePlus
                                    onClick={onAddCategory}
                                    // disabled={isLoading}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-row-reverse gap-x-5">
                <div className="form-group w-1/2">
                    <Calendar onCalendarChange={onCalendarChange} />
                </div>
            </div>
            <div className="form-group">
                <textarea
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
                <button
                    type="submit"
                    className="btn btn-block"
                    // disabled={isLoading}
                >
                    ثبت
                </button>
            </div>
        </form>
    );
};

export default FormTodo;

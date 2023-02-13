import React, { useState, useEffect } from "react";
import { BsTrashFill, BsXLg, BsCheck2Square } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { e2pDateTime, p2eDateTime, sq2jsDateTime } from "../utils";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Calendar from "../components/Calendar";
import { toast } from "react-toastify";
import {
    addCategory,
    deleteTodo,
    getUpdateTodoPageData,
    reset as resetPageData,
    updateTodo,
} from "../features/pageData/pageDataSlice";
import {
    reset as resetAuth
} from "../features/auth/authSlice";

const UpdateTodo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("00");
    const [completed, setCompleted] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [isCategoryInput, setIsCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const { auth } = useSelector((state) => state.auth);

    const {
        pageData: { todos },
        pageData: { categories },
        isLoading,
        isUpdateLoading,
        isUpdateSuccess,
        isError,
        message,
    } = useSelector((state) => state.pageData);
    const todo = todos ? todos[0] : null;

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }

        dispatch(getUpdateTodoPageData({ id }));

        return () => {
            dispatch(resetPageData());
            dispatch(resetAuth());
        };
    }, [id, auth, dispatch, navigate]);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setCategory(todo.category_id);
            setCompleted(todo.isCompleted ? true : false);
            setDueDate(sq2jsDateTime(todo.due_date));
        }
    }, [todo]);

    useEffect(() => {
        if (isUpdateSuccess) toast.success("باموفقیت بروزرسانی شد");
        if (isError) toast.error(message);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdateSuccess, isError]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateTodo({
                data: {
                    title: title,
                    description: description,
                    category_id: category,
                    isCompleted: completed,
                    due_date: dueDate,
                },
                id,
            })
        );
    };

    const onChange = (e) => {
        if (e.target.value === "0") {
            setIsCategoryInput(true);
        } else {
            setCategory(e.target.value);
        }
    };

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(todo.id));
        navigate("/");
    };

    const onAddCategory = (e) => {
        e.preventDefault();
        dispatch(addCategory({ title: newCategory }));
        setIsCategoryInput(false);
        // setCategory(categories.data[categories.data.length].id);
    };

    const onCalendarChange = (value) => {
        setDueDate(p2eDateTime(value));
    };

    let content;

    if (isUpdateLoading || isLoading) {
        content = <Spinner />;
    }

    if (todo) {
        const d2 = sq2jsDateTime(todo.due_date);
        const d1 = new Date();
        const isRemainDate = d2 > d1;
        const due_datePersian = e2pDateTime(todo.due_date);

        content = (
            <form onSubmit={onSubmit}>
                <div className="flex justify-start items-center gap-x-5">
                    <div className="form-group">
                        <button
                            className="trash text-red-700 text-4xl"
                            onClick={handleDeleteTodo}
                            disabled={isUpdateLoading}
                        >
                            <BsTrashFill />
                        </button>
                    </div>
                    <div
                        className={`form-group border p-2 rounded ${
                            completed ? "text-green-700" : "text-red-700"
                        }`}
                    >
                        <button
                            type="submit"
                            className=""
                            id={todo.id}
                            disabled={isUpdateLoading}
                            onClick={() => setCompleted(!completed)}
                        >
                            {completed ? (
                                <span className="flex gap-1">
                                    <BsCheck2Square />
                                    انجام شده
                                </span>
                            ) : (
                                <span className="flex gap-1">
                                    <BsXLg />
                                    انجام نشده
                                </span>
                            )}
                        </button>
                    </div>
                </div>

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
                                defaultValue={todo.category_id}
                            >
                                <option value="00" disabled hidden>
                                    دسته‌بندی را واردکنید
                                </option>
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
                                    onChange={(e) =>
                                        setNewCategory(e.target.value)
                                    }
                                />
                                <button className="absolute left-1 top-2 p-1 text-red-600 text-xl hover:bg-gray-100 hover:rounded-xl">
                                    <AiOutlineClose
                                        onClick={() =>
                                            setIsCategoryInput(false)
                                        }
                                        disabled={isUpdateLoading}
                                    />
                                </button>
                                <button className="absolute left-8 top-2 p-1 text-blue-600 text-xl hover:bg-gray-100 hover:rounded-xl">
                                    <AiOutlinePlus
                                        onClick={onAddCategory}
                                        disabled={isUpdateLoading}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row-reverse gap-x-5">
                    <div className="form-group w-1/2">
                        <Calendar
                            onCalendarChange={onCalendarChange}
                            defaultValue={due_datePersian}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control h-60"
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
                        disabled={isUpdateLoading}
                    >
                        بروزرسانی
                    </button>
                </div>
            </form>
        );
    }

    return <div>{content} </div>;
};

export default UpdateTodo;

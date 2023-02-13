import React, { useState } from "react";
import {
    BsTrashFill,
    BsThreeDots,
    BsPencilSquare,
    BsCheck2Square,
} from "react-icons/bs";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { e2pDateTime, sq2jsDateTime } from "../utils";
import { deleteTodo } from "../features/pageData/pageDataSlice";

const Todo = ({ todo, onUpdate, selecedTodo, isUpdateLoading }) => {
    const dispatch = useDispatch();
    const isItem = isUpdateLoading && selecedTodo && selecedTodo === todo.id;
    const [isEdit, setIsEdit] = useState(false);

    const d2 = sq2jsDateTime(todo.due_date);
    const d1 = new Date();
    const isRemainDate = d2 > d1;
    const due_datePersian = e2pDateTime(todo.due_date);

    const handleEditTodo = () => {
        setIsEdit(false);
        // onUpdate({ ...todo, title: title, description: description });
    };

    const handleNonEditTodo = () => {
        setIsEdit(true);
    };

    return (
        <article key={todo.id}>
            <div className="todo text-2xl flex flex-row-reverse gap-10 relative border px-5 my-5">
                <span className="absolute bottom-1 left-1 text-xs text-purple-900 bg-purple-300 p-1 rounded-lg textbo">
                    {todo.category.title}
                </span>

                {isRemainDate ? (
                    <span className="absolute top-1 left-1 text-left text-xs text-green-900 bg-green-300 p-1 rounded-lg textbo">
                        {due_datePersian}
                    </span>
                ) : (
                    <span className="absolute top-1 left-1 text-left text-xs text-red-900 bg-red-300 p-1 rounded-lg textbo">
                        زمان گذشته است
                    </span>
                )}

                {isEdit ? (
                    <BsCheck2Square
                        className="absolute top-1 right-1 cursor-pointer w-7 h-7 text-4xl"
                        onClick={handleEditTodo}
                    />
                ) : (
                    <Link to={`todo/update/${todo.id}`}>
                        <BsPencilSquare
                            className="absolute top-1 right-1 cursor-pointer w-7 h-7 text-4xl"
                            onClick={handleNonEditTodo}
                        />
                    </Link>
                )}

                {isItem ? (
                    <BsThreeDots className="my-auto w-7 text-4xl" />
                ) : (
                    <div className="form-control flex items-center">
                        <input
                            type="checkbox"
                            className="w-7 h-7"
                            checked={todo.isCompleted}
                            id={todo.id}
                            onChange={() =>
                                onUpdate({
                                    ...todo,
                                    isCompleted: !todo.isCompleted,
                                })
                            }
                        />
                    </div>
                )}
                <div className="flex-1 text-right">
                    <span className="text-xs text-gray-300">عنوان کار</span>
                    <h1 htmlFor={todo.id} className="text-lg">
                        {todo.title}
                    </h1>
                    <span className="text-xs text-gray-300">توضیحات کار</span>
                    <h3 className="text-lg">{'...'+ todo.description.slice(0,30)}</h3>
                </div>

                <button
                    className="trash text-red-700 text-4xl"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    // disabled={isLoading}
                >
                    <BsTrashFill />
                </button>
            </div>
        </article>
    );
};

export default Todo;

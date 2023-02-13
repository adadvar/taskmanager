import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { me } from "../features/auth/authSlice";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import FormTodo from "../components/FormTodo";
import {
    getDashboardData,
    reset,
    updateTodo,
} from "../features/pageData/pageDataSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth } = useSelector((state) => state.auth);

    const [selecedTodo, setSelectedTodo] = useState(null);

    const { pageData, isLoading, isUpdateLoading, isError, message } =
        useSelector((state) => state.pageData);

    useEffect(() => {
        if (!auth) {
            navigate("/login");
            return;
        }

        dispatch(me());
        dispatch(getDashboardData());

        return () => {
            dispatch(reset());
        };
    }, [auth, navigate, dispatch]);

    useEffect(() => {
        if (isError) toast.error(message);
    }, [isError, message]);

    const onUpdate = ({ id, ...todo }) => {
        dispatch(updateTodo({ id, data: todo }));
        setSelectedTodo(id);
    };

    let content;

    if (isLoading) {
        content = <Spinner />;
    }

    if (pageData && pageData.todos && pageData.todos.length > 0) {
        content = pageData.todos.map((todo) => (
            <Todo
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                selecedTodo={selecedTodo}
                isUpdateLoading={isUpdateLoading}
            />
        ));
    }

    return (
        <main>
            <h1>لیست کارها</h1>
            <FormTodo categories={pageData.categories} />
            {content}
        </main>
    );
};

export default Dashboard;

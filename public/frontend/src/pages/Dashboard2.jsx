import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTodos } from "../features/todos/todoSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

function Dashboard2() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const [pageData, setPageData] = useState({})
    const token = JSON.parse(localStorage.getItem('auth'))[0].access_token;
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }
    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = async() => {
        const res = await axios.get('/dashboard', config)
        setPageData(res.data);
        setIsLoading(false)
        console.log(res.data)
    }

    if (isLoading) return <Spinner />;

}

export default Dashboard2;

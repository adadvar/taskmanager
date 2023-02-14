import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginWithGoogle, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function GoogleCallback() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const location = useLocation();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || auth) {
            navigate("/");
        }

        dispatch(reset());
    }, [auth, isError, isSuccess, message, navigate, dispatch]);

    useEffect(() => {
        dispatch(loginWithGoogle(location.search));
    }, [dispatch, location.search]);

    if (isLoading) return <Spinner />;


    return ;
}


export default GoogleCallback;
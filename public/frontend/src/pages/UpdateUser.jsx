/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    reset,
    changeEmail,
    changeEmailSubmit,
    changePassword,
} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const UpdateUser = () => {
    const { auth, me, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isChangeEmail, setIsChangeEmail] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }

        setEmail(me.email);

        return () => {
            dispatch(reset());
        };
    }, [auth, navigate, dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            isChangeEmail ? setIsChangeEmail(false) : setIsChangeEmail(true);
            setEmail(me.email);
        }
        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    const handleChangeEmail = () => {
        dispatch(changeEmail({ email: email }));
        if (!isError) {
            setIsChangeEmail(false);
            setEmail("");
        }
    };

    const handleChangeEmailSubmit = () => {
        dispatch(changeEmailSubmit({ code: code }));
        if (!isError) {
            setIsChangeEmail(true);
            setCode("");
        }
    };

    const handleChangePassword = () => {
        dispatch(
            changePassword({
                old_password: oldPassword,
                new_password: newPassword,
            })
        );
        if (!isError) {
            setOldPassword("");
            setNewPassword("");
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    const content = (
        <>
            <section className="form">
                <form>
                    <div className="form-group">
                        {isChangeEmail ? (
                            <>
                                <label className="text-sm mt-2">ایمیل</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="لطفا ایمیل خود را وارد کنید"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <label className="text-sm mt-2">کد تایید</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    name="code"
                                    value={code}
                                    placeholder="لطفا کد تایید ایمیل شده خود را وارد کنید"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </>
                        )}
                        <div className="form-group">
                            <button
                                className="btn btn-block"
                                onClick={
                                    isChangeEmail
                                        ? handleChangeEmail
                                        : handleChangeEmailSubmit
                                }
                            >
                                {isChangeEmail
                                    ? "تغییر ایمیل"
                                    : "ورود کد تایید"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="text-sm mt-2">رمز قبلی</label>
                        <input
                            type="password"
                            className="form-control"
                            id="oldPassword"
                            name="oldPassword"
                            value={oldPassword}
                            placeholder="رمز قبلی خود را وارد کنید"
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-sm mt-2">رمز جدید</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            placeholder="رمز جدید خود را وارد کنید"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-block"
                                onClick={handleChangePassword}
                            >
                                تغییر رمز
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );

    return content;
};

export default UpdateUser;

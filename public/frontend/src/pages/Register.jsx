import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    login,
    register,
    registerVerify,
    reset,
} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth, isLoading, isError, isSuccess, isRegisterSuccess, message } =
        useSelector((state) => state.auth);

    useEffect(() => {
        if (auth) {
            navigate("/");
        }

        return () => {
            dispatch(reset());
        };
    }, [auth, navigate, dispatch]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('باموفقیت وارد شدید');
        }
        if (isError) {
            toast.success(message);
        }
    }, [isSuccess, isError, message]);

    const handleRegister = () => {
        setIsRegister(false);
        dispatch(
            register({
                [username.includes("@") ? "email" : "mobile"]: username,
            })
        );
    };
    const handleRegisterVerify = () => {
        dispatch(
            registerVerify({
                [username.includes("@") ? "email" : "mobile"]: username,
                code: code,
            })
        );
    };

    // if (isSuccess && isRegisterSuccess)
    //     dispatch(login({ username: username, password: username }));

    if (isLoading) {
        return <Spinner />;
    }

    const content = (
        <>
            <section className="form">
                <form>
                    {isRegister ? (
                        <div className="form-group">
                            <input
                                type="username"
                                className="form-control"
                                id="username"
                                name="username"
                                value={username}
                                placeholder="ایمیل یا موبایل خود را وارد کنید"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                id="code"
                                name="code"
                                value={code}
                                placeholder="کد تایید خود را وارد کنید"
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            onClick={
                                isRegisterSuccess
                                    ? handleRegisterVerify
                                    : handleRegister
                            }
                        >
                            {isRegisterSuccess ? "تایید" : "ادامه"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );

    return content;
};

export default Register;

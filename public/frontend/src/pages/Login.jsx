import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
    const [loginUrl, setLoginUrl] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

/*     useEffect(() => {
        fetch('/auth/google', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('خطایی رخ داده است!');
            })
            .then((data) => setLoginUrl( data.url ))
            .catch((error) => console.error(error));
    }, []); */

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || auth) {
            navigate("/");
        }

        dispatch(reset());
    }, [auth, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    const content = (
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={username}
                            placeholder="نام کاربری یا ایمیل خود را واردکنید"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="رمز خود را وارد کنید"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            ورود
                        </button>
                    </div>
                </form>
                {/* <div className="form-group">
                    <a
                        className="btn btn-block"
                        href={loginUrl}
                    >
                        ورود با گوگل
                    </a>
                </div> */}
            </section>
        </>
    );

    return content;
};

export default Login;

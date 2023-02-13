import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth,me } = useSelector((state) => state.auth);
    const isLoginPage = window.location.pathname === '/login'
    let wellcomeText =
        auth && me
            ? "عزیز خوش آمدید " + me.email.split("@")[0]
            : "کاربر عزیز خوش آمدید";

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <header className="header">
            {auth && (
                <div className="logo flex items-center">
                    <Link to="/">مدیریت کارها</Link>

                    <Link
                        to="/update-user"
                        className="border p-1 ml-10 rounded"
                    >
                        {wellcomeText}
                    </Link>
                </div>
            )}
            <ul>
                {auth ? (
                    <li>
                        <button className="btn" onClick={onLogout}>
                            <FaSignOutAlt /> خروج
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className={`${isLoginPage ?'border-b-4 border-b-red-600':''}`}>
                                <FaSignInAlt /> ورود
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className={`${!isLoginPage ?'border-b-4 border-b-red-600':''}`}>
                                <FaUser /> ثبت نام
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;

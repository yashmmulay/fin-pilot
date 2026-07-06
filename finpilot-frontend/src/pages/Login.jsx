import {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import AuthContext from "../context/AuthContext";
import { login as loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const emailRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        emailRef.current?.focus();

    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        if (!email.trim()) {

            toast.error("Email is required.");

            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error("Please enter a valid email address.");

            return;

        }

        if (!password.trim()) {

            toast.error("Password is required.");

            return;

        }

        setLoading(true);

        try {

            const response = await loginUser({
                email,
                password,
            });

            login(response);

            toast.success("Welcome back!");

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {

            let message = "Invalid email or password.";

            if (error.response?.data?.message) {

                message = error.response.data.message;

            } else if (error.message) {

                message = error.message;

            }

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                {/* Header */}

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-blue-600">
                        FinPilot
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Welcome back to FinPilot
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        disabled={loading}
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                    />

                    <div className="relative">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            disabled={loading}
                            className="w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                        />

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {showPassword
                                ? <FaEyeSlash />
                                : <FaEye />}

                        </button>

                    </div>

                    <div className="text-right">

                        <button
                            type="button"
                            onClick={() =>
                                toast("Forgot Password feature coming soon!")
                            }
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                </form>

                {/* Footer */}

                <p className="mt-6 text-center text-gray-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;
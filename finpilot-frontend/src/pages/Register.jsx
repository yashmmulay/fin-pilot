import {
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

import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const fullNameRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fullNameRef.current?.focus();

    }, []);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    const password = formData.password;

    const passwordChecks = {

        length:
            password.length >= 8,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /\d/.test(password),

        special:
            /[!@#$%^&*(),.?":{}|<>]/.test(password),

    };

    const strength = Object.values(
        passwordChecks
    ).filter(Boolean).length;

    const isPasswordValid =
        Object.values(passwordChecks).every(Boolean);

    function getStrengthText() {

        if (strength <= 2) {
            return "Weak";
        }

        if (strength === 3 || strength === 4) {
            return "Medium";
        }

        return "Strong";

    }

    function getStrengthColor() {

        if (strength <= 2) {
            return "bg-red-500";
        }

        if (strength === 3 || strength === 4) {
            return "bg-yellow-500";
        }

        return "bg-green-500";

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!formData.fullName.trim()) {

            toast.error("Full name is required.");

            return;

        }

        if (!formData.email.trim()) {

            toast.error("Email is required.");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            toast.error(
                "Please enter a valid email address."
            );

            return;

        }

        if (!isPasswordValid) {

            toast.error(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            );

            return;

        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            toast.error(
                "Passwords do not match."
            );

            return;

        }

        setLoading(true);

        try {

            await register({

                fullName:
                    formData.fullName,

                email:
                    formData.email,

                password:
                    formData.password,

            });

            toast.success(
                "Account created successfully!"
            );

            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true,
                    }
                );

            }, 1500);

        } catch (error) {

            let message =
                "Registration failed.";

            if (
                error.response?.data?.message
            ) {

                message =
                    error.response.data.message;

            } else if (error.message) {

                message =
                    error.message;

            }

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-blue-600">
                        FinPilot
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create your FinPilot account
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        ref={fullNameRef}
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
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
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
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

                    {/* Password Strength */}

                    {password.length > 0 && (

                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <span className="text-sm text-gray-600">
                                    Password Strength
                                </span>

                                <span
                                    className={`text-sm font-semibold ${
                                        strength <= 2
                                            ? "text-red-600"
                                            : strength <= 4
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    {getStrengthText()}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                <div
                                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                    style={{
                                        width: `${(strength / 5) * 100}%`,
                                    }}
                                />

                            </div>

                            <div className="mt-4 space-y-1 text-sm">

                                <p className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>
                                    {passwordChecks.length ? "✓" : "•"} At least 8 characters
                                </p>

                                <p className={passwordChecks.uppercase ? "text-green-600" : "text-gray-500"}>
                                    {passwordChecks.uppercase ? "✓" : "•"} One uppercase letter
                                </p>

                                <p className={passwordChecks.lowercase ? "text-green-600" : "text-gray-500"}>
                                    {passwordChecks.lowercase ? "✓" : "•"} One lowercase letter
                                </p>

                                <p className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>
                                    {passwordChecks.number ? "✓" : "•"} One number
                                </p>

                                <p className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>
                                    {passwordChecks.special ? "✓" : "•"} One special character
                                </p>

                            </div>

                        </div>

                    )}

                    <div className="relative">

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                        />

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {showConfirmPassword
                                ? <FaEyeSlash />
                                : <FaEye />}

                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !formData.fullName.trim() ||
                            !formData.email.trim() ||
                            !isPasswordValid ||
                            formData.password !== formData.confirmPassword
                        }
                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"}

                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;
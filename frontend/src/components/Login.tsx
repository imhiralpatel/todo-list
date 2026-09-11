import '../style/addtask.css'
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        token: string;
    };
}

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response =
                await api.post<LoginResponse>(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );

            const { token, user } =
                response.data.data;

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            navigate("/");
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Login..." : "Login"}
                </button>
            </form>
        </div>
    )
}
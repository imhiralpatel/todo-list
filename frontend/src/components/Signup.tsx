import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: string;
    };
    token: string;
  };
}

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // Frontend validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<SignupResponse>(
        "/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      const { token, user } = response.data.data;

      // Save token
      localStorage.setItem("token", token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Go to dashboard
      navigate("/");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>

      <br />

      <button
        type="button"
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default Signup;

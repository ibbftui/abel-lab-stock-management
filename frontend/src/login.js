import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

      e.preventDefault();

      setError("");

      if (!username.trim()) {

          setError("Username wajib diisi.");

          return;

      }

      if (!password.trim()) {

          setError("Password wajib diisi.");

          return;

      }

      try {

          const response = await axios.post(
              `${API_BASE_URL}/login`,
              {
                  username,
                  password,
              }
          );

          localStorage.setItem(
              "user",
              JSON.stringify(response.data.user)
          );

          navigate("/dashboard");

      } catch (error) {

    if (error.response?.status === 404) {

        setError("Akun belum terdaftar.");

    } else if (error.response?.status === 401) {

        setError("Password yang Anda masukkan salah.");

    } else if (error.response?.status === 422) {

        setError("Username dan password wajib diisi.");

    } else {

        setError("Terjadi kesalahan pada sistem. Silakan coba lagi.");

    }

}

  };

  return (
    <div className="min-h-screen bg-[#0B3A6E] flex items-center justify-center p-10">

      <div className="w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2">

        {/* ================= LEFT ================= */}

        <div className="bg-[#0D315F] flex flex-col justify-center items-center text-center p-16">

          <img
            src="/IBB-Logo.png"
            alt="Logo"
            className="w-85 bg-white p-5 rounded"
          />

          <h1 className="text-white text-3xl font-bold mt-10">
            ADVANCED BIOINDUSTRIAL ENGINEERING LABORATORY
          </h1>

          <p className="text-gray-300 text-2xl mt-6 leading-relaxed max-w-xl">
            Access the centralized inventory and management portal
            for IBB-FTUI.
          </p>

          <p className="mt-24 tracking-[4px] text-gray-400 uppercase">
            Faculty of Engineering • Universitas Indonesia
          </p>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="bg-white flex justify-center items-center">

          <div className="w-[70%]">

            <h1 className="text-5xl font-bold text-[#0D315F]">
              Welcome 
            </h1>

            <p className="text-gray-500 mt-3 text-xl">
              Please enter your credentials to access the system.
            </p>

            <form onSubmit={handleSubmit} className="mt-12">

              {/* Username */}

              <label className="text-gray-600 font-medium">
                Username
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-5 h-16 bg-gray-50">

                <FiUser className="text-2xl text-gray-400" />

                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="ml-4 w-full bg-transparent outline-none text-lg"
                />

              </div>

              {/* Password */}

              <div className="flex justify-between mt-8">

                <label className="text-gray-600 font-medium">
                  Password
                </label>

                <a
                  href="#"
                  className="text-[#0D315F] font-semibold hover:underline"
                >
                </a>

              </div>

                <div className="mt-2 flex items-center border rounded-xl px-5 h-16 bg-gray-50">

                  <FiLock className="text-2xl text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ml-4 w-full bg-transparent outline-none text-lg"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              {/* Remember */}

              <label className="flex items-center mt-8 text-gray-600">

                <input
                  type="checkbox"
                  className="w-5 h-5 mr-4"
                />

                Remember me on this device

              </label>

              {error && (

                  <p className="text-red-600 mt-6 text-center font-medium">

                      {error}

                  </p>

                  )}  
              {/* Button */}

              <button
                type="submit"
                className="mt-10 w-full h-16 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-2xl font-bold flex items-center justify-center gap-3 transition"
              >
                Sign In
                <FiArrowRight />
              </button>

            </form>

            <hr className="my-10" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
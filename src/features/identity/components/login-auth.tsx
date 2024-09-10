import React, { useState } from "react";
import Logo from "@assets/images/logo.webp";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // send post request and give accessToken , refreshToken
  const login = async (data: any) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        console.log("hello mohammad");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  // check accessToken
  const checkAccessToken = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
    try {
      const response = await fetch(
        "http://localhost:3000/validate-access-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;
    try {
      const response = await fetch("http://localhost:3000/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", result.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const submitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isTokenValid = await checkAccessToken();

    if (!isTokenValid) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        alert("Session expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }
    }

    await login({ mobile, password });
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="text-center mt-4">
        <img src={Logo} alt="Logo" />
        <h1 className="h2">فروشگاه ساز آنلاین</h1>
        <p>جهت ورود باید از طریق موبایل و رمز عبور استفاده کنید</p>
        <Link to="/register">ثبت نام کنید</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={submitRequest}>
            <div>
              <label className="form-label">شماره موبایل</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                minLength={11}
                maxLength={11}
                className="form-control"
              />
            </div>
            <div>
              <label className="form-label">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-lg btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال ورود" : "ورود"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;

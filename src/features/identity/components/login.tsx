import React from "react";
import Logo from "@assets/images/logo.webp";
import { Link, redirect, useSubmit, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpservice } from "../../../core/http-service";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const onSubmit = (data: any) => {
    submitForm(data, { method: "post" });
  };
  return (
    <>
      {/* top section  */}

      <div className="text-center mt-4">
        <img src={Logo} alt="Logo" />
        <h1 className="h2">فروشگاه ساز آنلاین</h1>
        <p>جهت ورود باید از طریق موبایل و رمز عبور استفاده کنید</p>
        <Link to="/register">ثبت نام کنید</Link>
      </div>

      {/* main section  */}
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">موبایل</label>
                <input
                  {...register("mobile", {
                    required: "موبایل الزامی است",
                    minLength: 11,
                    maxLength: 11,
                  })}
                  type="text"
                  className={`form-control ${errors.mobile && "is-invalid"}`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small mt-1 fw-bolder">
                    {errors.mobile?.message &&
                      typeof errors.mobile.message === "string" && (
                        <span>{errors.mobile.message}</span>
                      )}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  {...register("password", {
                    required: "رمز الزامی است",
                  })}
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                />
                {errors.password && errors.password.type == "required" && (
                  <p className="text-danger mt-1 small fw-bolder">
                    {errors.password?.message &&
                      typeof errors.password.message === "string" && (
                        <span>{errors.password.message}</span>
                      )}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? "در حال ورود" : "ورود"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpservice.post("Users/login", data);

  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect("/");
  }
}

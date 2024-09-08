import Logo from "@assets/images/logo.webp";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { httpservice } from "../../../core/http-service";
import { useEffect } from "react";

// typescript => define interface for form Register
interface RegisterFormData {
  mobile: string;
  password: string;
  confirmpassword: string;
}

// typescript => define enum for form state
enum FormState {
  Idle = "idle",
}

// function register
const Register: React.FC = () => {
  const {
    register,
    handleSubmit, // manage form submit
    watch, // watch change input form
    formState: { errors },
  } = useForm<RegisterFormData>();

  const submitForm = useSubmit(); // use useSubmit hook for send data

  const onSubmit = (data: RegisterFormData) => {
    const { confirmpassword, ...userData } = data; // remove confirm pass in object
    submitForm(userData, { method: "post" }); // send data to server
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== FormState.Idle; // state form  states (idle,submitting,loading)
  const isSuccessOperation = useActionData(); // check submit successfully
  const navigate = useNavigate(); //  for redirect to other page
  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);
  return (
    <>
      <div className="text-center mt-4">
        <img src={Logo} alt="Logo" />
        <h1 className="h2">فروشگاه ساز آنلاین</h1>
        <p>جهت ورود باید از طریق موبایل و رمز عبور استفاده کنید</p>
        <p className="lead">ثبت نام نکردید ؟</p>
        <Link to="/login">وارد شوید</Link>
      </div>

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
                    minLength: {
                      value: 8,
                      message: "",
                    },
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
              <div className="mb-3">
                <label className="form-label">تکرار رمز عبور</label>
                <input
                  {...register("confirmpassword", {
                    required: "تکرار رمز عبور الزامی است",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "عدم تطابق با رمز عبور";
                      }
                    },
                  })}
                  type="password"
                  className={`form-control ${
                    errors.confirmpassword && "is-invalid"
                  }`}
                />
                {errors.confirmpassword &&
                  errors.confirmpassword.type == "required" && (
                    <p className="text-danger mt-1 small fw-bolder">
                      {errors.confirmpassword?.message &&
                        typeof errors.confirmpassword.message === "string" && (
                          <span>{errors.confirmpassword.message}</span>
                        )}
                    </p>
                  )}
                {errors.confirmpassword &&
                  errors.confirmpassword.type === "validate" && (
                    <p className="text-danger mt-1 small fw-bolder">
                      {errors.confirmpassword?.message &&
                        typeof errors.confirmpassword.message === "string" && (
                          <span>{errors.confirmpassword.message}</span>
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
                  {isSubmitting ? "در حال انجام عملیات" : "ثبت نام کنید"}
                </button>
              </div>
              {Boolean(isSuccessOperation) && (
                <div className="alert alert-success text-success p-2 mt-3">
                  عملیات با موفقیت انجام شد در حال انتقال به صفحه ورود
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

export async function registerAction({
  request,
}: {
  request: Request;
}): Promise<boolean> {
  const formData = await request.formData();
  const data: Record<string, any> = Object.fromEntries(formData); // convert form data to object
  const response: Response = await httpservice.post("/Users", data); // send data to server
  console.log(response.status);
  return response.status === 200;
}

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoCheckbox } from "react-icons/io5";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  hasWebsite: boolean;
  websiteUrl: string;
}

function validateIranianNationalCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) {
    return false;
  }
  const check = parseInt(code[9]);
  const sum = Array.from(code.substring(0, 9)).reduce(
    (acc, digit, index) => acc + parseInt(digit) * (10 - index),
    0
  );
  const remainder = sum % 11;
  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
}

const Registration: React.FC = () => {
  const [isValidNationalId, setIsValidNationalId] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [agree, setAgree] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const nationalId = watch("nationalId");

  useEffect(() => {
    if (nationalId) {
      const isValid = validateIranianNationalCode(nationalId);
      setIsValidNationalId(isValid);
    }
  }, [nationalId]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleAgreeChange = () => setAgree(!agree);

  return (
    <div className="container mx-auto">
      <form
        className="max-w-md mx-auto bg-white p-6 pt-4 pb-7 rounded-lg shadow-lg rtl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center mb-5 font-bold">
          فرم درخواست طراحی سایت شاپفا
        </h2>

        {/* first-name input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            نام :
          </label>
          <input
            type="text"
            {...register("firstName", { required: "اسم خود را وارد کنید" })}
            className={`border p-2 w-full rounded-md ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message as string}
            </p>
          )}
        </div>

        {/* last-name input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            نام خانوادگی :
          </label>
          <input
            type="text"
            {...register("lastName", {
              required: "نام خانوادگی خود را وارد کنید",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message as string}
            </p>
          )}
        </div>

        {/* national-id input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            کد ملی :
          </label>
          <input
            type="number"
            {...register("nationalId", {
              required: "کد ملی اجباری است",
              validate: (value) =>
                validateIranianNationalCode(value) || "کد ملی معتبر نیست",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.nationalId ? "border-red-500" : "border-gray-300"
            }`}
          />
          {isValidNationalId && (
            <IoCheckbox
              className="absolute right-90 top-12 transform -translate-y-1/2 text-green-500"
              size={24}
            />
          )}
          {errors.nationalId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nationalId.message as string}
            </p>
          )}
        </div>

        {/* phone number input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            شماره تلفن :
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                international
                placeholder="Enter phone number"
                value={field.value}
                onChange={field.onChange}
                defaultCountry="IR"
                className={`border p-2 w-full rounded-md ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            rules={{ required: "شماره تلفن اجباری است" }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message as string}
            </p>
          )}
        </div>

        {/* email input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            ایمیل :
          </label>
          <input
            type="email"
            {...register("email", {
              required: "ایمیل اجباری است",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "آدرس ایمیل معتبر نیست",
              },
            })}
            className={`border p-2 w-full rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Toggle: آیا از قبل وب‌سایت دارید؟ */}
        <div className="mb-4 flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={hasWebsite}
              onChange={() => setHasWebsite(!hasWebsite)} // تغییر وضعیت تاگل
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-400 ms-3">
              آیا از قبل وب‌سایت دارید؟
            </span>
          </label>
        </div>

        {hasWebsite && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              آدرس وب‌سایت :
            </label>
            <input
              type="text"
              {...register("websiteUrl")}
              className="border p-2 w-full rounded-md border-gray-300"
            />
          </div>
        )}

        {/* Radio button: قوانین را مطالعه کردم */}
        <div className="mb-4 flex items-center">
          <input
            id="link-radio"
            type="radio"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={agree}
            onChange={handleAgreeChange}
          />
          <label
            htmlFor="link-radio"
            className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            قوانین را مطالعه کردم
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline ms-1"
            >
              (لینک)
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
};

export default Registration;

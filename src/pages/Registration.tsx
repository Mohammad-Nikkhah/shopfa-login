import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoCheckbox } from "react-icons/io5";
import L from "leaflet";
import MapComponent from "../features/identity/components/MapComponent";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  location: L.LatLng | null;
  howDidYouHear: string;
  gender: string;
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
  const [center, setCenter] = useState<L.LatLngExpression>([37.2875, 49.5963]); // default map address

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      location: null,
    },
  });

  const nationalId = watch("nationalId");

  useEffect(() => {
    if (nationalId) {
      const isValid = validateIranianNationalCode(nationalId);
      setIsValidNationalId(isValid);
    }
  }, [nationalId]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const handleLocationChange = (latlng: L.LatLng) => {
    setValue("location", latlng);
  };

  return (
    <div className="container mx-auto">
      <form
        className="max-w-md mx-auto p-2 pt-4 pb-7 rounded-lg shadow-lg rtl"
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
                maxLength="16"
                type="tel"
                defaultCountry="IR"
                className={`border p-2 w-full rounded-md ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            rules={{
              required: "شماره تلفن اجباری است",
            }}
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
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "ایمیل معتبر نیست",
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

        {/* طریقه آشنایی با شاپفا */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            طریقه آشنایی با شاپفا :
          </label>
          <select
            {...register("howDidYouHear", {
              required: "لطفاً یکی از گزینه‌ها را انتخاب کنید",
            })}
            className={`border p-2 w-full rounded-md ${
              errors.howDidYouHear ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">انتخاب کنید</option>
            <option value="friends">دوستان</option>
            <option value="internetSearch">جستجوی اینترنتی</option>
            <option value="socialMedia">شبکه‌های اجتماعی</option>
            <option value="other">سایر</option>
          </select>
          {errors.howDidYouHear && (
            <p className="text-red-500 text-sm mt-1">
              {errors.howDidYouHear.message as string}
            </p>
          )}
        </div>

        {/* جنسیت */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            جنسیت :
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                {...register("gender", {
                  required: "لطفاً جنسیت خود را انتخاب کنید",
                })}
                className="mr-2"
              />
              مرد
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                {...register("gender", {
                  required: "لطفاً جنسیت خود را انتخاب کنید",
                })}
                className="mr-2"
              />
              زن
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gender.message as string}
            </p>
          )}
        </div>

        {/* نقشه */}
        <div className="mb-4 h-40">
          <MapComponent
            onLocationChange={handleLocationChange}
            center={center}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ارسال درخواست
        </button>
      </form>
    </div>
  );
};

export default Registration;

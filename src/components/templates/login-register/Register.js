'use client'
import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { validateEmail, validatePassword, validatePhone } from "@/utils/validation";
const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});
  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signup = async () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "وارد کردن نام الزامی است";
    } else if (name.trim().length < 2) {
      newErrors.name = "نام باید حداقل ۲ کاراکتر باشد";
    }
    if (!phone.trim()) {
      newErrors.phone = "وارد کردن شماره موبایل الزامی است";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }
    if (!password) {
      newErrors.password = "وارد کردن رمز عبور الزامی است";
    } else if (!validatePassword(password)) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
    }
   if (email?.trim()) {
  if (!validateEmail(email)) {
    errors.email = "ایمیل معتبر نیست";
  }
}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const user = { name, phone, email, password }
    console.log(user)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);
    console.log(res)
    if (res.status === 201) {
      showSwal("ثبت نام با موفقیت انجام شد",
        "success", " ورود به پنل کاربری"
      )
      setName('')
      setEmail('')
      setPhone('')
      setPassword('')



    } else if (res.status === 422) {
      showSwal("کاربری با اطلاعات وارد شده قبلا ثبت نام کرده است", "error", "تلاش مجدد"
      )

    }
    if (res.status === 400) {
      if (data.errors) {
        setErrors(data.errors);
      }

      return;
    }

  }
  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <input className={`${styles.input} ${errors.name ? styles.inputError : ""
                }`}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (errors.name) {
                    setErrors((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }

                }} type="text" placeholder="نام" />
              {errors.name && (
                <span className={styles.error}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={`${styles.input} ${errors.phone ? styles.inputError : ""
                  }`}
                type="text"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);

                  if (errors.phone) {
                    setErrors((prev) => ({
                      ...prev,
                      phone: "",
                    }));
                  }
                }}
                placeholder="شماره موبایل"
              />

              {errors.phone && (
                <span className={styles.error}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ""
                  }`}
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }
                }}
                placeholder="ایمیل (دلخواه)"
              />

              {errors.email && (
                <span className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            {isRegisterWithPass && (
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ""
                    }`}
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                  }}
                  placeholder="رمز عبور"
                />

                {errors.password && (
                  <span className={styles.error}>
                    {errors.password}
                  </span>
                )}
              </div>
            )}




            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              onClick={() => {
                if (isRegisterWithPass) {
                  signup()

                }
                else {
                  setIsRegisterWithPass(true)
                }
              }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;

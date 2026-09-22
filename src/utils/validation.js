const validateEmail = (email) => {
  if (typeof email !== "string") return false;

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email.trim());
};

const validatePassword = (password) => {
  if (typeof password !== "string") return false;

  const pattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;

  return pattern.test(password);
};

const validatePhone = (phone) => {
  if (typeof phone !== "string") return false;

  const pattern = /^09\d{9}$/;

  return pattern.test(phone.trim());
};

export {
  validateEmail,
  validatePassword,
  validatePhone,
};
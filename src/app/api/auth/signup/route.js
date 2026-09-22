import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";
import { validateEmail, validatePassword, validatePhone } from "@/utils/validation";

export async function POST(req) {
   await connectToDB();
  const body = await req.json();
  const { name, phone, email, password } = body;
  const errors = {}
  // Validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "نام باید حداقل 2 کاراکتر باشد";
  }
  if (!phone || !validatePhone(phone)) {
    errors.phone = "شماره موبایل معتبر نیست"
  }
  if (email && !validateEmail(email)) {
    errors.email = "ایمیل معتبر نیست";
  }
  if (
    !password ||
    !validatePassword(password)
  ) {
    errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
  }
   if (Object.keys(errors).length > 0) {
      return Response.json(
        {
          message: "Validation failed",
          errors,
        },
        {
          status: 400,
        }
      );
    }
  const isUserExist = await UserModel.findOne({
    $or: [{ name }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      {
        message: "The username or email or phone exist already !!",
      },
      {
        status: 422,
      }
    );
  }

  const hashedPassword = await hashPassword(password);
  const accessToken = generateAccessToken({ name });

  const users = await UserModel.find({});

  await UserModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    { message: "User signed up successfully :))" },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}

import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { hashPassword } from "@/utils/auth";


export async function POST(req) {
    connectToDB();
    const body = await req.json();
    const { phone, email, password } = body;

    // Validation

   



    const hashedPassword = await hashPassword(password);
    if (hashPassword === password) {
        const users = await UserModel.findOne({
        $or: [{ email }, { phone }],
    });
        return Response.json({ message: 'you are login successfully', status: 200 })
    }



  
}

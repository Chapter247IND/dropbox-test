import users from "../models/users.js";
import bcryptjs from "bcryptjs";
import { encode, decode } from "../utils/jwt.js"
const login = async (req, res) => {
  console.log("============>", req)
  const { email, password } = req.body;
  const user = await users.findOne({ email });
  console.log("user", user)
  if (!user) {
    return res
      .status(400)
      .json(
        {
          errors: { email: "user not found!" }
        });
  }
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(422)
      .json({
        errors: { password: "Password did not match" }
      });
  }
  console.log("chackID", user._id)
  return res.status(200).json(
    {
      message: "User login successfully ",
      user: user,
      token: `${await encode({
        id: user._id,
      })}`
    }
  );
}

const AuthController = {
  login
}
export default AuthController;
import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { verify } from "jsonwebtoken";
import { verifyjwt } from "../middleware/auth.middleware";

const router=Router()

router.route("/signup").post(registerUser)
router.route("/signin").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)

export default router;
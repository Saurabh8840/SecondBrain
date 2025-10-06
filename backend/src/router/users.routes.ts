import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controller";

const router=Router()

router.route("/signup").post(registerUser)
router.route("/signin").get(loginUser)

export default router;
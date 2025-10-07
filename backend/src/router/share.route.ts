
import {Router} from "express"
import { verifyjwt } from "../middleware/auth.middleware";
import { shareAll,shareOne,openShareLink } from "../controllers/share.controllers";
const router=Router();



router.route("/all").post(verifyjwt,shareAll); //share all content
router.route("/:contentId").post(verifyjwt,shareOne);  //share one content 
router.route("/:hash").get(openShareLink)  //anyone can view link 

export default router
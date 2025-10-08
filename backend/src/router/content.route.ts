
import {Router} from "express"
import { verifyjwt } from "../middleware/auth.middleware";
import  {addContent,fetchContent,removeContent } from "../controllers/content.controllers";

const router=Router();

router.use(verifyjwt)

router.route("/addContent").post(addContent);
router.route("/fetchContent").get(fetchContent);
router.route("/delete/:contentId").delete(removeContent);


export default router
import { Router } from "express";
import { signup,signin,profile } from "../controller/auth.controller";
import { tokenValidation } from "../util/verifyToken";

const router: Router=Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', tokenValidation, profile);

export default router; 


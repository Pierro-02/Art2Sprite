import { Router } from 'express';
import '../backend/controllers/userController.ts';
import { login, register } from "../backend/controllers/userController";

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;

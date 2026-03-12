import { Router } from 'express';
import * as userCtrl from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/profile', protect, userCtrl.getProfile); // Ruta protegida

export default router;
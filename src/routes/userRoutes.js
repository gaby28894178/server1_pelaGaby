import { Router } from 'express';
import * as userCtrl from '../controllers/userController.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';

const userRouter = Router();

userRouter.route('/')
    .get(verifyJwt, userCtrl.getAll) // PROTEGIDA - Ver todos los usuarios
    .post(userCtrl.register);         // PÚBLICA - Registrar paciente

userRouter.route('/login')
    .post(userCtrl.login);            // PÚBLICA - Login

userRouter.route('/profile')
    .get(verifyJwt, userCtrl.getProfile); // PROTEGIDA - Ver perfil completo con pagos, turnos, etc.

export default userRouter;
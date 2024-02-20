import express from 'express';
import { verificationToken } from '../middlewares/middleware.js';
import { usersController } from '../controllers/users.controller.js'

const router = express.Router();
const userController = new usersController();

// 회원가입 API
router.post('/sign-up', userController.signup);

// 로그인 API
router.post('/log-in', userController.login);

// Access Token 재발급 API
router.get('/tokens', userController.reissuance)

// 내 정보 조회 API
router.get('/', verificationToken, userController.checkInformation)

export default router;
import express from 'express';
import { verificationToken } from "../middlewares/middleware.js";
import { resumesController } from '../controllers/resumes.controller.js';

const router = express.Router();

const resumeController = new resumesController();

// 이력서 생성
router.post('/resumes', verificationToken, resumeController.createResume);

export default router;
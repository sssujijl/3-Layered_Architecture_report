import express from 'express';
import { verificationToken } from "../middlewares/middleware.js";
import { resumesController } from '../controllers/resumes.controller.js';

const router = express.Router();
const resumeController = new resumesController();

// 이력서 생성
router.post('/', verificationToken, resumeController.createResume);

// 모든 이력서 조회 API
router.get("/", resumeController.viewallResumes);

export default router;
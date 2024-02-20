import express from 'express';
import { verificationToken } from "../middlewares/middleware.js";
import { resumesController } from '../controllers/resumes.controller.js';

const router = express.Router();
const resumeController = new resumesController();

// 이력서 생성
router.post('/', verificationToken, resumeController.createResume);

// 모든 이력서 조회 API
router.get('/', resumeController.findAllResumes);

// 이력서 상세 조회 API
router.get('/:resumeId', resumeController.findResume)

// 이력서 수정 API
router.put('/:resumeId', verificationToken, resumeController.editResume);

// 이력서 삭제 API
router.delete('/:resumeId', verificationToken, resumeController.deleteResume);

export default router;
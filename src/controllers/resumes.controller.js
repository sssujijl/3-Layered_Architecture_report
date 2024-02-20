import { resumeService } from '../services/resumes.services.js'

export class resumesController {
    resumeService = new resumeService();

    createResume = async (req, res, next) => {
        try {
            const { userId, name } = req.user;
            const { title, content } = req.body;

            const resume = await this.resumeService.createResume(
                userId,
                name,
                title,
                content
            );

            return res.status(201).json({ data: resume });

        } catch (err) {
            next(err);
        }
    }

    findAllResumes = async (req, res, next) => {
        try {
            const orderKey = req.query.orderKey;
            const orderValue = req.query.orderValue;

            const resumes = await this.resumeService.findAllResumes(
                orderKey,
                orderValue
            );

            return res.status(200).json({ data: resumes });

        } catch (err) {
            next(err);
        }
    }

    findResume = async (req, res, next) => {
        try {
            const { resumeId } = req.params;

            const resume = await this.resumeService.findResume(resumeId);

            return res.status(200).json({ data: resume });

        } catch (err) {
            next(err);
        }
    }

    editResume = async (req, res, next) => {
        try {
            const { resumeId } = req.params;
            const { userId } = req.user;
            const { title, content, status } = req.body;

            const resume = await this.resumeService.editResume(
                resumeId,
                userId,
                title,
                content,
                status
            );

            return res.status(200).json({ data: resume });

        } catch (err) {
            next(err);
        }
    }

    deleteResume = async (req, res, next) => {
        try {
            const { resumeId } = req.params;
            const { userId } = req.user;

            const resume = await this.resumeService.deleteResume(
                resumeId,
                userId
            );

            return res.status(200).json({ message: "해당 이력서를 삭제하였습니다." });

        } catch (err) {
            next(err);
        }
    }
}
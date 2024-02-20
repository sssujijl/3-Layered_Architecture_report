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

        } catch(err) {
            next(err);
        }
    }

    viewallResumes = async (req, res, next) => {
        try {
            const orderKey = req.query.orderKey;
            const orderValue = req.query.orderValue;

            const resumes = await this.resumeService.viewallResumes(
                orderKey,
                orderValue
            );

            return res.status(200).json({ data: resumes });

        } catch(err) {
            next(err);
        }
    }
}
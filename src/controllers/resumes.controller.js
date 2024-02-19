import { resumeService } from '../services/resumes.services.js'

export class resumesController {
    resumeService = new resumeService();

    createResume = async (req, res, next) => {
        try {
            const {userId, name} = req.user;
            const { title, content } = req.body;

            const createResume = await this.resumeService.createResume(
                userId,
                name,
                title,
                content
            );

            return res.status(201).json({ data: createResume });

        } catch (err) {
            next(err);
        }
    }
}
import { resumeRepository } from '../repositories/resumes.repositories.js'

export class resumeService {
    resumeRepository = new resumeRepository();

    createResume = async (userId, name, title, content) => {

        const createResume = await this.resumeRepository.createResume(
            userId,
            name,
            title,
            content
        );

        return createResume;
    }

    viewallResumes = async (orderKey, orderValue) => {

        const resumes = await this.resumeRepository.viewallResumes(
            orderKey,
            orderValue
        )

        if(!resumes) {
            return res.status(404).json({ message: "이력서 조회에 실패하였습니다." });
        }

        return resumes;
    }
}
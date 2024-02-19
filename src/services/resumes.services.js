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
}
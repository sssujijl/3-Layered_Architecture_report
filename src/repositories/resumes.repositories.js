import { prisma } from "../modules/index.js";

export class resumeRepository {

    createResume = async (userId, name, title, content) => {

        const resume = await prisma.resumes.create({
            data: {
                userId: +userId,
                title,
                content,
                author: name
            },
        });

        return resume;
    }

    viewallResumes = async (orderKey, orderValue) => {

        const resumes = await prisma.resumes.findMany({
            orderBy: {
                [orderKey]: orderValue.toLowerCase()
            },
        });

        return resumes;
    }
}
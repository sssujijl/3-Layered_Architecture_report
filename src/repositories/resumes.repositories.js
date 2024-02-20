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

    findAllResumes = async (orderKey, orderValue) => {

        const resumes = await prisma.resumes.findMany({
            orderBy: {
                [orderKey]: orderValue.toLowerCase()
            },
        });

        return resumes;
    }

    findResume = async (resumeId) => {

        const resume = await prisma.resumes.findFirst({ where: { resumeId: +resumeId } });

        return resume;
    }

    editResume = async (resumeId, userId, title, content, status) => {

        const resume = await prisma.Resumes.update({
            where: {
                resumeId: +resumeId,
                userId: +userId
            },
            data: {
                title: title,
                content: content,
                status: status,
            },
        });

        return resume;
    }

    deleteResume = async (resumeId, userId) => {

        const resume = await prisma.resumes.delete({
            where: {
                resumeId: +resumeId,
                userId: +userId
            }
        });

        console.log(resume);
        return resume;
    }
}
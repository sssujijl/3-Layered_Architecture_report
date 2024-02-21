import { test } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { resumesRepository } from '../../../src/repositories/resumes.repositories.js'

let mockPrisma = {
    resumes: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

let resumeRepository = new resumesRepository(mockPrisma);

describe('Resumes Repository Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('createResume Method', async () => {
        const mockReturn = 'create String';
        mockPrisma.resumes.create.mockReturnValue(mockReturn);

        const createResume = {
            userId: 0,
            title: 'title',
            content: 'content',
            author: 'author'
        };

        const resume = await resumeRepository.createResume(
            createResume.userId,
            createResume.author,
            createResume.title,
            createResume.content
        );

        expect(resume).toBe(mockReturn);
        expect(resumeRepository.prisma.resumes.create).toHaveBeenCalledTimes(1);
        expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
            data: createResume
        });
    });

    test('findAllResumes Method', async () => {
        const mockReturn = 'findMany String';
        mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

        const findAllResumes = {
            orderKey: 'orderKey',
            orderValue: 'orderValue'
        };

        const resumes = await resumeRepository.findAllResumes(
            findAllResumes.orderKey,
            findAllResumes.orderValue
        );

        expect(resumeRepository.prisma.resumes.findMany).toHaveBeenCalledTimes(1);
        expect(resumes).toBe(mockReturn);
        expect(mockPrisma.resumes.findMany).toHaveBeenCalledWith({
            orderBy: {
                [findAllResumes.orderKey]: findAllResumes.orderValue.toLowerCase()
            }
        });
    });

    test('findResume Method', async () => {
        const mockReturn = 'findFirst String';
        mockPrisma.resumes.findFirst.mockReturnValue(mockReturn);

        const findFirstResume = {
            resumeId: 0
        };

        const resume = await resumeRepository.findResume(
            findFirstResume.resumeId
        );

        expect(resumeRepository.prisma.resumes.findFirst).toHaveBeenCalledTimes(1);
        expect(resume).toBe(mockReturn);
        expect(mockPrisma.resumes.findFirst).toHaveBeenCalledWith({
            where: {
                resumeId: findFirstResume.resumeId
            }
        });
    })

    test('editResume Method', async () => {
        const mockReturn = 'update String';
        mockPrisma.resumes.update.mockReturnValue(mockReturn);

        const editResume = {
            resumeId: 0, 
            userId: 0, 
            title: 'title', 
            content: 'content', 
            status: 'status'
        };

        const resume = await resumeRepository.editResume(
            editResume.resumeId, 
            editResume.userId, 
            editResume.title, 
            editResume.content, 
            editResume.status
        );

        expect(resumeRepository.prisma.resumes.update).toHaveBeenCalledTimes(1);
        expect(resume).toBe(mockReturn);
        expect(mockPrisma.resumes.update).toHaveBeenCalledWith({
            where: {
                resumeId: editResume.resumeId,
                userId: editResume.userId
            },
            data: {
                title: editResume.title,
                content: editResume.content,
                status: editResume.status
            }
        });
    })

    test('deleteResume Method', async () => {
        const mockReturn = 'delete String';
        mockPrisma.resumes.delete.mockReturnValue(mockReturn);

        const deleteResume = {
            resumeId: 0, 
            userId: 0
        };

        const resume = await resumeRepository.deleteResume(
            deleteResume.resumeId, 
            deleteResume.userId
        );

        expect(resumeRepository.prisma.resumes.delete).toHaveBeenCalledTimes(1);
        expect(resume).toBe(mockReturn);
        expect(mockPrisma.resumes.delete).toHaveBeenCalledWith({
            where: {
                resumeId: deleteResume.resumeId,
                userId: deleteResume.userId
            }
        });
    })
});
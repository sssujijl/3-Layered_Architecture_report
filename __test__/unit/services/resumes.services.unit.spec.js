import { test } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { resumesService } from '../../../src/services/resumes.services.js'

let mockResumeRepository = {
    createResume: jest.fn(),
    findAllResumes: jest.fn(),
    findResume: jest.fn(),
    editResume: jest.fn(),
    deleteResume: jest.fn()
};

const resumeService = new resumesService(mockResumeRepository);

describe('Resumes Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('createResume Method', async () => {

        const sample = {
            resumeId: 0,
            userId: 0,
            title: 'title',
            content: 'content',
            author: 'author',
            status: 'status',
            countlike: 0,
            createdAt: '2024-02-21T08:58:43.718Z',
            updatedAt: '2024-02-21T08:58:43.718Z'
        };

        const resume = await resumeService.createResume(
            sample.userId,
            sample.author,
            sample.title,
            sample.content
        );

        mockResumeRepository.createResume.mockReturnValue(
            sample.userId,
            sample.author,
            sample.title,
            sample.content
        );
        
        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.createResume).toHaveBeenCalledWith(
            sample.userId,
            sample.author,
            sample.title,
            sample.content
        );
    })
})
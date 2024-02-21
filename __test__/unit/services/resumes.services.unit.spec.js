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

let resumeService = new resumesService(mockResumeRepository);

describe('Resumes Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('createResume Method', async () => {

        const sample = {
            userId: 0,
            name: 'name',
            title: 'title',
            content: 'content'
        };

        const resume = await resumeService.createResume(
            sample.userId,
            sample.name,
            sample.title,
            sample.content
        );

        mockResumeRepository.createResume.mockReturnValue(sample);

    })
})
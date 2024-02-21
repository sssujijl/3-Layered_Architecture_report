import { test } from '@jest/globals';
import { jest } from '@jest/globals';
import { usersRepositories } from '../../../src/repositories/user.repositories.js'

let mockPrisma = {
    users: {
        create: jest.fn(),
        findFirst: jest.fn()
    }
};

let userRepositories = new usersRepositories(mockPrisma);

describe('Users Repository Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('findUserByemail Method', async () => {
        const mockReturn = 'findFirst String';
        mockPrisma.users.findFirst.mockReturnValue(mockReturn);

        const findUserByemail = {
            email: 'email'
        };

        const user = await userRepositories.findUserByemail(
            findUserByemail.email
        );

        expect(userRepositories.prisma.users.findFirst).toHaveBeenCalledTimes(1);
        expect(user).toBe(mockReturn);
        expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({
            where: {
                email: findUserByemail.email
            }
        });
    })

    test('findUserByuserId Method', async () => {
        const mockReturn = 'findFirst String';
        mockPrisma.users.findFirst.mockReturnValue(mockReturn);

        const findUserByuserId = {
            userId: 0
        };

        const user = await userRepositories.findUserByuserId(
            findUserByuserId.userId
        );

        expect(userRepositories.prisma.users.findFirst).toHaveBeenCalledTimes(1);
        expect(user).toBe(mockReturn);
        expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({
            where: {
                userId: findUserByuserId.userId
            }
        });
    })

    test('signup Method', async () => {
        const mockReturn = 'create String';
        mockPrisma.users.create.mockReturnValue(mockReturn);

        const signup = {
            email: 'email', 
            password: 'hashedPassword', 
            name: 'name'
        };

        const user = await userRepositories.signup(
            signup.email,
            signup.password,
            signup.name
        );

        expect(user).toBe(mockReturn);
        expect(userRepositories.prisma.users.create).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.create).toHaveBeenCalledWith({
            data: signup
        });
    })
})
import { prisma } from "../modules/index.js";

export class usersRepositories {

    findUserByemail = async (email) => {
        const user = await prisma.users.findFirst({where: {email}});

        return user;
    }

    findUserByuserId = async (userId) => {
        const user = await prisma.users.findFirst({where : {userId: +userId}});

        return user;
    }

    signup = async (email, hashedPassword, name) => {
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        return user;
    }

}
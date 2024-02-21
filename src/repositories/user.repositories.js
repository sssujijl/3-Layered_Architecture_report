export class usersRepositories {

    constructor(prisma) {
        this.prisma = prisma;
    }

    findUserByemail = async (email) => {
        const user = await this.prisma.users.findFirst({where: {email}});

        return user;
    }

    findUserByuserId = async (userId) => {
        const user = await this.prisma.users.findFirst({where : {userId: +userId}});

        return user;
    }

    signup = async (email, hashedPassword, name) => {
        const user = await this.prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        return user;
    }

}
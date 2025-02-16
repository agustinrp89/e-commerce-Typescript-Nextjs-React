import prisma from '@/libs/prisma'

export default async function getUsers() {

    try {
        const users = prisma?.user.findMany()

        return users
    } catch (error:any) {
        throw new Error(error)
    }
}
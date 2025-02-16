import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma"

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser(){
    try{
        const session = await getSession()
        console.log("Session:", session); 
        if (!session?.user?.email) {
            return null;
          }
      
          const { email } = session.user;
      
          const currentUser = await prisma.user.findUnique({
            where: { 
              email: session?.user?.email
            },
              include:{
                orders: true
              }
          });
      
          if (!currentUser) {
            return null;
          }

        return{
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAT: currentUser.updateAT.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
        

    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

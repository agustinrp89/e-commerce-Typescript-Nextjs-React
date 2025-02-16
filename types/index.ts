import { User } from "@prisma/client";

export type SafeUser = Omit<
User,
"createdAt" | "updateAT" |
"emailVerified"
> & {
    createdAt: string;
    updateAT: string;
    emailVerified: string | null;
}
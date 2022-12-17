import type { User } from "./user"

export type Meeting = {
    title: string,
    description: string,
    location: string, 
    time: Date,
    admins: User[],
    members: Map<User, boolean>
}
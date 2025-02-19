import {z} from "zod"

export const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})



// http://localhost:5000/api/auth/signup

// {
//     "name":"bilal",
//     "email":"bilal@gmail.com",
//     "password":"pass@123"
// }
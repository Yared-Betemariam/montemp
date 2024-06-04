import * as z from "zod";

export const signinForm = z.object({
  email: z.string().email(),
});

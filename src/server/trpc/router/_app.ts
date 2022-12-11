import { router } from "../trpc";
import { authRouter } from "./auth";
import { passwordRouter } from "./password";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  password: passwordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

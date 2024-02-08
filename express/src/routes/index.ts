import { messagesRouter } from "./messages";
import { userRouter } from "./users";
import { channelsRouter } from "./channels";
import { authRouter } from "./auth";
import { Router } from "express";

const router : Router = Router();

router.get('/', (req : any, res : any) => {
  res.status(200).json({ success: true, message: 'Hello world!' });
});

router.use('/users', userRouter);
router.use('/channels', channelsRouter);
router.use('/messages', messagesRouter);
router.use('/auth',authRouter);

export const mainRouter : Router = router;
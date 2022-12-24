import { Router } from "express";
import { appDataSource } from "../datasource";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";

export const messageRouter = Router();
messageRouter.get("/", isAuth, async (req: any, res) => {
  const userId = req?.payload?.userId;
  const user = await appDataSource.getRepository(User).findOneBy({
    id: userId,
  });
  if (!user) {
    return res.send({ ok: false, message: "auth error" });
  }

  if (user.isAdmin) {
    const posts = await appDataSource.getRepository(Message).find();
    return res.send({ ok: true, posts });
  }

  const posts = await appDataSource.getRepository(Message).find({
    where: {
      user: {
        id: userId,
      },
    },
  });
  return res.send({ ok: true, posts });
});

messageRouter.post("/", isAuth, async (req: any, res) => {
  const userId = req?.payload?.userId;
  const { title, content } = req.body;
  const message = await Message.create({
    title,
    content,
    user: {
      id: userId,
    },
  }).save();

  return res.send({ ok: true, message });
});

messageRouter.post("/:id", isAuth, async (req: any, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const message = await appDataSource.getRepository(Message).update(
    {
      id,
    },
    {
      title,
      content,
    }
  );
  return res.send({ ok: true, message });
});

messageRouter.delete("/:id", isAuth, async (req: any, res) => {
  const { id } = req.params;
  await appDataSource.getRepository(Message).delete({
    id,
  });
  return res.send({ ok: true });
});

import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import "express-async-errors";
import { z } from "zod";
import { prisma } from "../../prisma/db.setup";
import { authMiddleware } from "../auth.utils";

const userController = Router();

// todo
userController.patch(
  "/users",
  authMiddleware,
  validateRequest({
    body: z.object({ email: z.string().email() }),
  }),
  async (req, res, next) => {
    if (req.user!.email === req.body.email) {
      return res.status(400).json({
        message:
          "Please change your email address to something different than your current email",
      });
    }

    // !this logic was already done with the authentication controller
    // const existingUser = await prisma.user
    //   .findFirstOrThrow({
    //     where: { email: paramsEmail },
    //   })
    //   .catch(() => null);

    // if (!existingUser) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    return await prisma.user
      .update({
        where: {
          // if this user is the correct email and Jwt secures it for us
          email: req.user?.email,
        },
        data: {
          email: req.body.email,
        },
      })
      .then((user) => res.status(201).json(user))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: "Username is taken" });
      })
      .finally(next);
  }
);

// todo:
//* Needs Authentication
userController.get("/users/:userEmail/dogs", async (req, res) => {
  const { userEmail } = req.params;
  const dogs = await prisma.dog.findMany({
    where: {
      userEmail,
    },
  });
  res.json(dogs);
});

export { userController };

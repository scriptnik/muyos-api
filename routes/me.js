import express from "express";
import users from "../data/users.js";
const meRouter = express.Router();

meRouter.post("/", (req, res, next) => {
  console.info(req.body);
  const user = users.find(item => item.username == req.body.username && item.credentials.password === req.body.password)
  if (user) {
    req.session.user = user;
    req.session.save();
    return res.send(req.session.user);
  }
  res.sendStatus(403);
});

meRouter.use((req, res, next) => {
    if (!req.session.user) {
        return res.sendStatus(403)
    } else {
        next();
    }
});

meRouter.get("/", (req, res, next) => req.session.user ? res.send(req.session.user) : res.sendStatus(403));
meRouter.delete("/", (req, res, next) => {
  req.session.user = undefined;
  req.session.save();
  res.sendStatus(200);
})
meRouter.get("/all", (req, res) => res.json(req.session.user) )

export default meRouter;
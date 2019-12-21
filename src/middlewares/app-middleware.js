import express from "express";
import session from "express-session";

export default express
  .Router()
  .use(
    session({
      secret: "hello-secret",
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: { maxAge: 15000 }
    })
  )
  .use(express.json());

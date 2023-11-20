import express, { Request, Response, Express } from "express";

const app: Express = express();

app.get("/", (_: Request, res: Response) => {
  return res.send({ message: "Hello world" });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));

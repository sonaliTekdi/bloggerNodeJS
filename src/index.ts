import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import authenticate from "./middlewares/authenticate";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";

createConnection()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(authenticate);

    app.use("/api/blogs", blogRoutes);
    app.use("/api/comments", commentRoutes);

    app.listen(3200, () => {
      console.log("Server started on port 3200");
    });
  })
  .catch((error) => console.log(error));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const router = express.Router();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use("/api", router);

const port = process.env.PORT || 8000.
server.listen(port, function afterServerStart() {
  console.log(`Server is running on port ${port}...`);
});

export { server, router };

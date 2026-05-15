import { Router } from "express";
import {
  getAllGames,
  getGameById,
  getNumberOfGames,
  getGamesPerGenre,
  postGame,
  putGame,
  deleteGame,
} from "../controllers/controller.js";

const router = Router();

router.get("/", getAllGames);
router.get("/count", getNumberOfGames);
router.get("/stats", getGamesPerGenre);
router.get("/:id", getGameById);
router.post("/", postGame);
router.put("/:id", putGame);
router.delete("/:id", deleteGame);

export default router;

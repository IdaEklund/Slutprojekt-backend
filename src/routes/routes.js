import { Router } from "express";
import { getAllGames, getGameById, getNumberOfGames, getGamesPerGenre } from "../controllers/controller.js";

const router = Router();

router.get('/', getAllGames);
router.get("/totaltantal", getNumberOfGames);
router.get("/spelpergenre", getGamesPerGenre);
router.get("/:id", getGameById);

export default router;
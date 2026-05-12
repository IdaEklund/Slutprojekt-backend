import { AppError } from "../utils/AppError.js";
import * as Games from "../models/Game.js";

export const getAllGames = async (req, res) => {
  const games = await Games.findGames();
  res.json(games);
};

export const getNumberOfGames = async (req, res) => {
    const numOfGames = await Games.findNumberofGames();
  res.json(numOfGames);
};

export const getGamesPerGenre = async (req, res) => {
    const gamesPerGenre = await Games.findGamesPerGenre();
  res.json(gamesPerGenre);
};

export const getGameById = async (req, res, next) => {
  const game = await Games.findGameById(Number(req.params.id));
  if (!game) return next(new AppError("Spelet hittades inte.", 404));
  res.json(game);
};
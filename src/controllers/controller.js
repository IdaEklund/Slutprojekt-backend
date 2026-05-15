import { AppError } from "../utils/AppError.js";
import * as Games from "../models/Game.js";
import {
  validateGameInput,
  validateGameLength,
  validateGenreId,
  validatePlattformId,
  validateUtgivareId,
} from "../middleware/validation.js";
import {
  validateBetyg,
  isValidYear,
  isUtgivareActive,
} from "../services/gameServices.js";

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

//next är en funktion som Express skickar in automatiskt i varje route-callback —
// den skickar vidare till nästa middleware.
export const getGameById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const game = await Games.findGameById(id);
    if (!game) return next(new AppError("Spelet hittades inte.", 404));
    res.json(game);
  } catch (error) {
    next(error);
  }
};

export const postGame = async (req, res, next) => {
  let { spelnamn, plattformId, genreId, utgivareId, releaseDatumEU, betyg } =
    req.body;

  try {
    validateGameInput(spelnamn, plattformId, genreId, utgivareId);
    validateGameLength(spelnamn);
    validatePlattformId(plattformId);
    validateGenreId(genreId);
    validateUtgivareId(utgivareId);
    validateBetyg(betyg);
    isValidYear(releaseDatumEU);
    isUtgivareActive(utgivareId, releaseDatumEU);

    const game = await Games.addGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

export const putGame = async (req, res, next) => {
  const id = Number(req.params.id);
  let { spelnamn, plattformId, genreId, utgivareId, releaseDatumEU, betyg } =
    req.body;

  try {
    validateGameInput(spelnamn, plattformId, genreId, utgivareId);
    validateGameLength(spelnamn);
    validatePlattformId(plattformId);
    validateGenreId(genreId);
    validateUtgivareId(utgivareId);
    validateBetyg(betyg);
    isValidYear(releaseDatumEU);
    isUtgivareActive(utgivareId, releaseDatumEU);

    const game = await Games.updateGame(id, req.body);
    if (!game) return next(new AppError("Spelet hittades inte.", 404));
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

export const deleteGame = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const game = await Games.deleteGame(id);
    if (!game) return next(new AppError("Spelet hittades inte.", 404));
    res.json(game);
  } catch (error) {
    next(error);
  }
};

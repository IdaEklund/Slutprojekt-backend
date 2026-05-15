import { AppError } from "../utils/AppError.js";

//Om Id:et man skriver inte är en siffra eller
//mindre än 1 får man ett error.
export const validateId = (id) => {
    if (!Number.isInteger(id) || id < 1) {
  throw new AppError(400, "Ogiltigt id-format.");
}
}


export const validateGameInput = (
  spelnamn,
  plattformId,
  genreId,
  utgivareId,
) => {
  if (!spelnamn || !plattformId || !genreId || !utgivareId) {
    throw new AppError(
      400,
      "spelnamn, plattformId, genreId och utgivareId krävs",
    );
  }
};

export const validateGameLength = (spelnamn) => {
  if (spelnamn.length > 60) {
    throw new AppError(400, "Vänligen välj ett kortare namn!");
  }
};

export const validatePlattformId = (plattformId) => {
  if (!Number.isInteger(plattformId) || plattformId < 1 || plattformId > 6) {
    throw new AppError(400, "Plattform-id:et måste vara en siffra mellan 1-6.");
  }
};

export const validateGenreId = (genreId) => {
  if (!Number.isInteger(genreId) || genreId < 1 || genreId > 9) {
    throw new AppError(400, "Genre-id:et måste vara en siffra mellan 1-9.");
  }
};

export const validateUtgivareId = (utgivareId) => {
  if (!Number.isInteger(utgivareId) || utgivareId < 1 || utgivareId > 7) {
    throw new AppError(400, "Utgivare-id:et måste vara en siffra mellan 1-7.");
  }
};


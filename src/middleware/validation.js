import { AppError } from "../utils/AppError";

//Om Id:et man skriver inte är en siffra eller
//mindre än 1 får man ett error.
export const validateId = (id) => {
    if (!Number.isInteger(id) || id < 1) {
  throw new AppError(400, "Ogiltigt id-format.");
}
}
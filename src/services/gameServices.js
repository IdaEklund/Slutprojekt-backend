import { AppError } from "../utils/AppError.js";

//Kollar om betyg är giltigt
export const validateBetyg = (betyg) => {
  if (
    betyg !== undefined &&
    (!Number.isInteger(betyg) || betyg < 1 || betyg > 100)
  ) {
    throw new AppError(400, `"betyg" måste vara en siffra mellan 1-100"`);
  }
};

//Kollar om året för releasedatumet är giltigt
export const isValidYear = (releaseDatumEU) => {
  //Icke-ifyllt datum är ok
  if (!releaseDatumEU) return;

  if (releaseDatumEU?.length === 4) {
    releaseDatumEU = `${releaseDatumEU}-01-01`;
  }

  const date = new Date(releaseDatumEU);
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1985; // NES kom till Sverige 1986

  if (isNaN(date) || year < MIN_YEAR || year > currentYear + 5) {
    throw new AppError(
      400,
      `Releasedatum måste vara mellan ${MIN_YEAR} och ${currentYear + 5}.`, //spel kan ha releasedatum som är satta några år framåt
    );
  }
};

//Kollar om utgivaren var aktiv vid valt datum.
export const isUtgivareActive = (utgivareId, releaseDatumEU) => {
  if (!releaseDatumEU) {
    return true;
  }

  const year = new Date(releaseDatumEU).getFullYear();

  const acclaimStartYear = new Date("1987-01-01").getFullYear();
  const acclaimEndYear = new Date("2004-01-01").getFullYear();
  const oceanSoftwareEndYear = new Date("1998-01-01").getFullYear();
  const virginEndYear = new Date("2003-01-01").getFullYear();

  if (
    (utgivareId === 1 && (year < acclaimStartYear || year > acclaimEndYear)) ||
    (utgivareId === 6 && year > oceanSoftwareEndYear) ||
    (utgivareId === 7 && year > virginEndYear)
  ) {
    throw new AppError(
      400,
      "Utgivaren var inte aktiv detta år. Välj annat datum eller annan utgivare.",
    );
  }
};

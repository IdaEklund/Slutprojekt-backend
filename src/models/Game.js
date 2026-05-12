import { query } from "../config/db.js";


//Få ut all data:
export const findGames = () =>
    query(
  `SELECT spel.namn AS spel, utgivare.namn AS utgivare, plattform.namn AS plattform, 
  spel_plattform.releasedatum_eu AS 'releasedatum EU', 
  spel_plattform.betyg, GROUP_CONCAT(genre.namn SEPARATOR ', ') 
  AS genrer FROM spel_plattform JOIN spel on spel_plattform.spelid=spel.id 
  JOIN plattform on spel_plattform.plattformid=plattform.id JOIN utgivare ON 
  spel.utgivareid=utgivare.id JOIN spel_genre ON spel_genre.spelid=spel.id 
  JOIN genre ON spel_genre.genreid=genre.id GROUP BY spel.namn, utgivare.namn, 
  plattform.namn, spel_plattform.releasedatum_eu, spel_plattform.betyg`,
);


//Få ut en delmängd:
export const findGameById = async(id) => {
    const rows = await query("SELECT * FROM spel WHERE id = ?", [id]);
    return rows[0] ?? null;
};

//Få ut antal spel i databasen:
export const findNumberofGames = () =>
  query(
    "SELECT COUNT(*) AS antal_spel FROM spel",
  );
 

//Få ut antal spel per genre:
export const findGamesPerGenre = () =>
    query(
    `SELECT genre.namn AS genre, COUNT(spel_genre.spelid) AS antalSpel
     FROM genre
     JOIN spel_genre ON genre.id = spel_genre.genreid
     GROUP BY genre.namn
     ORDER BY antalSpel DESC`,
  )
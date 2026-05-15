import { query, pool } from "../config/db.js";

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
export const findGameById = async (id) => {
  const rows = await query("SELECT * FROM spel WHERE id = ?", [id]);
  return rows[0] ?? null;
};

//Få ut antal spel i databasen:
export const findNumberofGames = () =>
  query("SELECT COUNT(*) AS antal_spel FROM spel");

//Få ut antal spel per genre:
export const findGamesPerGenre = () =>
  query(
    `SELECT genre.namn AS genre, COUNT(spel_genre.spelid) AS antalSpel
     FROM genre
     JOIN spel_genre ON genre.id = spel_genre.genreid
     GROUP BY genre.namn
     ORDER BY antalSpel DESC`,
  );

  //Lägg till ett spel:
export const addGame = async ({
  spelnamn,
  plattformId,
  genreId,
  utgivareId,
  releaseDatumEU,
  betyg,
}) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result1] = await connection.execute(
      "INSERT INTO spel (namn, UtgivareID) VALUES (?, ?)",
      [spelnamn, utgivareId],
    );
    await connection.execute(
      "INSERT INTO spel_plattform (SpelID, PlattformID, releasedatum_eu, betyg) VALUES (?, ?, ?, ?)",
      [result1.insertId, plattformId, releaseDatumEU ?? null, betyg ?? null],
    );
    await connection.execute(
      "INSERT INTO spel_genre (SpelID, GenreID) VALUES (?, ?)",
      [result1.insertId, genreId],
    );
    await connection.commit();
    const rows = await query("SELECT * FROM spel WHERE id = ?", [
      result1.insertId,
    ]);
    return rows[0] ?? null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

//Uppdatera/ersätt ett spel:
export const updateGame = async (
  id,
  { spelnamn, plattformId, genreId, utgivareId, releaseDatumEU, betyg },
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [exists] = await connection.execute(
      "SELECT ID FROM spel WHERE ID = ?",
      [id],
    );
    if (!exists.length) return null;
    await connection.execute(
      "UPDATE spel SET namn = ?, UtgivareID = ? WHERE ID = ?",
      [spelnamn, utgivareId, id],
    );
    await connection.execute("DELETE FROM spel_plattform WHERE SpelID = ?", [
      id,
    ]);
    await connection.execute(
      "INSERT INTO spel_plattform (SpelID, PlattformID, releasedatum_eu, betyg) VALUES (?, ?, ?, ?)",
      [id, plattformId, releaseDatumEU ?? null, betyg ?? null],
    );
    await connection.execute("DELETE FROM spel_genre WHERE SpelID = ?", [id]);
    await connection.execute(
      "INSERT INTO spel_genre (SpelID, GenreID) VALUES (?, ?)",
      [id, genreId],
    );
    await connection.commit();
    return { message: "Spelet uppdaterades" };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

//Ta bort ett spel:
export const deleteGame = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const rows = await query("SELECT * FROM spel WHERE id = ?", [id]);
    if (!rows[0]) return null;
    await connection.execute("DELETE FROM spel_plattform WHERE SpelID = ?", [
      id,
    ]);
    await connection.execute("DELETE FROM spel_genre WHERE SpelID = ?", [id]);
    await connection.execute("DELETE FROM spel WHERE ID = ?", [id]);
    await connection.commit();
    return { message: "Spelet raderades" };
    return rows[0];
    
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
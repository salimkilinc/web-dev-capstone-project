import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = (() => {
  if (process.env.NODE_ENV !== "production") {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    });
  } else {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
})();

export default pool;

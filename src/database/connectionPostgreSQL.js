import pg from "pg";

export const pool = new pg.Pool({
    host:"localhost",
    port: 5432,
    database: "salon",
    user: "postgres",
    password: "luespino123"
})
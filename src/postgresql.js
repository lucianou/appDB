import {pool} from "./database/connectionPostgreSQL.js";

const getLanguages=async()=>{
    try{
        const result = await pool.query("SELECT rut, nombre FROM empleado;");
        console.table(result.rows[0]);
        console.log("result listed");
    }catch(error){
        console.error(error)
    }
};

getLanguages();
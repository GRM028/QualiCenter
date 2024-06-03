//Author: Geardo Rios

import dynamodb from "../services/dynamoService";
import joi from "joi";
import { PREFIX_NAME } from "../config/index";

const EncuestaModel = dynamodb.define("encuesta", { 
  hashKey: "EncuestaId",
  timestamps: false,
  schema: {
    EncuestaId: dynamodb.types.uuid(),
    username: joi.string(),
    score: joi.number(),
    comment:joi.array().items(joi.string())
  },
  tableName: `Encuesta${PREFIX_NAME}`, 
});
/* */

dynamodb.createTables((err) => {
  if (err) 
    return console.log("Error creating tables: ", err);
  console.log("Tables created");
});
export default EncuestaModel;

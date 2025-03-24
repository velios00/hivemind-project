import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import { authRouter } from "./routes/authRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";
import { voteRouter } from "./routes/voteRouter.js";
import { ideaRouter } from "./routes/ideaRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();
const PORT = 3000;

app.use(morgan("dev")) //middleware per logging
app.use(cors());

app.use(express.json());


//generate OpenAPI spec and show swagger ui
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'HIVEMIND PROJECT',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*Router.js'], // files containing annotations
  });
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//routes
 app.use(authRouter);
 app.use(enforceAuthentication);
 app.use(ideaRouter);
 app.use(voteRouter);
 app.use(commentRouter);
 app.use(userRouter);

//error handler
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});
  
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });

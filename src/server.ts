import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';

import http from 'http';
import mainRouter from './routes/main';

const app = express();

// eslint-disable-next-line import/no-named-as-default-member
app.use(express.json());
app.use(cors());

// for react files
/*  app.use(express.static(path.join(__dirname, 'client/', 'build'))); */

app.use(morgan('dev'));

app.use('/', mainRouter);

// for react files
/* app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); */

// redirects to main endpoint
app.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'page not found'));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

const httpServer = http.createServer(app);
const port = process.env.PORT || '3000';

httpServer.listen(port, () => {
  console.info(`🚀 Server ready at http://localhost:${port}`);
});

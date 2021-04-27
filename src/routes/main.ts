/* eslint-disable filenames/match-exported */
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    res.send({ message: 'Hello, this was a GET req' });
  })
  .post(async (req, res) => {
    res.send({ message: 'Hello, this was a POST req' });
  });

export default router;

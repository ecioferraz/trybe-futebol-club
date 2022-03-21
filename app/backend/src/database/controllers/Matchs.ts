import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import MatchsService from '../services/Matchs';

export default class MatchsController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query.inProgress as string;

      const matchs = await MatchsService.getAll(query);

      return res.status(StatusCode.OK).json(matchs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await MatchsService.create(req.body);

      if (match.message) return next(match);

      return res.status(StatusCode.CREATED).json(match);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchsService.finishMatch(+id);

      return res.status(StatusCode.OK).json({ message: 'Finish' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // public static async getById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const club = await MatchsService.getById(+id);

  //     return res.status(StatusCode.OK).json(club);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

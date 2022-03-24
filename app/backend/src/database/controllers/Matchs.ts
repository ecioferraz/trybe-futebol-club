import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import MatchsService from '../services/Matchs';

export default class MatchsController {
  public static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.inProgress as string;

      const matchs = await MatchsService.getAll(query);

      return res.status(StatusCode.OK).json(matchs);
    } catch (error) {
      next(error);
    }
  };

  public static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await MatchsService.create(req.body);

      if (match.message) return next(match);

      return res.status(StatusCode.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  };

  public static finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await MatchsService.finishMatch(+id);

      return res.status(StatusCode.OK).json({ message: 'Finish' });
    } catch (error) {
      next(error);
    }
  };

  public static updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const match = await MatchsService.updateMatch(+id, req.body);

      return res.status(StatusCode.OK).json(match);
    } catch (error) {
      next(error);
    }
  };
}

import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  public static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await LeaderboardService.getAll();

      return res.status(StatusCode.OK).json(leaderboard);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  public static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await LeaderboardService.getAll();
      // console.log(resp);
      return res.status(StatusCode.OK).json(resp);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

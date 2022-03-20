import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import ClubsService from '../services/Clubs';

export default class ClubsController {
  public static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const clubs = await ClubsService.getAll();

      return res.status(StatusCode.OK).json(clubs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const club = await ClubsService.getById(+id);

      return res.status(StatusCode.OK).json(club);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

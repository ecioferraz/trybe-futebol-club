// import { IError, StatusCode } from '../interfaces';
import Club from '../models/Club';
import Match from '../models/Match';

export default class MatchsService {
  public static async getAll(): Promise<Match[]> {
    return Match.findAll({ include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ] });
  }

  // public static async getById(id: number): Promise<Club | IError> {
  //   const club = await Club.findByPk(id);

  //   if (!club) return { code: StatusCode.NOT_FOUND, message: 'Club not found' };

  //   return club;
  // }
}

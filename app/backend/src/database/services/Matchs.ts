// import { IError, StatusCode } from '../interfaces';
import Club from '../models/Club';
import Match from '../models/Match';

export default class MatchsService {
  public static async getAll(inProgress: string): Promise<Match[]> {
    let where;

    if (inProgress === 'false') where = { inProgress: false };
    if (inProgress === 'true') where = { inProgress: true };

    return Match.findAll({ include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
    where });
  }

  // public static async getById(id: number): Promise<Club | IError> {
  //   const club = await Club.findByPk(id);

  //   if (!club) return { code: StatusCode.NOT_FOUND, message: 'Club not found' };

  //   return club;
  // }
}

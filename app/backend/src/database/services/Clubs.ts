import { IError, StatusCode } from '../interfaces';
import Club from '../models/Club';

export default class ClubsService {
  public static async getAll(): Promise<Club[]> {
    return Club.findAll();
  }

  public static async getById(id: number): Promise<Club | IError> {
    const club = await Club.findByPk(id);

    if (!club) return { code: StatusCode.NOT_FOUND, message: 'Club not found' };

    return club;
  }
}

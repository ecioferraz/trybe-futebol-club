import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Club extends Model {
  public id?: number;

  public clubName: string;
}

Club.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'id', as: 'matchs', constraints: false });

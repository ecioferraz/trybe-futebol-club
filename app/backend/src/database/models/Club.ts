import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Club extends Model {
  public id!: number;

  public clubName!: string;
}

Club.init({
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

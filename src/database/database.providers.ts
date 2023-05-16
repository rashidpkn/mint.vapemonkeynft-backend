import { Sequelize } from 'sequelize-typescript';
import { User } from './model/user.entity';
import { Coupon } from './model/coupon.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'mint',
        logging:false,
      });
      sequelize.addModels([User,Coupon]);
      await sequelize.sync({alter:true,});
      return sequelize;
    },
  },
];
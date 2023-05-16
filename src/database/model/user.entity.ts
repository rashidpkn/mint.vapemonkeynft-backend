import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {

  @Column({allowNull:false})
  email:string

  @Column({allowNull:false})
  password:string

  @Column({allowNull:false})
  first_name:string

  @Column({allowNull:false})
  last_name:string

  @Column({allowNull:false})
  phone_number:string

  @Column({allowNull:false})
  wallet_address : string
  

}

console.log('User Table is OK');
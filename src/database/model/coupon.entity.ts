import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Coupon extends Model {
  @Column({allowNull:false})
  email:string

  @Column({allowNull:false})
  coupon_code:string

  @Column({allowNull:false,defaultValue:false})
  is_redeem:boolean

  @Column
  discount:string

}

console.log("Coupon Table is OK");
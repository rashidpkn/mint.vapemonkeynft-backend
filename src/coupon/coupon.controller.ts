import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon } from 'src/database/model/coupon.entity';
import { Request } from 'express';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  create(
    @Req() req: Request,

  ) {
    console.log('Hello');
    const { coupons,email } = req.body
      coupons.map((e: { prefix: any; id: any; discount: any; }) => {
        const { prefix, id, discount } = e
        const coupon_code = prefix + makeid(4) + id
        Coupon.create({email,coupon_code,discount})
      })
    return true
  }

  @Get(':email')
  getByEmail(
    @Param() param : any
  ){
    const {email} = param
    return Coupon.findAll({where:{email}})
  }


}



function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
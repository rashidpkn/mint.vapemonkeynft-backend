import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import jwt_create from 'src/auth/create-jwt';
import jwt_verify from 'src/auth/verify-jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign-up')
  async signUp(
    @Body() body: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, password, wallet_address, first_name, last_name, phone_number } = body

    if (email && password && wallet_address && first_name && last_name && phone_number) {
      const { status, reason } = await this.userService.signUp(email, password, wallet_address, first_name, last_name, phone_number)
      if (status) {
        res.cookie('tokon', jwt_create(email, wallet_address)).json({ status: true,reason })
      } else res.status(409).send({ status, reason })
    } else res.status(422).send({ status: false })
  }

  @Post('sign-in')
  async signIn(
    @Body() body: any,
    @Res({ passthrough: true }) res: Response
  ){
      const {email,password} = body
      if(email&&password){
        const data = await this.userService.signIn(email,password)
        const {status,reason,wallet_address}:any = data
        if(status){
          res.cookie('tokon', jwt_create(email, wallet_address)).json({ status: true,reason })
        }else res.status(401).send({ status, reason })
      }else res.status(422).send({ status: false })
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res:Response
  ){
    const { tokon } = req.cookies
    if(tokon){
      const value = jwt_verify(tokon)
      res.clearCookie('tokon')
    }
    res.status(202).send({status:true,reason:'logout successfull'})
   
  }
}

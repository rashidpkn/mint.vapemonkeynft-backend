import { Injectable, Post } from '@nestjs/common';
import { request } from 'express';
import { User } from 'src/database/model/user.entity';


@Injectable()
export class UserService {

    async signUp(email: string, password: string, wallet_address: string, first_name: string, last_name: string, phone_number: string) {
        try {
            const users = await User.findAll({ raw: true })
            const found =  users.filter(user => user.email === email || user.wallet_address === wallet_address || user.phone_number === phone_number)
            if (found.length === 0) {
                const user = await User.create({ email, password, wallet_address, first_name, last_name, phone_number })
                return{
                    status:true,
                    reason:"User is created"
                    }
            } else{
                return {
                    status:false,
                    reason:"User alredy exist"
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async signIn(email:string,password:string){
        try {
            const found = await User.findOne({where:{email,password}})
            if(found){
                return{
                    status:true,
                    reason:'email and password are matching',
                    wallet_address:found.wallet_address
                }
            }else{
                return{
                    status:false,
                    reason:'email and password are not matching'
                }
            }
        } catch (error) {
            
        }
    }

    
    logout(){
        
    }

}

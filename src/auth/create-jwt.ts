import * as jwt  from 'jsonwebtoken';
import secret_key from './jwt-secret-key';

function jwt_create(email:string,wallet_address:string){
    try {
        return jwt.sign({email,wallet_address},secret_key,{expiresIn:'1h'})
    } catch (error) {
        console.log(error.message);
    }
}

export default jwt_create
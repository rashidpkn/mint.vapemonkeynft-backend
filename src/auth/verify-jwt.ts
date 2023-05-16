import * as jwt  from 'jsonwebtoken';
import secret_key from './jwt-secret-key';

function jwt_verify(tokon:string){
    try {
        const {email,wallet_address}:any =  jwt.verify(tokon,secret_key)
        return{email,wallet_address}
    } catch (error) {
        console.log(error.message);
    }
}

export default jwt_verify
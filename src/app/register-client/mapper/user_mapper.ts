import { UserEntity } from '../entity/user-entity';
import { User } from '../model/user';
import { Mapper } from '../../base/mapper';

export class UserMapper extends Mapper<UserEntity, User> {

    mapFrom(param: UserEntity): User {
        return {
            id: param.id,
            name: param.name ? param.name : '',
            surname: param.surname ? param.surname : '',
            mail: param.mail,
            password: param.password
        }
    };

    mapTo(param: User): UserEntity {
        return {
            id: param.id,
            name: param.name,
            surname: param.surname,
            mail: param.mail,
            password: param.password
        }
    }
}
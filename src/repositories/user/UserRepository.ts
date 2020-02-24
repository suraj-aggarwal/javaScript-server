import { userModel } from './UserModel';


class UserRepository {

    public count = () => {
        return userModel.countDocuments();
    }

    public create = (user: any) => {
        return userModel.create(user);
    }

    public delete = (id: string) => {
        console.log('----------DELETE USER-------------', id);
        return userModel.deleteOne({_id: id});
    };

    public update = (id: string, dataToUpdate: object) => {
        return userModel.findByIdAndUpdate({_id: id}, dataToUpdate);
    }

    public isExits = (id: string, email: string) => {
        console.log('----------isExits-----------', id, email);
        const _id = id;
        const condition = { _id: id, email };
        return userModel.exists(condition);
    }

    public profile = (_id: string) => {
        console.log('----------------User Profile Inside Controller--------------');
        return userModel.findOne({_id});
    }
}

export default UserRepository;
import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, deleteQuery, putQuery, postQuery, checkPasswordQuery, limitQuery } from './query.js'


export class UserService {
    constructor(_tableName, _param = null) {
        this.tableName = "Users ";
        this.param = _param;
    }

    async getUser() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getUserById(id) {
        const query = getByIdQuery(this.tableName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getUserByParam(value) {
        const query = getByParamQuery(this.tableName, this.param);
        const result = await executeQuery(query, [value]);
        return result;
    }

    async checkIfUserExist(Item) {
        const query = checkPasswordQuery("Passwords");
        Item = Object.values(Item);
        console.log("lolololololo", Item[1])
        const result = await executeQuery(query, [Item[1]]);
        return result[0]["COUNT(*)"];
    }

    async addUser(user) {
        const userKeys = Object.keys(user);
        const userValues = Object.values(user);
        const query = postQuery(this.tableName,userKeys);
        const result = await executeQuery(query, userValues);
        return result;
    }

    async addPassword(PasswordObj) {
        // console.log("userid", PasswordObj,"id",PasswordObj.id);
        const query = postQuery("Passwords");
        PasswordObj = Object.values(PasswordObj);
        console.log("PasswordObj" + PasswordObj)

        // const PasswordObj = (typeof password === 'object')? Object.values(password): [password];
        // PasswordObj.push(id);
        // PasswordObj = Object.values(PasswordObj);

        console.log("insert password3" + PasswordObj)
        const result = await executeQuery(query, PasswordObj);
        return result;
    }

    async updateUser(user, id) {
        // console.log("user", user)
        const query = putQuery(this.tableName);
        user = (typeof user === 'object') ? Object.values(user) : [user];
        user.push(id);
        // console.log("user", user)
        const result = await executeQuery(query, user);
        return result;
    }

    async deleteUser(id) {
        const query = deleteQuery(this.tableName, this.param);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async limitGet(start) {
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
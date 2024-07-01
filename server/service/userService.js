import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, deleteQuery, putQuery, postQuery, checkPasswordQuery, limitQuery } from './query.js'


export class UserService {
    constructor(_tableName, _param = null) {
        this.tableName = "Users ";
        this.param = _param;
        this.idName="UserID";
    }

    async getUser() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getUserById(id) {
        const query = getByIdQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getUserByParam(value) {
        const query = getByParamQuery(this.tableName, this.param);
        const result = await executeQuery(query, [value]);
        return result;
    }

    async checkIfUserExist(Item) {
        // const query = checkPasswordQuery("Passwords");
        console.log("lolololololo", Item)
        const query = getByParamQuery("Passwords", "Password");
        // Item = Object.values(Item);
        // console.log("lolololololo", Item)
        const result = await executeQuery(query,[Item]);
        console.log("lolololololo", Item)
        return result;
        // return result[0]["COUNT(*)"];
    }

    async addUser(user) {
        const userKeys = Object.keys(user);
        const userValues = Object.values(user);
        const query = postQuery(this.tableName,userKeys);
        const result = await executeQuery(query, userValues);
        return result;
    }

    async addPassword(PasswordObj) {
        const passwordKeys = Object.keys(PasswordObj);
        const passwordValues = Object.values(PasswordObj);
        // PasswordObj = Object.values(PasswordObj);
        const query = postQuery("Passwords",passwordKeys);
        // const PasswordObj = (typeof password === 'object')? Object.values(password): [password];
        // PasswordObj.push(id);
        // PasswordObj = Object.values(PasswordObj);
        const result = await executeQuery(query, passwordValues);
        return result;
    }

    async updateUser(user, id) {
        const userKeys = Object.keys(user);
        user = (typeof user === 'object') ? Object.values(user) : [user];
        user.push(id);
        const query = putQuery(this.tableName,userKeys,this.idName);
        const result = await executeQuery(query, user);
        return result;
    }

    async deleteUser(id) {
        const query = deleteQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async limitGet(start) {
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
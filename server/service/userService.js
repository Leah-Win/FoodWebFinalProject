import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, getByParamsQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'


export class UserService {
    constructor(_tableName, _param = null) {
        this.tableName = "users ";
        this.param = _param;
        this.idName = "UserID";
    }
    //?
    async getUser() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }
    //p
    async getUserById(id) {
        const query = getByIdQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }
    // async getUserByEmail(params) {
    //     const query = getByParamQuery(this.tableName,params.userEmail);
    //     const result = await executeQuery(query, [params.userEmail]);
    //     return result;
    // }
    //p
    async  getUserByEmail(params) {
      

        const query = getByParamQuery(this.tableName, "Email");
        console.log(params.userEmail,"params.userEmail")

        const result = await executeQuery(query, [params.userEmail]);
        console.log(result, "rererereaa")
        return result;
    }
    async getUserByParams(params){
        // console.log(";;;;;;;;;;;;;;;;;;;;;;;",Object.keys(params)[0])
        // console.log(Object.values(params), "values")
        // console.log(Object.keys(params), "keys")
        // console.log(Object.values(params)[0], "values[]")
        // console.log(Object.keys(params)[0], "keys[]")
        const query = getByParamsQuery(this.tableName, [Object.keys(params)[0]]);
        // console.log(Object.values(params)[0], "lllll")
        const result = await executeQuery(query, [Object.values(params)[0]]);
        console.log(result)
        return result;
    }
    //p
    async checkIfUserExist(password) {
        const query = getByParamsQuery("Passwords", [Object.keys(password)][0]);
        const result = await executeQuery(query, [Object.values(password)][0]);
        return result;
    }
    //p
    async addUser(user) {
    //    const userObj=user.slice(0,4)
    //     console.log("user",userObj)
        const userKeys = Object.keys(user).slice(0,4);
        const userValues = Object.values(user).slice(0,4);
        const query = postQuery(this.tableName, userKeys);
        const result = await executeQuery(query, userValues);
        return result;
    }
    //p
    async addPassword(PasswordObj) {
        const passwordKeys = Object.keys(PasswordObj);
        const passwordValues = Object.values(PasswordObj);
        // PasswordObj = Object.values(PasswordObj);
        const query = postQuery("Passwords", passwordKeys);
        // const PasswordObj = (typeof password === 'object')? Object.values(password): [password];
        // PasswordObj.push(id);
        // PasswordObj = Object.values(PasswordObj);
        const result = await executeQuery(query, passwordValues);
        console.log(result,"rrrrrrrrrrrrrrr",passwordValues)
        return result;
    }
    //p
    async updateUser(user, id) {
        const userKeys = Object.keys(user);
        user = (typeof user === 'object') ? Object.values(user) : [user];
        user.push(id);
        const query = putQuery(this.tableName, userKeys, this.idName);
        const result = await executeQuery(query, user);
        return result;
    }
    //p
    async deleteUser(id) {
        const query = deleteQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }
    //p??
    async limitGet(start) {
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
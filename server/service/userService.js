import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, getByParamsQuery, deleteQuery, putQuery, postQuery, limitQuery,insetUserDatails } from './query.js'
import { create } from '../middleware/authenticateToken.js';

export class UserService {
    constructor(_tableName, _param = null) {
        this.tableName = "users ";
        this.param = _param;
        this.idName = "UserID";
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

    async  getUserByEmail(params) {
        const query = getByParamQuery(this.tableName, "Email");
        const result = await executeQuery(query, [params.userEmail]);
        return result;
    }
    async getUserByParams(params){
        const query = getByParamsQuery(this.tableName, [Object.keys(params)[0]]);
        const result = await executeQuery(query, [Object.values(params)[0]]);
        return result;
    }

    async checkIfUserExist(password) {
        const query = getByParamsQuery("Passwords", [Object.keys(password)][0]);
        const result = await executeQuery(query, [Object.values(password)][0]);
        return result;
    }
   
    async addUser(user) {
        const userKeys = Object.keys(user);
        const userValues = Object.values(user);
        const query = postQuery(this.tableName, userKeys);
        const result = await executeQuery(query, userValues);
        // const token = create(result.insertId);
        return {result};
    }

    async updateUser(user, id) {
        const userKeys = Object.keys(user);
        user = (typeof user === 'object') ? Object.values(user) : [user];
        user.push(id);
        const query = putQuery(this.tableName, userKeys, this.idName);
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
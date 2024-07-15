import { executeQuery } from './db.js';
import { signToken } from "../middleware/token.js";
import { getQuery, getByIdQuery, getByParamQuery, getByParamsQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'

export class UserService {
    constructor(_tableName, _param = null) {
        this.tableName = "users ";
        this.param = _param;
        this.idName = "UserID";
    }

    async getUserById(id) {
        const query = getByIdQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getUserByParams(params) {
        const query = getByParamsQuery(this.tableName, Object.keys(params));
        const result = await executeQuery(query, Object.values(params));
        if (result.length > 0) {
            const token = signToken(result[0].username);
            return { token: token,data: result[0] };
        }
        throw { status: 401, message: "Authentication failed" }

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
        if (result) {
            const token = signToken(user.username);
            return { token: token, id: result.insertId };
        }
        throw { status: 409, message: "Conflict occurred" };
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
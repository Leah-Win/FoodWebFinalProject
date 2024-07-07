import { executeQuery } from './db.js';
import { getQuery, getByIdQuery,postSomeQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'


export class OrderService {
    constructor(_tableName, _param = null) {
        this.tableName = "Orders ";
        this.param = _param;
        this.idName = "OrderID";
    }

    async getAllOrders() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getOrderById(id) {
        const query = getByIdQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async addOrder(order) {
        const orderKeys = Object.keys(order);
        const  ordeValues = Object.values(order);
        const orderquery = postQuery(this.tableName, orderKeys.slice(0, 2));
        const result = await executeQuery(orderquery, ordeValues.slice(0, 2));
        return result;
    }


    async updateOrder(order, id) {
        const orderKeys = Object.keys(order);
        order = (typeof order === 'object') ? Object.values(order) : [order];
        order.push(id);
        const query = putQuery(this.tableName, orderKeys, this.idName);
        const result = await executeQuery(query, order);
        return result;
    }

    async deleteOrder(id) {
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
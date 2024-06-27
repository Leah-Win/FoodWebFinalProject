import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'


export class ItemsService {
    constructor(_tableName, _param=null) {
        this.tableName = " Items";
        this.param = _param;
        this.idName="ItemID";
    }

    async getAllItems() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getItemById(id) {
        console.log("hi");
        const query = getByIdQuery(this.tableName,this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async addItem(item) {
        const itemKeys = Object.keys(item);
        const itemValues = Object.values(item);
        const query = postQuery(this.tableName,itemKeys);
        const result = await executeQuery(query, itemValues);
        return result;
    }


    async updateItem(item, id) {
        const itemKeys = Object.keys(item);
        item = (typeof item === 'object')? Object.values(item): [item];
        item.push(id);
        const query = putQuery(this.tableName,itemKeys,this.idName );
        const result = await executeQuery(query, item);
        return result;
    }

    async deleteItem(id) {
        const query = deleteQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async limitGet(start){
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
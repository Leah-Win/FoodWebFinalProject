import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'


export class MenuService {
    constructor(_tableName, _param=null) {
        this.tableName = "MenuItems";
        this.param = _param;
        this.idName="MenuItemID";
    }

    async getAllMenus() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getMenuById(id) {
        console.log("hi");
        const query = getByIdQuery(this.tableName,this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getMenuByParam(param) {
        console.log("hi getMenuByPraram");
        const query = getByParamQuery(this.tableName,this.param);
        const result = await executeQuery(query, [param]);
        return result;
    }


    async addMenu(menu) {
        const menuKeys = Object.keys(menu);
        const menuValues = Object.values(menu);
        const query = postQuery(this.tableName,menuKeys);
        const result = await executeQuery(query, menuValues);
        return result;
    }


    async updateMenu(menu, id) {
        const menuKeys = Object.keys(menu);
        menu = (typeof menu === 'object')? Object.values(menu): [menu];
        menu.push(id);
        const query = putQuery(this.tableName,menuKeys,this.idName );
        const result = await executeQuery(query, menu);
        return result;
    }

    async deleteMenu(id) {
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
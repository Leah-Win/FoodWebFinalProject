import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, deleteQuery, putQuery,getByParamQuery, postQuery, limitQuery } from './query.js'


export class RestaurantMenuService {
    constructor(_tableName, _param=null) {
        this.tableName = "RestaurantMenu";
        this.param = _param;
        this.idName="RestaurantMenuID";
    }

    async getAllRestaurantMenu() {
        //console.log("ololololforlgdl6xh")
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getMenuItemById(id) {
        // console.log("hi");
        const query = getByIdQuery(this.tableName,this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getMenuItemByParams(params) {
        const query = getByParamQuery(this.tableName,params.restaurant);
        const result = await executeQuery(query, [params.restaurantID]);
        return result;
    }

    async addMenuItem(restaurantMenu) {
        const restaurantMenuKeys = Object.keys(restaurantMenu);
        const restaurantMenuValues = Object.values(restaurantMenu);
        const query = postQuery(this.tableName,restaurantMenuKeys);
        const result = await executeQuery(query, restaurantMenuValues);
        return result;
    }


    async updateMenuItem(restaurantMenu, id) {
        const restaurantMenuKeys = Object.keys(restaurantMenu);
        restaurantMenu = (typeof restaurantMenu === 'object')? Object.values(restaurantMenu): [restaurantMenu];
        restaurantMenu.push(id);
        const query = putQuery(this.tableName,restaurantMenuKeys,this.idName );
        const result = await executeQuery(query, restaurantMenu);
        return result;
    }

    async deleteMenuItem(id) {
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
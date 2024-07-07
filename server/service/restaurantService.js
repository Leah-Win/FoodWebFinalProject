import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, deleteQuery, putQuery, postQuery, limitQuery } from './query.js'


export class RestaurantService {
    constructor(_tableName, _param=null) {
        this.tableName = "Restaurants ";
        this.param = _param;
        this.idName="RestaurantID";
    }

    async getAllRestaurants() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getRestaurantById(id) {
        const query = getByIdQuery(this.tableName,this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async addRestaurant(restaurant) {
        const restaurantKeys = Object.keys(restaurant);
        const restauranValues = Object.values(restaurant);
        const query = postQuery(this.tableName,restaurantKeys);
        const result = await executeQuery(query, restauranValues);
        return result;
    }


    async updateRestaurant(restaurant, id) {
        const restaurantKeys = Object.keys(restaurant);
        restaurant = (typeof restaurant === 'object')? Object.values(restaurant): [restaurant];
        restaurant.push(id);
        const query = putQuery(this.tableName,restaurantKeys,this.idName );
        const result = await executeQuery(query, restaurant);
        return result;
    }

    async deleteRestaurant(id) {
        const query = deleteQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        const childQuery=deleteQuery("restaurantMenu","RestaurantID")
        await executeQuery(childQuery,[id]);
        return result;
    }

    async limitGet(start){
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
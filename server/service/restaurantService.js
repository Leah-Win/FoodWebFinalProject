import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, deleteQuery, putQuery, postQuery, checkPasswordQuery, limitQuery } from './query.js'


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
        console.log("hi");
        const query = getByIdQuery(this.tableName,this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    // async getRestaurantByParam(value) {
    //     const query = getByParamQuery(this.tableName, this.param);
    //     const result = await executeQuery(query, [value]);
    //     return result;
    // }

    // async checkIfRestaurantExist(Item) {
    //     const query = checkPasswordQuery("Passwords");
    //     Item = Object.values(Item);
    //     console.log("lolololololo" , Item[1])
    //     const result = await executeQuery(query, [Item[1]]);
    //     return result[0]["COUNT(*)"];
    // }

    async addRestaurant(restaurant) {
        console.log("ooooooooooooooooo");
        const restaurantKeys = Object.keys(restaurant);
        const restauranValues = Object.values(restaurant);
        const query = postQuery(this.tableName,restaurantKeys);
        const result = await executeQuery(query, restauranValues);
        return result;
    }

    // async addPassword(PasswordObj) {
    //     // console.log("Restaurantid", PasswordObj,"id",PasswordObj.id);
    //     const query = postQuery("Passwords");
    //     PasswordObj = Object.values(PasswordObj);
    //     console.log("PasswordObj"+PasswordObj)

    //     // const PasswordObj = (typeof password === 'object')? Object.values(password): [password];
    //     // PasswordObj.push(id);
    //     // PasswordObj = Object.values(PasswordObj);

    //     console.log("insert password3"+PasswordObj)
    //     const result = await executeQuery(query, PasswordObj);
    //     return result;
    // }

    async updateRestaurant(Restaurant, id) {
        // console.log("Restaurant", Restaurant)
        const query = putQuery(this.tableName);
        Restaurant = (typeof Restaurant === 'object')? Object.values(Restaurant): [Restaurant];
        Restaurant.push(id);
        // console.log("Restaurant", Restaurant)
        const result = await executeQuery(query, Restaurant);
        return result;
    }

    async deleteRestaurant(id) {
        const query = deleteQuery(this.tableName, this.param);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async limitGet(start){
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}
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
        console.log("hi");
        const query = getByIdQuery(this.tableName, this.idName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async addOrder(order) {
        console.log("bhjcvghkgj")
        const orderKeys = Object.keys(order);
        const  ordeValues = Object.values(order);
        console.log(orderKeys)

        const orderquery = postQuery(this.tableName, orderKeys.slice(0, 2));
        const result = await executeQuery(orderquery, ordeValues.slice(0, 2));
        // const itemsquery = postSomeQuery("orderitems", orderKeys.slice(3));
        // await executeQuery(itemsquery, [ ordeValues.slice(3)]);
        return result;

       
const keys = ['column1', 'column2', 'column3'];
const values = [
    [value1a, value1b, value1c],
    [value2a, value2b, value2c]
];

const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ?`;

// Execute the prepared statement with the array of values

        // Define the function
        // function createInsertQuery(tableName, keys) {
        //     const valuesPlaceholder = Array(keys.length).fill("?").join(", ");
        //     const query = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${valuesPlaceholder})`;
        //     return query;
        // }

        // // Example usage with an array of objects
        // const tableName = "your_table_name";
        // const objectArray = [
        //     { column1: value1a, column2: value1b, column3: value1c },
        //     { column1: value2a, column2: value2b, column3: value2c }
        // ];

        // const keys = Object.keys(objectArray[0]); // Assuming all objects have the same structure

        // const insertQuery = createInsertQuery(tableName, keys);





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
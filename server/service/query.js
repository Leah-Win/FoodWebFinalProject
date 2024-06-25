// import executeQuery from './db.js';
// import dotenv from 'dotenv'
// dotenv.config();


import { query } from "express";

function getQuery(tableName) {
    const query = `SELECT * FROM ${tableName} `;
    // const query = `SELECT * FROM ${tableName} where isActive = 1`;

    return query
}

function getByParamQuery(tableName, param) {
    // const query = `SELECT * FROM ${tableName} where isActive = 1 AND ${param} = ?`;
    const query = `SELECT * FROM ${tableName} where  ${param} = ?`;
    return query
}

function getByIdQuery(tableName,IdName) {
    // לא נכון בעליל
 
    const query = `SELECT * FROM ${tableName} where ${IdName} = ?`;
    return query
}

function checkPasswordQuery(tableName) {
    console.log("????????????????????")

    // const query = `SELECT COUNT(*) FROM ${tableName} WHERE isActive = 1 AND username = ? AND password = ?`;
    const query = `SELECT COUNT(*) FROM ${tableName} WHERE password = ? `;
    console.log("????????????????????")
    return query;
}

function deleteQuery(tableName, param) {
    const query = `UPDATE ${tableName} SET isActive = 0 WHERE ${param} = ?`;
    return query
}
//חייבים לעשות גנרי!!!
function postQuery(tableName,keys) {
    console.log("kkkkkkkkkk")
    let query;
    debugger
        query = `INSERT INTO ${tableName} (${keys.map(key=>key)}) VALUES (${keys.map(key=>"?")})`
        console.log("kkkkkkkkkk")
    return query;
}
//חייבים לעשות גנרי!!!
function putQuery(tableName,keys) {

    //שגוי נראה לי
    let query;
         query = `UPDATE ${tableName} SET ${keys.map(key=>key+"=?")} WHERE ${tableName}id`;
        // case 'posts':
        //     query = `UPDATE posts SET title=?, body=? WHERE id = ?`;
        //     break;
    return query;
}

function limitQuery(tableName) {
    const query = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    return query;
}

export {
    getQuery, getByIdQuery, getByParamQuery, deleteQuery, postQuery, putQuery, checkPasswordQuery, limitQuery
}


// const DB_NAME = process.env.DB_NAME;

// export default async function getQuery(table, action, queryParams, params) {
//     let query = "";
//     switch (action) {
//         case 'getAll':
//             query = `SELECT * FROM ${DB_NAME}.${table}`;
//             break;
//         case 'get':
//             query = `SELECT * FROM ${DB_NAME}.${table}`;
//             if(table=='passwords')
//                 query = `SELECT COUNT(*) FROM ${DB_NAME}.${table}`;
            
//             if (Object.keys(queryParams).length > 0) {
//                 const conditions = [];
//                 Object.keys(queryParams).forEach(param => {
//                     if (param !== 'sort' && param !== 'limit' && param !== 'page') {
//                         conditions.push(`${param} = ?`);
//                     }
//                 });
        
//                 if (conditions.length > 0) {
//                     query += ` WHERE ${conditions.join(' AND ')}`;
//                 }
        
//                 if (queryParams.sort) {
//                     query += ` ORDER BY ${queryParams.sort}`;
//                 }
//                 if (queryParams.limit && queryParams.page) {
//                     const offset = (queryParams.page - 1) * queryParams.limit;
//                     query += ` LIMIT ${queryParams.limit} OFFSET ${offset}`;
//                 }
//             }
//             break;

//         case 'create':
//             const queryFields = `DESC ${DB_NAME}.${table}`;
//             const fieldsData = await executeQuery(queryFields);
//             const fields = fieldsData.map(row => row.Field);
//             const newFields = fields.filter(field => field !== 'id'&&field !== 'status');
//             const questionMarks = Array(newFields.length).fill('?');
//             query = `INSERT INTO ${DB_NAME}.${table} (${newFields.join(', ')}) VALUES (${questionMarks.join(', ')})`;
//             break;

//         case 'delete':
//             query = `DELETE FROM ${DB_NAME}.${table}`;
//             const conditions = [];
//             Object.keys(queryParams).forEach(param => {
//                 conditions.push(`${param} = ?`);
//             });
//             if (conditions.length > 0) {
//                 query += ` WHERE ${conditions.join(' AND ')}`;
//             }
//             break;

//         case 'update':
//             const fieldsUpdateStr = Object.keys(params).map(field => `${field} = ?`).join(', ');
//             const whereConditions = Object.keys(queryParams).map(param => `${param} = ?`).join(' AND ');
//             query = `UPDATE ${DB_NAME}.${table} SET ${fieldsUpdateStr} WHERE ${whereConditions}`;        
//             break;

//         default:
//             throw new Error('Invalid action');
//     }
//     return query;
// }

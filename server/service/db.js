import mysql from 'mysql2/promise';
import 'dotenv/config'

async function executeQuery(query, params) {

    let results;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });

    try {
        [results] = await connection.execute(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        connection.end();
    }
    return results;
}

export {
    executeQuery
}




// import mysql from 'mysql2';
// import dotenv from 'dotenv'
// dotenv.config();

// async function executeQuery(query, params) {
//     return new Promise((resolve, reject) => {
//         const connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             database: process.env.DB_NAME,
//             password: process.env.PASSWORD
//         });

//         connection.connect(err => {
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             connection.execute(query, params, (error, results) => {
//                 if (error) {
//                     reject(error);
//                     return;
//                 }
                
//                 resolve(results);

//                 connection.end();
//             });
//         });
//     });
// }


// export default executeQuery;
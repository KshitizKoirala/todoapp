// // Test is Incomplete

// const ejs = require('ejs');
// const path = require('path');
// const {JSDOM} = require('jsdom');
// const request = require("supertest");
// const db = require("../models/index");


// const targetFile = path.resolve(__dirname, '../views/index.ejs');

// ejs.renderFile(targetFile, function (err, str) {
//   if (str){
//     let dom;
//     let container;

//     // ANCHOR DESCRIBE ENDPOINT
//     describe("/", () => {
//       let server;
//       beforeAll(async () => {
//         server = require("../app");
//         await db.sequelize.sync({ force: true });
//         dom = new JSDOM(str, { runScripts: 'dangerously' })
//         container = dom.window.document.body
//       });
    
//       afterAll(async () => {
//         await server.close();
//         await db.sequelize.close();
//         await db.sequelize.drop();
//       });
    
//       // ANCHOR TEST FOR HTTP GET
//       describe("GET /", () => {
//         let task;
    
//         beforeEach(async () => {
//           task = await db.Tasks.create({
//             task_name: "Test Task",
//             task_description: "This is a test Task",
//             task_status: "ToDo",
//             task_end_date_time: "2022-05-22 02:45:00",
//           });
//         });
    
//         afterEach(async () => {
//           await db.Tasks.destroy({
//             where: {},
//             truncate: true,
//           });
//         });
    
//         it("should return all task details", async () => {
//           const res = await request(server).get("/");
//           console.log(res.body)
//           console.log('>>> ', container.querySelector('.list-tasks').textContent)
//           // expect(...res.body).toHaveProperty("task_name", "Test Task");
//         });
    
//         // it("should return 404 if no task is registered", async () => {
//         //   await db.Task.destroy({
//         //     where: {},
//         //     truncate: true,
//         //   });
//         //   const res = await request(server).get("/");
//         //   expect(res.status).toBe(404);
//         // });
//       });
//     });
//   }
// });
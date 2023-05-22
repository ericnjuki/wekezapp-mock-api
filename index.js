// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'PUT' && req.originalUrl.toString().includes('chama')) {
    // console.log(req.body[0]);
    res.json({ message:"chama updated successfully", name: req.body.name});
    // let oldChama = req.body[0];
    // const newChama = {};
    // delete Object.assign(newChama, oldChama, {id: oldChama.ChamaId}).ChamaId;
    // req.body = [newChama];
  } else {
    // Continue to JSON Server router
    next();
  }
});

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  "/users/register": "/register",
  "/users/login": "/login",
  "/users/sendRecoveryCode": "/sendRecoveryCode",
  "/users/recover": "/recover",
  "/users/getFlow": "/notifications",
  "/users/getFlowOfType?userId=:UserId&notificationType=:NotificationType": "/users/notifications?notificationType=:NotificationType",
  "/users/:UserId": "/users?UserId=:UserId",
  "/chama/:ChamaId": "/chama?ChamaId=:ChamaId",
  "/ledger/createMgr": "/transactions?Discriminator=MerryGoRound"
}))
server.use(router)

// server.use((req, res, next) => {
//   if (req.method === 'GET' && req.originalUrl.toString().includes('chama')) {
//     console.log(res.body);
//     // let oldChama = req.body[0];
//     // const newChama = {};
//     // delete Object.assign(newChama, oldChama, {ChamaId: oldChama.id}).id;
//     // req.body = [newChama];
//   }
//   next();
// });

server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running on port http://localhost:3000')
});
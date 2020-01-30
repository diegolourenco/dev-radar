/**
 * Métodos HTTP
 *
 * GET - Requisitar alguma informação.
 * POST - Salvar um novo recurso.
 * PUT - Alterar um recurso.
 * DELETE - Remover um recurso.
 */

/**
 * Tipos de Parâmetros
 *
 * Query Params: request.query()
 *   - Filtros, ordenação, paginação, ...
 *   - Ex: /?seach=Diego
 * Route Params: request.params()
 *   - Identificar os recursos que serão alterados ou removidos
 *   - Ex: /users/1
 *   - Ex URL: /users/:id
 * Body: request.body()
 *   - Dados para criação ou alteração de um registro
 */

const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevController.index);
routes.get("/devs/:id", DevController.show);
routes.post("/devs", DevController.store);
routes.put("/devs/:id", DevController.update);
routes.delete("/devs/:id", DevController.destroy);
routes.delete("/devs", DevController.deleteAll);

routes.get("/search", SearchController.index);

module.exports = routes;

// routes.get("/", (request, response) => {
//   return response.json({
//     message: "Semana Omnistack 10",
//     teacher: "Diego Fernandes"
//   });
// });

// routes.post("/users", (request, response) => {
//   console.log(request.body);
//   return response.json({ message: "Method Post" });
// });

// routes.put("/users/:id", (request, response) => {
//   console.log(request.params, request.body);
//   return response.json({ message: "Method Put" });
// });

// routes.delete("/users/:id", (request, response) => {
//   console.log(request.params, request.body);
//   return response.json({ message: "Method Delete" });
// });

/********************************
 * server/api/v1/tasks/routes.js
 ********************************/

const router = require('express').Router()
const controller = require('./controller');

/*
* /api/tasks/    POST   - CREATE
* /api/tasks/    GET    - READ ALL
* /api/tasks/:id GET    - READ ONE
* /api/tasks/:id PUT    - UPDATE
* /api/tasks/:id DELETE - DELETE
*/

router
    .route('/')
    .get    ( controller.all   )
    .post   ( controller.create )

router.param('id', controller.id)

router
    .route('/:id')
    .get    ( controller.read   )
    .put    ( controller.update )
    .delete ( controller.delete )


module.exports = router

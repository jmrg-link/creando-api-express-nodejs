/******************
 * server/api/index.js
 ******************/

const router = require('express').Router()

router.route('/tasks')
    .get((req,res,next) => {
        res.json({
            msg:'Todas las Tareas (/api/Tasks)'
        })
})

module.exports = router

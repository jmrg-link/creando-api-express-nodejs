/************************************
 * server/api/v1/tasks/controller.js
 ************************************/
const Model = require('./model')

exports.id = async ( req , res , next , id  ) => {
    try {
        const doc = await Model.findById(id).exec()
        if (!doc){
            const message = ` ${Model.modelName} no existe en la base de datos `
            next({
                message,
                statusCode:404,
                level:'warn'
            })
        } else {
            req.doc = doc
            next()
        }
    }catch (err) {
        console.log(err)
        next( new Error( err ))
    }
}

exports.create = async ( req, res, next ) => {
    const { body = {} } = req
    const document = new Model(body)

    try {
      const doc = await document.save()
      res.status ( 201 )
      res.json({
          data: doc,
          success: true
      }
    )
    } catch (err) {
        console.log ( err )
        next( new Error( err ))
    }
}

exports.all = async ( req, res, next ) => {
    try {
        const docs = await Model.find({}).exec()
        res.json({
            success: true,
            data:docs
        })
    }catch (err) {
        console.log ( err )
        next( new Error( err ))
    }
}

exports.read = async (req, res, next) => {
    const { doc = {} } = req;
    res.json({
        success: true,
        data: doc
    });

}

exports.update = async (req, res, next) => {
    const { doc = {}, body = {} } = req
    Object.assign(doc,body)
try {
    const updated = await doc.save()
    res.json ({
        success:true,
        data:updated
    })
} catch (err) {
    console.log(err)
    next ( new Error( err ))
    }
}

exports.delete = async (req, res, next) => {
    const { doc = {} } = req
    try {
        const removed = await doc.remove()
        res.json({
            success:true,
            data:removed
        })
    } catch (err) {
        console.log(err)
        next (new Error( err ))
    }
}

/************************************
 * server/api/v1/tasks/controller.js
 ************************************/
const Model = require('./model')
const { paginationParseParams } = require('../../../util');

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

    const { query = {}, params = {} } = req
    const { limit, page, skip } = paginationParseParams(query)

    const docs = await Model.find({}).skip(skip).limit(limit).exec()
    const count = Model.countDocuments();

    try {
        const data = await Promise.all([all.exec(),count.exec()])
        const [docs, total] = data
        const pages = Math.ceil( total / limit )

        res.json({
            success: true,
            data:docs,
            meta : {
                limit,
                skip ,
                total,
                page,
                pages
            }
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

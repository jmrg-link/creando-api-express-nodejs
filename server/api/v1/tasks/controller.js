/************************************
 * server/api/v1/tasks/controller.js
 ************************************/

exports.create = async ( req, res, next ) => {
    const { body = {} } = req
    const document = new Model(body)

    try {
      const doc = await document.save()
      res.status ( 201 ).json( doc )
    } catch (err) {
        console.log ( err )
        next( new Error( err ))
    }
}

exports.all = async ( req, res, next ) => {
    try {
        const docs = await Model.find({}).exec()
        res.json(docs)
    }catch (err) {
        console.log ( err )
        next( new Error( err ))
    }
}

exports.read = (req, res, next) => {
    const { params = {} } = req
    const { id } = params;
    res.json({
        id
    })
}

exports.update = (req, res, next) => {
    const { body = {}, params = {} } = req
    const { id } = params
    res.json({
        id,
        body
    })
}

exports.delete = (req, res, next) => {
    const { params = {} } = req
    const { id } = params
    res.json({
        id
    })
}

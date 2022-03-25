const logger = (req, res, next) => {
  // console.log(req.params)
  // console.log(req.method)
  // console.log(req.url)
  // console.log(req.body)
  // console.log(' ------- ')
  next()
}

module.exports = logger

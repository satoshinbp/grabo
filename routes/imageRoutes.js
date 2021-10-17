const imageController = require('../controllers/imageController')

module.exports = (app) => {
  app.post('/api/image', imageController.upload.array('image', 3), imageController.uploadImage)
  app.get('/api/images', imageController.fetchImage)
}

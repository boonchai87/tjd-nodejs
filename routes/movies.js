const express = require('express');
const router = express.Router();
const movieController = require('../app/api/controllers/movies');
/* router.get('/', movieController.getAll);
router.post('/', movieController.create);
router.get('/:movieId', movieController.getById);
router.put('/:movieId', movieController.updateById);
router.delete('/:movieId', movieController.deleteById); */

router.get('/movie/', movieController.getAll);
router.post('/movie/', movieController.create);
router.get('/movie/:movieId', movieController.getById);
router.put('/movie/:movieId', movieController.updateById);
router.delete('/movie/:movieId', movieController.deleteById);
module.exports = router;
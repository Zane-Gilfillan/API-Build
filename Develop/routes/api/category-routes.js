const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  
  try {

    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);

  } catch(err) {

    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value

  try {

    const categoryDataId = await Category.findByPk(req.params.id, {

      include: [{ model: Product }],

    });

    if (!categoryDataId) {

      res.status(404).json({message: 'nothing found with this id. sorry!'});
      return
    }

    res.status(200).json(categoryDataId);

  } catch (err) {

    res.status(500).json(err)

  }
});

router.post('/', async (req, res) => {
  // create a new category

  try {

    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);

  } catch (err) {

    res.status(400).json(err)

  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {

    const categoryDataId = await Category.update(req.body, {
      where: {id: req.params.id}
    });

    if (!categoryData) {

      res.status(404).json({message: 'nothing found with this id. sorry!'});
      return

    }

    res.status(200).json(categoryData)

  } catch (err) {

    res.status(500).json(err)

  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {

    const categoryDataId = await Category.destroy({
      where: {id: req.params.id}

    });

    if (!categoryDataId) {

      res.status(404).json({message: 'nothing found with this id. sorry!'});
      return
    }

    res.status(200).json(categoryDataId)

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;

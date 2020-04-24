const Category = require('../models/product/category.js');

// const add = async function(req, res, next) {
//   console.log('...............', req.decoded);
//   console.log('...............', req.body);

//   const categoryParam = {
//     category: req.body.category,
//     type: req.body.type,
//     // parentid: req.body.parentid,
//     position: req.body.position,
//     description: req.body.description,
//     is_active: 1,
//     meta_description: req.body.meta_description,

//     meta_keywords: req.body.meta_keywords,
//     // created_by: req.decoded.id
//   };

  // try {
    // const newCategory = new Category(categoryParam);

//     newCategory
//       .add()
//       .then(result => {
//         console.log('controller category', result);
//         new Category({}).all().then(categoryList => {
//           res.send({ categoryList });
//         });
//       })
//       .catch(err => {
//         res.status(500);
//         res.render('error', { error: err });
//       });
//   } catch (err) {
//     next(err);

//     res.status(500);
//     res.send('error', { error: err });
//   }
// };

// const edit = async function(req, res, next) {
//   console.log('...............', req.decoded);
//   console.log('...............', req.body);

//   const categoryParam = {
//     id: req.body.id,
//     category: req.body.category,
//     type: req.body.type,
//     // parentid: req.body.parentid,
//     position: req.body.position,
//     description: req.body.description,
//     is_active: 1,
//     meta_description: req.body.meta_description,

//     meta_keywords: req.body.meta_keywords,
//     // created_by: req.decoded.id
//   };

//   try {
//     const newCategory = new Category(categoryParam);

//     newCategory
//       .update()
//       .then(result => {
//         console.log('controller category', result);
//         new Category({}).all().then(categoryList => {
//           res.send({ categoryList });
//         });
//       })
//       .catch(err => {
//         res.status(500);
//         res.render('error', { error: err });
//       });
//   } catch (err) {
//     next(err);

//     res.status(500);
//     res.send('error', { error: err });
//   }
// };

const maincat = async function(req, res, next) {
  try {
    const mainCategoryList = await new Category({}).all();
    
    res.send({ mainCategoryList });
  } catch (err) {
    next(err);
  }
};

module.exports = { maincat };

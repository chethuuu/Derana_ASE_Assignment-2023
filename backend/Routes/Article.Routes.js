const express = require('express');
const router = express.Router();
const ArticleController = require('../Controllers/Article.Controller')
const RequiredLogin = require('../Middleware/Auth')

//routes
router.route('/').post(RequiredLogin, ArticleController.CreateArticle);
router.route('/').get(RequiredLogin, ArticleController.GetArticle);
router.route('/myArticle').get(RequiredLogin, ArticleController.MyArticles);

module.exports = router;
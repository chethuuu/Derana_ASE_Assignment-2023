const express = require('express');
const router = express.Router();
const ArticleController = require('../Controllers/Article.Controller')
const RequiredLogin = require('../Middleware/Auth')

//routes in article
router.route('/').post(RequiredLogin, ArticleController.CreateArticle);
router.route('/').get(RequiredLogin, ArticleController.GetArticle);
router.route('/myArticle').get(RequiredLogin, ArticleController.MyArticles);
router.route('/like').put(RequiredLogin, ArticleController.LikeArticle);
router.route('/unlike').put(RequiredLogin, ArticleController.Unlikearticle);
router.route('/comment').put(RequiredLogin, ArticleController.Comment);
router.route('/:id').get(RequiredLogin, ArticleController.getArticleDetailsbyID);
router.route('/update/:id').put(RequiredLogin, ArticleController.updateArticle);
router.route('/:postId').delete(RequiredLogin, ArticleController.deleteArticle);

module.exports = router;
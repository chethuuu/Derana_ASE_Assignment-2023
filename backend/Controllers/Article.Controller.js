const Article = require('../Model/Article.Model');

const ArticleController = {

    //create post
    CreateArticle: async (req, res) => {
        const { location, body, picture } = req.body;

        if (!location || !body || !picture) {
            res.status(422).json({ error: "Please fill the all fields!" })
        }

        //not pass password to post 
        req.user.password = undefined;

        const article = new Article({
            location: location,
            body: body,
            postImg: picture,
            postedBy: req.user
        });

        article.save().then(result => {
            res.json({ article: result })
        }).catch(err => {
            console.log(err)
        });
    },

    //get post
    GetArticle: async (req, res) => {
        Article.find()
            .populate('postedBy', '_id name email profilePic')
            .sort('-createdAt')
            .then(articles => {
                res.json({ articles: articles })
            }).catch(err => {
                console.log(err)
            })
    },

    //MyArticles
    MyArticles: async (req, res) => {
        Article.find({ postedBy: req.user._id })
            .populate("postedBy", '_id name, email, profilePic')
            .sort('-createdAt')
            .then(MyArticles => {
                res.json({ MyArticles })
            }).catch(err => {
                console.log(err);
            })
    },
}

module.exports = ArticleController
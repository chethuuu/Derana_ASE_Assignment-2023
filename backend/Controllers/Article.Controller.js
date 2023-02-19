const Post = require('../Model/Article.Model');

const PostController = {

    //create article
    CreateArticle: async (req, res) => {
        const { location, body, picture } = req.body;

        if (!location || !body) {
            res.status(422).json({ error: "Please fill the all fields!" })
        }

        //not pass password to post 
        req.user.password = undefined;

        const post = new Post({
            location: location,
            body: body,
            postImg: picture,
            postedBy: req.user
        });

        post.save().then(result => {
            res.json({ post: result })
        }).catch(err => {
            console.log(err)
        });
    },

    //get article
    GetArticle: async (req, res) => {
        Post.find()
            .populate('postedBy', '_id name email profilePic')
            .sort('-createdAt')
            .sort('likes')
            .then(posts => {
                res.json({ posts: posts })
            }).catch(err => {
                console.log(err)
            })
    },

    //get user own article
    MyArticles: async (req, res) => {
        Post.find({ postedBy: req.user._id })
            .populate("postedBy", '_id name email profilePic')
            .sort('-createdAt')
            .then(myPost => {
                res.json({ myPost })
            }).catch(err => {
                console.log(err);
            })
    },

    //Like news 
    LikeArticle: async (req, res) => {
        console.log(req.body)
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    },

    //Unlike news
    Unlikearticle: async (req, res) => {
        console.log(req.body)
        Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    },

    //Add Comment
    Comment: async (req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        }
        console.log(req.body)
        Post.findByIdAndUpdate(req.body.postId, {
            $pull: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id name")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            })
    },

    //get relavant article
    getArticleDetailsbyID: async (req, res) => {
        let id = req.params.id;
        Post.findById(id, function (err, post) {
            res.json(post);
        });
    },

    //update Article
    updateArticle: async (req, res) => {
        try {
            const { location, body, picture } = req.body;
            await Post.findOneAndUpdate({ _id: req.params.id }, { location, body, picture })
            res.json({ msg: "Update Article Successfull" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //delete relavant article
    deleteArticle: async (req, res) => {
        Post.findOne({ _id: req.params.postId })
            .populate('postedBy', '_id')
            .exec((err, post) => {
                if (err || !post) {
                    return res.status(422).json({ error: err })
                }
                else {
                    post.remove()
                        .then(result => {
                            res.json(result)
                        })
                }
            })
    },
}

module.exports = PostController
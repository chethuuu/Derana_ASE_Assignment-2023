const User = require('../Model/User.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {

    //Register User
    RegisterUser: async (req, res) => {
        const { name, email, password, userRole } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ error: 'Please Fill all the required fields' })
        }
        User.findOne({ email: email }).then(registeredUser => {
            if (registeredUser) {
                return res.status(422).json({ error: 'This User already exist!' })
            }

            //encrypt the password
            bcrypt.hash(password, 12).then(HashedPassword => {
                const user = new User({
                    name: name,
                    email: email,
                    userRole,
                    password: HashedPassword
                });

                user.save().then(user => {
                    res.json({ message: 'User Registered Sucessfully!' })
                }).catch(err => {
                    console.log(err)
                });
            }).catch(err => {
                console.log(err)
            });
        })
    },


    //Login User
    LoginUser: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: 'Please Fill the given Fileds!' })
        }
        User.findOne({ email: email }).then(registeredUser => {
            if (!registeredUser) {
                return res.status(422).json({ error: 'Invalid E-mail Address' })
            }
            bcrypt.compare(password, registeredUser.password).then(matchPassword => {
                //Compare Password with encrypted Password
                if (matchPassword) {
                    const token = jwt.sign({ _id: registeredUser._id }, process.env.JWT_SECRET_KEY)
                    const { _id, name, email, userRole } = registeredUser;
                    res.json({ token: token, user: { _id, name, email, userRole } })
                } else {
                    return res.status(400).json({ error: "Invalid E-mail or Password" })
                }
            }).catch(err => {
                console.log(err)
            });
        })
    }
}

module.exports = UserController
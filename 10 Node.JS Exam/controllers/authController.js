const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'examSecret';

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username: username.trim(), password, role});
        await user.save();
        res.redirect('/login');
    } catch (err) {
        const message = err.code === 409 ? 
        'This username is already taken.' : 
        'Something Went Wrong';

        res.status(400).render('register', { error: message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).render('login', { error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role },
            JWT_SECRET, { expiresIn: '2h' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000
        });
        res.redirect('/products');
    } catch (err) {
        res.status(500).render('login', { error: 'Login failed. Please try again.' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

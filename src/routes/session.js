import { Router } from "express";
import { UserManager } from "../classes/UserManager.js";
import { generateHash, validateHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { authenticateJWT } from "../middlewares/auth.js";

export const router = Router();

router.post('/register', async (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if (!req.body) return res.status(400).json({ message: 'No data provided' });
    if (!Object.keys(req.body).every(key => ['name', 'last_name', 'email', 'password', 'age', 'role'].includes(key))) return res.status(400).json({ message: 'Invalid fields provided' });

    let { name, last_name, email, password, age, role } = req.body;

    if (!name || !last_name || !email || !password) return res.status(400).json({ message: 'Missing required fields' });

    password = generateHash(password);

    try {
        const exist = await UserManager.getUser({ email });
        if (exist.length > 0) return res.status(400).json({ message: `User with email ${email} already exists` });

        let newUser = await UserManager.createUser({
            first_name: name,
            last_name,
            email,
            password,
            age: age || null,
            role: role || 'user'
        });

        newUser = newUser.toJSON();

        delete newUser.password;
        return res.status(201).json({ message: 'Register successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering a user', error: error.message });
    }

});

router.post('/login', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) return res.status(400).json({ message: 'No data provided' });
    if (!Object.keys(req.body).every(key => ['email', 'password'].includes(key))) return res.status(400).json({ message: 'Invalid fields provided' });

    let { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Missing required fields' });

    try {
        const user = await UserManager.getUser({ email });
        if (user.length === 0) return res.status(401).json({ message: `Invalid credentials` });

        if (!validateHash(password, user[0].password)) return res.status(401).json({ message: `Invalid credentials` });

        const userToToken = { ...(typeof user[0].toJSON === 'function' ? user[0].toJSON() : user[0]) };
        delete userToToken.password;

        const token = generateToken(userToToken);

        return res.status(200).json({ message: 'Login successfully', user: userToToken, token });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err.message });
        }
        return res.status(200).json({ message: 'Logout successfully' });
    });
});

router.get('/current', authenticateJWT, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const userObj = (req.user && typeof req.user.toJSON === 'function') ? req.user.toJSON() : req.user;
    const user = { ...userObj };
    delete user.password;
    return res.status(200).json({ user });
});

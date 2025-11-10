import passport from 'passport';

export const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
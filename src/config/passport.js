import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UserManager } from '../classes/UserManager.js';
import 'dotenv/config';

const JWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JWTStrategy(JWTOptions, async (jwt_payload, done) => {
    try {
        const user = await UserManager.getUser({ email: jwt_payload.email });

        if (user.length === 0) return done(null, false);

        return done(null, user[0]);
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;
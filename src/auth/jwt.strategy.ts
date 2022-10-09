import { jwtConstants } from './constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      usernameField: 'email',
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<any> {
    return { id: payload.sub, email: payload.email };
  }
}

/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      request.user = payload;
      return true;
    }
    catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

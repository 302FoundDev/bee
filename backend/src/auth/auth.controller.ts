/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login.dto';

@Controller('auth')
@ApiTags('🔐 auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login as an existing user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to login.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User login successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { email, password } = loginUserDto

      const user = await this.authService.login(email, password)

      if (!user) {
        throw new HttpException({ status: 'error', message: 'User not found' }, HttpStatus.NOT_FOUND)
      }

      return res.cookie('access_token', user.access_token, {
        httpOnly: true,
        maxAge: 7200000,
        secure: true,
        sameSite: 'strict',
      }).json({ status: 'success', message: 'User logged in successfully' })

    }

    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout as an existing user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to logout.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return res.status(200).json({
        status: 'success',
        message: 'User logged out successfully',
      });
    }

    catch (error) {
      console.error('Logout Error:', error.message);
      throw new HttpException(
        { status: 'error', message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


}

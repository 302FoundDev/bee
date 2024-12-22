/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Get, HttpException, HttpStatus, Req, UseGuards, Delete, Res, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto } from 'src/dto/users.dto'
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'

@Controller('users')
@ApiTags('👨‍💻 Users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User created successfully. Response contains user data.' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {

      const register = await this.userService.register(createUserDto)

      if (!register) throw new Error('Error creating user')

      return { status: 'success', message: 'User created successfully', data: register }
    }
    catch (error) {
      console.log(error, error.message)
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user data' })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async getUserData(@Req() request: any) {
    try {
      const sub: number = request.user.sub

      const userData = await this.userService.getUserData(sub)

      if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

      return { status: 'success', message: 'User retrieved successfully', user: userData }
    }
    catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Patch('update-profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user data' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User updated successfully. Response contains updated user data.' })
  async updateUser(@Req() req: any, @Body() data: UpdateUserDto) {
    try {
      const sub: number = req.user.sub

      const user = await this.userService.updateUser(sub, data)

      if (!user) {
        throw new HttpException({ status: 'error', message: 'User not found' }, HttpStatus.NOT_FOUND)
      }

      return { status: 'success', message: 'User updated successfully', data: user }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('delete-user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiQuery({ name: 'id', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to delete user.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  async deleteUser(@Req() req: any, @Res() res: any) {
    try {
      const sub: number = req.user.sub

      const user = await this.userService.deleteUser(sub)

      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' })
      }

      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'strict',
      });

      return res.status(200).json({
        status: 'success',
        message: 'User logged out successfully',
      });
    }

    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}

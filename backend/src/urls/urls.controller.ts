/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param, Res, UseGuards, Req, Delete } from '@nestjs/common'
import { UrlsService } from './urls.service'
import { UrlDto, SlugDeleteDto } from 'src/dto/urls.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'

@Controller('urls')
@ApiTags('🔗 URLs')
export class UrlsController {

  constructor(private readonly urlsService: UrlsService) { }

  @Post('create-slug')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Shorten URL' })
  @ApiBody({ type: UrlDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. SLUG not found.' })
  @ApiResponse({ status: 200, description: 'URL shortened successfully.' })
  async slug(@Body() urlDto: UrlDto, @Req() request: any) {
    try {
      const userId = request.user.sub

      const slug = await this.urlsService.slug(urlDto, userId)

      return { status: 'success', message: 'url shortened successfully', data: slug }
    }

    catch (error) {
      throw new Error(`Error shortening URL: ${error}`)
    }
  }

  @Delete('delete-slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete selected slug' })
  @ApiBody({ type: SlugDeleteDto })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. SLUG not found.' })
  @ApiResponse({ status: 200, description: 'URL deleted successfully.' })
  async deleteSlug(@Body() body: SlugDeleteDto, @Req() req) {
    try {
      const userId = req.user.sub

      const { slug } = body

      const deleteSlug = await this.urlsService.deleteSlug(slug, userId)

      return { status: 'success', message: 'url deleted successfully', data: deleteSlug }
    }

    catch (error) {
      throw new Error(`Error deleting URL: ${error}`)
    }
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Redirect slug to original' })
  @ApiQuery({ name: 'slug', type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 302, description: 'Redirect to the original URL.' })
  @ApiResponse({ status: 404, description: 'Not found. The slug does not exist.' })
  async redirectSlug(@Param('slug') slug: string, @Res() res) {
    try {
      const getUrl = await this.urlsService.redirectSlug(slug)

      return res.status(302).redirect(getUrl)
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }
  }

}

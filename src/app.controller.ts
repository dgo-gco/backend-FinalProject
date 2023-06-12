import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // GUARDS: The route handler will only be invoked if the user has been validated
  @Post('auth/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authToken = this.authService.login(req.user);
    console.log(authToken);
    res.cookie('jwt-auth', (await authToken).access_token, { httpOnly: true });
    return authToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(@UploadedFile() file: Express.Multer.File) {
    console.log('FILE: ', file);
  }
}

import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(@UploadedFile() file: Express.Multer.File) {
    console.log('FILE: ', file);
  }
}

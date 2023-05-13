import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // GUARDS: The route handler will only be invoked if the user has been validated
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log('here I am');
    return this.authService.login(req.user);
  }
}

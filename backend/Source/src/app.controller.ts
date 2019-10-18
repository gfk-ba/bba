/**
 * The app controller (listening for calls at /)
 */

/**
 * importing the Annotations from NestJS
 */
import { Get, Controller } from '@nestjs/common';

/**
 * This the controller of the app module, which is started from main.js
 */
@Controller()
export class AppController {
  /**
   * This is just a dummy call, to test whether the backend is running.
   * Use http://backend-server-name/test to call this.
   * @returns a welcome message
   */
  @Get('test')
  test(): string {
    return 'Welcome to the BBA backend';
  }
}

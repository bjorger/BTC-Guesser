import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  getAuthURL(): string {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
      /* YOUR_REDIRECT_URL */ 'urn:ietf:wg:oauth:2.0:oob',
    );

    const url = oauth2Client.generateAuthUrl();

    return url;
  }
}

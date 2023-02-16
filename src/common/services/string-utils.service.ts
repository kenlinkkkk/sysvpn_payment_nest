import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtils {
  static toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  static toLowerCase(str: string): string {
    return str.toLowerCase();
  }

  static splitString(str: string, splitMatch: string): string[] {
    return str.split(splitMatch);
  }
}

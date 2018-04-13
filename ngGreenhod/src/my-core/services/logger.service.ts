import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';

export const LOGGER_LEVEL = new InjectionToken<number>('LoggerLevel');

@Injectable()
export class LoggerService {
  private level: number;
  constructor(@Optional() @Inject(LOGGER_LEVEL) level: number) {
    if (level) {
      this.level = level;
    } else {
      this.level = 5;
    }
  }

  log(msg: string) {
    if (this.level > 3) {
      console.log(msg);
    }
  }

  info(msg: string) {
    if (this.level > 2) {
      if (console.info) {
        console.info(msg);
      } else {
        this.log(msg);
      }
    }
  }

  warn(msg: string) {
    if (this.level > 1) {
      console.warn(msg);
    }
  }

  error(msg: string) {
    if (this.level > 0) {
      console.error(msg);
    }
  }
}

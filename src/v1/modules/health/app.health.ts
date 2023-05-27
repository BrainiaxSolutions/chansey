import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class AppHealthIndicator extends HealthIndicator {
  async checkAppHealth(): Promise<HealthIndicatorResult> {
    const isAppHealthy = true; // Coloque aqui a lógica para verificar a saúde do seu aplicativo

    if (isAppHealthy) {
      return this.getStatus('app', true);
    } else {
      throw new HealthCheckError(
        'App is not healthy',
        this.getStatus('app', false),
      );
    }
  }
}

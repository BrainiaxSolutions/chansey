import { CoordinatesType } from './../../@types/Coordinates.d';
import * as NodeGeocoder from 'node-geocoder';
import { config } from '../config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Geocoding {
  geocoder: NodeGeocoder.Geocoder;

  constructor() {
    this.geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: config.providers.geocoder.key,
    });
  }

  async getCoordinates(query: NodeGeocoder.Query): Promise<CoordinatesType> {
    try {
      const res = await this.geocoder.geocode(query);

      if (res.length > 0) {
        const location = res[0];
        return {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      } else {
        throw new Error(
          'Error on GET - getCoordinates - Geocoding: address not found',
        );
      }
    } catch (error) {
      throw new Error(`Error on GET - getCoordinates - Geocoding: ${error}`);
    }
  }
}

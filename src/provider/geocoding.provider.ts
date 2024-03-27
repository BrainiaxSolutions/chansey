import { env } from "../config";
import { CoordinatesType } from "../@types/Coordinates";
import * as NodeGeocoder from "node-geocoder";

type GeocodingParametersType = {
	address: string;
	addressNumber: string;
	neighborhood: string;
	country?: string;
};

const geocoder = NodeGeocoder({
	provider: "google",
	apiKey: env.providers.geocoder.key,
});

export const geocodingProvider = {
	getCoordinates: async ({
		address,
		addressNumber,
		neighborhood,
		country = "Brazil",
	}: GeocodingParametersType): Promise<CoordinatesType> => {
		try {
			const query = {
				address: `${address}, ${addressNumber} - ${neighborhood}`,
				country,
			} as NodeGeocoder.Query;
			const response = await geocoder.geocode(query);
			if (response.length > 0) {
				const location = response[0];
				return {
					latitude: location.latitude,
					longitude: location.longitude,
				};
			}
			return {
        latitude: -0,
        longitude: -0,
      };
		} catch (error) {
			throw new Error(`Error on GET - getCoordinates - Geocoding: ${error}`);
		}
	},
};

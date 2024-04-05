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
	provider: env.providers.google.geocoder.name,
	apiKey: env.providers.google.geocoder.key,
});

export const googleProvider = {
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
				return {
					latitude: response[0].latitude || 0,
					longitude: response[0].longitude || 0,
				};
			}
			return {
				latitude: 0,
				longitude: 0,
			};
		} catch (error) {
			throw new Error(
				`Error Google API on GET - getCoordinates - Geocoding: ${error}`,
			);
		}
	},
};

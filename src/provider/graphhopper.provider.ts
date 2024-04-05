import { env } from "../config";
import { CoordinatesType } from "../@types/Coordinates";
import axios from "axios";

type GeocodingParametersType = {
	address: string;
	addressNumber: string;
	neighborhood: string;
	country?: string;
};

export const graphhopperProvider = {
	getCoordinates: async ({
		address,
		addressNumber,
		neighborhood,
	}: GeocodingParametersType): Promise<CoordinatesType> => {
		try {
			const params = {
				q: `${address}, ${addressNumber} - ${neighborhood}`,
				key: env.providers.graphhopper.geocoder.key,
			};

			const { data } = await axios.get(env.providers.graphhopper.geocoder.url, {
				params,
			});

			if (data.hits.length) {
				return {
					latitude: data.hits[0].point.lat || 0,
					longitude: data.hits[0].point.lng || 0,
				};
			}
			return {
				latitude: 0,
				longitude: 0,
			};
		} catch (error) {
			throw new Error(`Error on GET - getCoordinates - Geocoding: ${error}`);
		}
	},
};

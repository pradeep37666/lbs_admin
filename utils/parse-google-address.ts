export type ParsedAddressComponents = {
	suburb?: string
	state?: string
	streetName?: string
	streetNumber?: string
	country?: string
	postcode?: string
	fullAddress?: string
	city?: string
	googlePlaceId?: string
	lat?: number
	lng?: number
}

const parseGoogleAddress = (geoResult: google.maps.GeocoderResult): ParsedAddressComponents => {
	const addressComponents = geoResult.address_components
	const location = geoResult.geometry.location
	const googlePlaceId = geoResult.place_id

	const subPremiseObj = addressComponents.find((obj) => obj.types.includes('subpremise'))
	const subPremise = subPremiseObj?.long_name
	const streetNumberObj = addressComponents.find((obj) => obj.types.includes('street_number'))
	let streetNumber = streetNumberObj?.long_name
	if (subPremise) {
		streetNumber = `${subPremise}/${streetNumber}`
	}
	const streetNameObj = addressComponents.find((obj) => obj.types.includes('route'))
	const streetName = streetNameObj?.short_name
	const suburbObj = addressComponents.find((obj) => obj.types.includes('locality'))
	const suburb = suburbObj?.long_name
	const stateObj = addressComponents.find((obj) => obj.types.includes('administrative_area_level_1'))
	const state = stateObj?.long_name
	const cityObj = addressComponents.find((obj) => obj.types.includes('administrative_area_level_2'))
	const city = cityObj?.long_name
	const countryObj = addressComponents.find((obj) => obj.types.includes('country'))
	const country = countryObj?.long_name
	const postcodeObj = addressComponents.find((obj) => obj.types.includes('postal_code'))
	const postcode = postcodeObj?.long_name
	const presentValues = [streetNumber, streetName, suburb, state, country, postcode].filter((value) => value !== undefined)
	const fullAddress = presentValues.join(' ')

	return {
		streetNumber,
		streetName,
		suburb,
		state,
		city,
		country,
		postcode,
		fullAddress,
		googlePlaceId,
		lat: location.lat(),
		lng: location.lng(),
	}
}
export default parseGoogleAddress

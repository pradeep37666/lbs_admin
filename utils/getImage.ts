const getImage = (imageKey: string) => {
	// return process.env.NEXT_PUBLIC_BASE_URL + `file-uploads?key=${imageKey}`
	return 'https://dev.littlebigsocial.com/' + `file-uploads?key=${imageKey}`
}

export default getImage

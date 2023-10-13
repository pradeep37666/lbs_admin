import Instance from "./axios"
import compressImage from "./compressImage"

export const FileService = {
    uploadSingleImage: async (file:any) => {
        try {
            const compressed_file = await compressImage(file)
            const formData = new FormData()
            formData.append("file", compressed_file)
            const { data, status } = await Instance.post('/file-uploads/single', formData) 
            if (status === 201) return data
        } catch (error) {
            console.log(error)
        }
    }}

import Instance from "./axios"

export const FileService = {
    uploadSingleImage: async (file:any) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data, status } = await Instance.post('/file-uploads/single', formData) 
            if (status === 201) return data
        } catch (error) {
            console.log(error)
        }
    }}

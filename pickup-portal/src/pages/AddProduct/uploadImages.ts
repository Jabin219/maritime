import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

const s3 = new AWS.S3({
	accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET,
	region: process.env.REACT_APP_S3_REGION
})
export const uploadImages = async (images: any[]) => {
	const imageFiles: any = images.map(image => image.file)
	const uploadedFiles: any[] = imageFiles.map((imageFile: any) => {
		const fileType = imageFile.name.substring(
			imageFile.name.lastIndexOf('.') + 1
		)
		const fileName = `${uuidv4()}.${fileType}`
		return {
			file: imageFile,
			fileName,
			fileUrl: `https://maritime-household-media.s3.ca-central-1.amazonaws.com/${fileName}`
		}
	})
	await Promise.all(
		uploadedFiles.map(async (uploadedFile: any) => {
			const params: any = {
				Bucket: process.env.REACT_APP_S3_BUCKET as string,
				ACL: 'public-read',
				Key: uploadedFile.fileName,
				Body: uploadedFile.file
			}
			s3.upload(params, (err: any, data: any) => {
				if (err) {
					throw err
				}
				console.log(`File uploaded successfully. ${data.Location}`)
			})
		})
	)
	return uploadedFiles
}

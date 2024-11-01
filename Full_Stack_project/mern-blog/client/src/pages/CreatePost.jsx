import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';




export default function CreatePost() {

	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(0);
	const [imageUploadError, setImageUploadError] = useState(null);
	const [formData, setFormData] = useState({})

	const handleUploadImage = async () => {

		try {

			if (!file) {
				return;
			}

			setImageUploadError(null);

			const storage = getStorage(app); // Create a storage reference
			const fileName = new Date().getTime() + '-' + file.name; // Generate a unique file name
			const storageRef = ref(storage, fileName); // Create a reference to the file to upload
			const uploadTask = uploadBytesResumable(storageRef, file); // Upload the file

			uploadTask.on( // Listen for state changes, errors, and completion of the upload
				'state_changed', 
				(snapshot) => { //	Snapshot of the upload
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calculate the percentage of upload completed
					setImageUploadProgress(progress.toFixed(0)); // Update the progress state
				},
				(error) => { // Handle errors
					setImageUploadError('Error while uploading image'); // Set the error state
					setImageUploadProgress(null); // Reset the progress state
				},
				() => { // Handle successful uploads on complete
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { // Get the download URL for the uploaded image
						setImageUploadProgress(null);	// Reset the progress state
						setImageUploadError(null); // Reset the error state
						setFile(null); // Reset the file state
						setFormData({ ...formData, image: downloadURL }); // Set the image URL in the form data
						console.log('File available at',downloadURL);
					});
				}
			);

		} catch (error) {
			setImageUploadError('Error while uploading image');
			setImageUploadProgress(null);
			console.log(error);
		}
		
	}

  return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-center text-3xl my-7 font-semibold">
				Create a Post
			</h1>
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 sm:flex-row justify-between">
					<TextInput
						type="text"
						id="title"
						required
						placeholder="Title"
						className="flex-1"
					/>

					<Select>
						<option value="uncategorized">Select a category</option>
						<option value="javascript">JavaScript</option>
						<option value="reactjs">React.js</option>
						<option value="nextjs">Next.js</option>
					</Select>
				</div>
				<div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
					<FileInput
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						type="button"
						gradientDuoTone={"purpleToBlue"}
						size={"sm"}
						outline
						onClick={handleUploadImage}
					>
						{" "}
						Upload Image{" "}
					</Button>
				</div>
				<ReactQuill theme="snow" className="h-72 mb-[4rem] sm:mb-12" required />
				<Button type="submit" gradientDuoTone="purpleToPink">
					Publish
				</Button>
			</form>
		</div>
  );
}
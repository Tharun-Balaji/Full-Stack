import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";

function DashProfile() {

  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
	const filePickerRef = useRef();
	const [imageFileUploading, setImageFileUploading] = useState(false);
	const [userUpdateSuccessful, setUserUpdateSuccessful] = useState(null);
	const [userUpdateError, setUserUpdateError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
	const [imageFileUploadError, setImageFileUploadError] = useState(null);
	const [formData, setFormData] = useState({})

	const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
	};
	
	const handleChange = (e) => { 
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

  useEffect(() => {
    if (imageFile) { 
      uploadImage();
    }
  }, [imageFile]);
  
  const uploadImage = async () => {

		setImageFileUploading(true);
    setImageFileUploadError(null);
		const storage = getStorage(app);
		const fileName = new Date().getTime() + imageFile.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setImageFileUploadProgress(progress.toFixed(0));
			},
			(error) => {
				setImageFileUploadError(
					"Error while uploading image (File size must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
				setImageFileUrl(null);
				setImageFileUploading(false);
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageFileUrl(downloadURL);
					setFormData({
						...formData, profilePicture: downloadURL
					})
					setImageFileUploading(false);
        });
        setImageFileUploadProgress(null);
			}
		);
  };

	const handleSubmit = async (e) => { 
		e.preventDefault();

		setUserUpdateError(null);
		setUserUpdateSuccessful(null);

		//check if form data is empty
		if (Object.keys(formData).length === 0) {
			setUserUpdateError("No data to update");
			return;
		}	

		if (imageFileUploading) {
			setUserUpdateError("Image uploading in progress");
			return;
		}
		
		try {
			
			dispatch(updateStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) { 
				dispatch(updateFailure(data.message));
				setUserUpdateError(data.message);
				return;
			} else {
				dispatch(updateSuccess(data));
				setUserUpdateSuccessful("Profile updated successfully");
				setFormData({});
			}

		} catch (error) {
			dispatch(updateFailure(error.message));
			setUserUpdateError(error.message);
			console.log(error);
		}

	};

  

  return (
		<div className="max-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					ref={filePickerRef}
					hidden
				/>
				<div
					className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
					onClick={() => filePickerRef.current.click()}
				>
					{imageFileUploadProgress && (
						<CircularProgressbar
							value={imageFileUploadProgress}
							text={`${imageFileUploadProgress}%`}
							strokeWidth={5}
							styles={{
								root: {
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 0,
									left: 0,
								},
								path: {
									stroke: `rgba(62, 152, 199, ${
										imageFileUploadProgress / 100
									})`,
								},
							}}
						/>
					)}
					<img
						src={imageFileUrl ?? currentUser.profilePicture}
						alt="user"
						className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
					/>
				</div>
				{imageFileUploadError && (
					<Alert color="failure">{imageFileUploadError}</Alert>
				)}
				<TextInput
					type="text"
					id="username"
					placeholder="username"
					defaultValue={currentUser.username}
					onChange={handleChange}
				/>
				<TextInput
					type="email"
					id="email"
					placeholder="email"
					defaultValue={currentUser.email}
					onChange={handleChange}
				/>
				<TextInput
					type="password"
					id="password"
					placeholder="password"
					onChange={handleChange}
				/>
				<Button type="submit" gradientDuoTone="purpleToBlue" outline>
					Update
				</Button>
			</form>
			<div className="text-red-500 flex justify-between mt-5">
				<span className="cursor-pointer">Delete Account</span>
				<span className="cursor-pointer">Sign Out</span>
			</div>
			{userUpdateSuccessful && (
				<Alert color="success" className="mt-5">
					{userUpdateSuccessful}
				</Alert>
			)}
			{userUpdateError && (
				<Alert color="failure" className="mt-5">
					{userUpdateError}
				</Alert>
			)}
		</div>
  );
}

export default DashProfile;
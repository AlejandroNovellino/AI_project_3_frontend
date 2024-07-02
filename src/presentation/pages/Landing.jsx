// react imports
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// react player
import ReactPlayer from "react-player/lazy";
// user form
import { useForm } from "react-hook-form";
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
import MyAlert from "../components/MyAlert";
// redux exports
import {
	useDeleteBackgroundFromUrlMutation,
	useDeleteBackgroundFromFileMutation,
} from "../../application/api/apiSlice";
// loaders
import { squircle } from "ldrs";
// import image
import imagebg from "./../images/man-no-bg.png";
import image1 from "./../images/file.png";
import image2 from "./../images/click.png";
import image3 from "./../images/magic.png";
import image4 from "./../images/download.png";

//
squircle.register();

function Landing() {
	// form hook
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			videoFile: null,
			videoUrl: null,
		},
	});
	// redux
	// from file
	const [
		deleteFileBackground,
		{
			data: videoFileData,
			isLoading: isLoadingVideoFile,
			isError: isErrorVideoFile,
			//isSuccess: isSuccessVideoFile,
		},
	] = useDeleteBackgroundFromFileMutation();
	// from url
	const [
		deleteUrlBackground,
		{
			data: videoUrlData,
			isLoading: isLoadingVideoUrl,
			isError: isErrorVideoUrl,
		},
	] = useDeleteBackgroundFromUrlMutation();
	// state for alert
	const [showAlert, setShowAlert] = useState(false);
	// error message
	let [errorMessage, setErrorMessage] = useState("Oh no something happened");

	// user inputs
	const videoFile = watch("videoFile");
	const videoUrl = watch("videoUrl");

	// login helper, onsubmit function
	const onSubmitDeleteBackground = async () => {
		if (!videoFile && !videoUrl) {
			// print the error
			console.error("Please select something to upload");
			setErrorMessage("Please select something to upload");
			setShowAlert(true);
			return;
		}

		if (!isLoadingVideoFile || isLoadingVideoUrl) {
			try {
				// verify if the video is a file or a url
				if (videoFile) {
					// video is from file
					// use the kook to
					await deleteFileBackground(videoFile[0]).unwrap();
				} else if (videoUrl) {
					// video is from url
					// use the kook to
					await deleteUrlBackground(videoUrl).unwrap();
				}
				// set error to false
				setShowAlert(false);
			} catch (err) {
				// print the error
				console.error("Could not delete background: ", err);
				setShowAlert(true);
			}
		}
	};

	// container design
	let container_design = !videoFile && !videoUrl ? "min-vh-100" : "v-100";

	// print video info
	console.log(`🚀 ~ Landing ~ videoFileData:`, videoFileData);
	console.log(`🚀 ~ Landing ~ videoUrlData:`, videoUrlData);
	console.log(videoFileData?.output_url || videoUrlData?.output_url);

	return (
		<Container fluid className={`${container_design} px-4`}>
			<MyNavbar />
			<Container fluid className="pb-5">
				<Row>
					<div className="d-flex justify-content-center align-items-center mb-3">
						<div className="col-md-6">
							<div className="ms-5">
								<h1
									className="mb-4"
									style={{
										fontFamily: "Arial, sans-serif",
										fontWeight: "bold",
										color: "#C39A06",
										fontSize: "65px",
									}}>
									Video Background Remover
								</h1>
								<h5 style={{ paddingRight: "55px" }}>
									Easily swap out your video's background with just one click,
									converting it into a green screen so you can edit your video
									with any background you desire!
								</h5>
								<button
									onClick={() => {
										document
											.getElementById("uploadRow")
											.scrollIntoView({ behavior: "smooth" });
									}}
									className="btn btn-primary btn-custom">
									Get started with your video
								</button>
							</div>
						</div>
						<div className="col-md-6 d-flex justify-content-center">
							<img
								src={imagebg}
								width="90%"
								height="auto"
								className="image-shadow-custom"
								alt="Description of algorithm"
							/>
						</div>
					</div>
				</Row>

				<Row
					className="align-items-center"
					style={{
						padding: "80px",
						backgroundColor: "#2A2A2A",
						marginTop: "60px",
						marginBottom: "60px",
					}}>
					<h2 className="mb-5" style={{ fontWeight: "bold" }}>
						HOW IT WORKS
					</h2>
					<Col xs={12} md={3} className="text-center mb-4">
						<img src={image1} alt="Step 1" width="110" />
						<p className="fs-5" style={{ marginTop: "30px" }}>
							1. Upload the video you want to edit
						</p>
					</Col>
					<Col xs={12} md={3} className="text-center mb-4">
						<img src={image2} alt="Step 2" width="110" />
						<p className="fs-5" style={{ marginTop: "30px" }}>
							2. Click on "Delete background"
						</p>
					</Col>
					<Col xs={12} md={3} className="text-center mb-4">
						<img src={image3} alt="Step 3" width="110" />
						<p className="fs-5" style={{ marginTop: "30px" }}>
							3. Wait for the magic to happen
						</p>
					</Col>
					<Col xs={12} md={3} className="text-center mb-4">
						<img src={image4} alt="Step 4" width="110" />
						<p className="fs-5" style={{ marginTop: "30px" }}>
							4. Download your background removed video
						</p>
					</Col>
				</Row>

				<Row id="uploadRow">
					<p
						className="fs-1 d-flex justify-content-center align-items-center"
						style={{ marginBottom: "40px", fontWeight: "bold" }}>
						Remove Your Video Background
					</p>
				</Row>
				<Row>
					<p className="fs-3" style={{ marginBottom: "40px" }}>
						Upload a video from your files
					</p>
				</Row>
				<Row
					className="justify-content-md-center"
					style={{ marginBottom: "90px" }}>
					<Col xs={6}>
						<Card className="card-custom tw-backdrop-blur-sm card-shadow-custom">
							<Card.Body>
								<Card.Title className="text-center">
									Your uploaded video
								</Card.Title>
								<Container className="mb-3 rounded-5">
									{(videoFile || videoUrl) &&
										videoFile[0] &&
										(videoFile[0].type === "image/gif" ? (
											<img
												src={URL.createObjectURL(videoFile[0])}
												alt="GIF"
												className="rounded"
												style={{ width: "100%", height: "100%" }}
											/>
										) : (
											<ReactPlayer
												className="rounded"
												width="100%"
												height="100%"
												controls={true}
												loop={true}
												url={
													videoUrl ||
													(videoFile && URL.createObjectURL(videoFile[0]))
												}
											/>
										))}
								</Container>
								<Container>
									<Form onSubmit={handleSubmit(onSubmitDeleteBackground)}>
										<Form.Group className="mb-3" controlId="videoFile">
											<Form.Control
												{...register("videoFile")}
												type="file"
												placeholder="Enter your video"
												isInvalid={errors.videoFile?.message}
												isValid={
													!Object.hasOwn(errors, "videoFile") &&
													videoFile !== null
												}
												name="videoFile"
											/>
											<Form.Control.Feedback type="invalid">
												{errors.video?.message}
											</Form.Control.Feedback>
										</Form.Group>

										<div className="d-grid gap-2 my-3">
											<Button type="submit" className="button-custom">
												<span className="bold-text">Delete background</span>
											</Button>
										</div>
									</Form>
									<Row>
										<Col xs={12}>
											{showAlert && (
												<MyAlert
													headingMessage={"Oh no!"}
													message={errorMessage}
													setShow={setShowAlert}
												/>
											)}
										</Col>
									</Row>
								</Container>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={6}>
						<Card className="card-custom tw-backdrop-blur-sm card-shadow-custom">
							<Card.Body>
								<Card.Title className="text-center">
									Your modified video
								</Card.Title>
								<Container className="mb-3 rounded-5">
									<Row className="justify-content-md-center">
										{!isLoadingVideoFile &&
											!isErrorVideoFile &&
											!isLoadingVideoUrl &&
											!isErrorVideoUrl && (
												<Col xs={12}>
													{videoFileData?.output_url?.endsWith(".gif") ? (
														<img
															src={videoFileData?.output_url}
															alt="GIF"
															className="rounded"
															style={{ width: "100%", height: "100%" }}
														/>
													) : (
														<ReactPlayer
															className="rounded"
															width="100%"
															height="100%"
															controls={true}
															loop={true}
															url={
																videoFileData?.output_url ||
																videoUrlData?.output_url
															}
														/>
													)}
													{(videoFileData?.output_url ||
														videoUrlData?.output_url) && (
														<div className="d-grid gap-2 my-3">
															<Button
																variant="primary"
																href={
																	videoFileData?.output_url ||
																	videoUrlData?.output_url
																}
																download
																className="mt-5 bold-button">
																Download
															</Button>
														</div>
													)}
												</Col>
											)}
										{(isLoadingVideoFile || isLoadingVideoUrl) && (
											<Col xs={2} className="mt-4">
												<l-squircle
													size="60"
													stroke="7"
													stroke-length="0.15"
													bg-opacity="0.15"
													speed="01"
													color="white"></l-squircle>
											</Col>
										)}
										{isErrorVideoFile && (
											<Col xs={8}>
												<p className="h4">
													Something bad happened in our end :c
												</p>
											</Col>
										)}
									</Row>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default Landing;

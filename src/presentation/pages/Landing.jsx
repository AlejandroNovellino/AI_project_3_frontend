// react imports
//import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// react three
import Companion from "../components/Companion";
// react audio player
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// react audio recorder
import { AudioRecorder } from "react-audio-voice-recorder";
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
// redux exports
import { useTalkToAtomMutation } from "../../application/api/apiSlice";
// loaders
import { quantum } from "ldrs";

quantum.register();

function Landing() {
	// redux
	const [
		talkToMorganAI,
		{
			data: response,
			isLoading: isLoadingResponse,
			//isError: isErrorResponse,
			//isSuccess: isSuccessResponse,
		},
	] = useTalkToAtomMutation();

	// onsubmit function
	const submitMessageToMorgan = async audio => {
		console.log(`🚀 ~ onSubmitMessageToMorgan ~ audio:`, audio);

		if (!audio) {
			// print the error
			console.error("Please upload something");
			//setErrorMessage("Please upload something");
			//setShowAlert(true);
			return;
		}

		if (!isLoadingResponse) {
			try {
				// use the redux hook
				await talkToMorganAI(audio).unwrap();
			} catch (err) {
				// print the error
				console.error("Could not talk to the AI: ", err);
			}
		}
	};

	const handleSubmit = async blob => {
		console.log(`🚀 ~ handleSubmit ~ blob:`, blob);
		await submitMessageToMorgan(blob);
	};

	// print to see the response
	console.log(`🚀 ~ onMain ~ response:`, response);

	return (
		<Container fluid className={"vh-100"}>
			<MyNavbar />
			<Container fluid>
				<Row className="justify-content-center vh-20">
					<Col></Col>
				</Row>
				<Row className="justify-content-center">
					<Col>
						<Card className="card-companion neon-border">
							<Card.Body className="p-0">
								<Companion
									speed={isLoadingResponse ? 25 : 5}
									floatIntensity={5}
									rotationIntensity={1}
									isLoading={isLoadingResponse}
									eyeColor={isLoadingResponse ? [40, 0.8, 50] : [3, 0.5, 3]}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row className="justify-content-center py-5">
					{!isLoadingResponse && (
						<Col xs={12}>
							<AudioRecorder
								onRecordingComplete={handleSubmit}
								showVisualizer={true}
							/>
						</Col>
					)}

					{isLoadingResponse && (
						<Col xs={2}>
							<l-quantum
								className="d-block m-auto"
								size="45"
								speed="1.75"
								color="#00f0ff"></l-quantum>
						</Col>
					)}

					{response && !isLoadingResponse && (
						<Col xs={12}>
							<AudioPlayer
								className="bg-secondary-subtle"
								autoPlay={true}
								src={response?.speech_url}
								onPlay={e => console.log("onPlay")}
							/>
						</Col>
					)}
				</Row>
			</Container>
		</Container>
	);
}

export default Landing;

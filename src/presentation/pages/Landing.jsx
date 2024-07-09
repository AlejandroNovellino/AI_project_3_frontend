// react imports
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
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
	// state for messages
	const [textResponses, setTextResponses] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [show, setShow] = useState(false);
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
				let ai_response = await talkToMorganAI(audio).unwrap();
				console.log(`🚀 ~ submitMessageToMorgan ~ ai_response:`, ai_response);

				// when the result is ok save the text to display
				setTextResponses([
					...textResponses,
					{
						user: ai_response?.input_text,
						ai: ai_response?.response_text,
					},
				]);
			} catch (err) {
				// print the error
				console.error("Could not talk to the AI: ", err);
			}
		}
	};

	const handleSubmit = async blob => {
		await submitMessageToMorgan(blob);
	};

	// print to see the response
	console.log(`🚀 ~ onMain ~ response:`, response);
	console.log(`🚀 ~ onMain ~ textResponses:`, textResponses);
	console.log(`🚀 ~ onMain ~ isPlaying:`, isPlaying);

	return (
		<Container fluid className={"vh-100"}>
			<MyNavbar handleShow={setShow} />

			<Modal
				className="bg-secondary-subtle"
				show={show}
				fullscreen={true}
				onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Messages in the conversation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{textResponses.map((textResponse, index) => {
						return (
							<div key={index}>
								<Alert variant="light">{`You: ${textResponse.user}`}</Alert>
								<Alert variant="info">{`Atom: ${textResponse.ai}`}</Alert>
							</div>
						);
					})}
				</Modal.Body>
			</Modal>

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
									isPlaying={isPlaying}
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
								onPlay={e => setIsPlaying(true)}
								onEnded={e => setIsPlaying(false)}
								onPause={e => setIsPlaying(false)}
							/>
						</Col>
					)}
				</Row>
			</Container>
		</Container>
	);
}

export default Landing;

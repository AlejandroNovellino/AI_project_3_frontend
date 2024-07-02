// react bootstrap imports
import Alert from "react-bootstrap/Alert";

function MyAlert({ headingMessage, message, setShow }) {
	return (
		<Alert variant="danger" onClose={() => setShow(false)} dismissible>
			<Alert.Heading>{headingMessage}</Alert.Heading>
			<p>{message}</p>
		</Alert>
	);
}

export default MyAlert;

// react bootstrap imports
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

// import image
import logo from "./../images/logo192.png";

function MyNavbar() {
	return (
		<>
			<Navbar
				bg="dark"
				data-bs-theme="dark"
				className="bg-secondary-subtle mb-3">
				<Container>
					<Navbar.Brand className="pt-2 d-flex align-items-center">
						<div className="me-auto">
							<img
								alt=""
								src={logo}
								width="40"
								height="40"
								className="d-inline-block align-top"
							/>
						</div>
						<div>
							<h1 className="ms-3">TutorAI</h1>
						</div>
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavbar;

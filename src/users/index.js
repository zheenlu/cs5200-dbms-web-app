import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";

function Project() {
	return (
		<div className="container-fluid pt-3">
			<div className="row">
				<div className="col-2">
					<Nav />
				</div>
				<div className="col-10">
					<Routes>
						<Route
							path="/account"
							element={<Account />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default Project;

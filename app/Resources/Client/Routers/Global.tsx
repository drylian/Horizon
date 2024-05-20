import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Introduction } from "../Pages/Introduction";
import { Starting } from "../Pages/Starting";
import { Database } from "../Pages/Database";
import { Finish } from "../Pages/Finish";

export default function GlobalRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route path='' element={<Introduction />} />
					<Route path='starting' element={<Starting />} />
					<Route path='database' element={<Database />} />
					<Route path='finish' element={<Finish />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

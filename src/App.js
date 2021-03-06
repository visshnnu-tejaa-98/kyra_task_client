import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddPost from './components/AddPost';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import Login from './components/Login';

function App() {
	return (
		<BrowserRouter className='App'>
			<Navbar />
			<Routes>
				<Route path='/' exact element={<AddPost />} />
				<Route path='/edit/:id' element={<EditPost />} />
				<Route path='/posts' exact element={<Posts />} />
				<Route path='/login' exact element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

import { useNavigate } from 'react-router-dom';
const Navbar = () => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};
	return (
		<nav class='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container'>
				<a class='navbar-brand' href='#'>
					<strong>My App</strong>
				</a>
				<button
					class='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>

				<div class='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul class='navbar-nav mr-auto'>
						<li class='nav-item active'></li>
					</ul>
					{localStorage.getItem('token') ? (
						<button class='btn btn-outline-secondary my-2 my-sm-0' type='button' onClick={logout}>
							Logout
						</button>
					) : (
						<button
							class='btn btn-outline-secondary my-2 my-sm-0'
							type='button'
							onClick={() => navigate('/login')}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

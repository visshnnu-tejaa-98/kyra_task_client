import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../endpoints';

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' });
	const [msg, setMsg] = useState('');
	const navigate = useNavigate();
	const login = async (e) => {
		e.preventDefault();
		if (data.email && data.password) {
			const req = await fetch(`${BACKEND_URL}/api/v1/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const res = await req.json();
			console.log(res);
			if (res.status) {
				localStorage.setItem('token', res.token);
				navigate('/posts');
			}
		} else {
			setMsg('Fields should not be empty');
		}
	};
	return (
		<div className='container my-5 '>
			<div className='d-flex justify-content-center'>
				<div className='card p-4 login-card'>
					<form onSubmit={login}>
						<h2 className='d-flex justify-content-center'>Login</h2>

						<div className='form-group'>
							<label for='name'>Email</label>
							<input
								type='text'
								className='form-control'
								id='email'
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
						</div>

						<div className='form-group'>
							<label for='password'>Password</label>
							<input
								type='password'
								className='form-control'
								id='password'
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
							/>
						</div>

						{msg && <span className='text-danger'>{msg}*</span>}
						<div className='d-flex justify-content-center mt-3'>
							<button type='submit' className='btn btn-primary'>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

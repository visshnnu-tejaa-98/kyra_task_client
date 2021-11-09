import { useState } from 'react';
import File from 'react-file-base64';
import Select from 'react-select';
import { BACKEND_URL } from '../endpoints';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		description: '',
		gender: '',
		intrests: [],
		profileImg: '',
	});
	const [msg, setMsg] = useState('');
	const navigate = useNavigate();
	const intrestsArray = [
		{
			value: 'sports',
			label: 'Sports',
		},
		{
			value: 'technology',
			label: 'Technology',
		},
		{
			value: 'news',
			label: 'News',
		},
		{
			value: 'music',
			label: 'Music',
		},
		{
			value: 'movies',
			label: 'Movies',
		},
	];
	const addPost = async (e) => {
		e.preventDefault();
		if (
			data.name &&
			data.email &&
			data.password &&
			data.confirmPassword &&
			data.description &&
			data.gender &&
			data.intrests &&
			data.profileImg
		) {
			if (!data.email.includes('@')) {
				setMsg('Invalid email specified');
			}
			if (data.password !== data.confirmPassword) {
				setMsg('Passwords need to be match');
			}
			const req = await fetch(`${BACKEND_URL}/api/v1/user`, {
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

	const addIntrests = (e) => {
		setData({ ...data, intrests: Array.isArray(e) ? e.map((x) => x.value) : [] });
	};
	return (
		<div className='container my-5'>
			<div className='card p-4 card-width'>
				<form onSubmit={addPost}>
					<h2 className='d-flex justify-content-center'>Add Post</h2>
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<div className='form-group'>
								<label for='name'>Name</label>
								<input
									type='text'
									className='form-control'
									id='name'
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
								/>
							</div>
						</div>
						<div className='col-md-6 col-sm-12'>
							<div className='form-group'>
								<label for='email'>Email</label>
								<input
									type='email'
									className='form-control'
									id='email'
									value={data.email}
									onChange={(e) => setData({ ...data, email: e.target.value })}
								/>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-sm-12 col-md-6'>
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
						</div>
						<div className='col-sm-12 col-md-6'>
							<div className='form-group'>
								<label for='conformPassword'>Confirm Password</label>
								<input
									type='password'
									className='form-control'
									id='conformPassword'
									value={data.confirmPassword}
									onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
								/>
							</div>
						</div>
					</div>

					<div className='form-group'>
						<label for='description'>Description</label>
						<textarea
							className='form-control'
							id='description'
							value={data.description}
							onChange={(e) => setData({ ...data, description: e.target.value })}
						></textarea>
					</div>

					<div>
						<p>Gender</p>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='gender'
								id='male'
								value='male'
								onChange={(e) => setData({ ...data, gender: 'male' })}
							/>
							<label className='form-check-label' for='exampleRadios1'>
								Male
							</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='gender'
								id='female'
								value='female'
								onChange={(e) => setData({ ...data, gender: 'female' })}
							/>
							<label className='form-check-label' for='exampleRadios2'>
								Female
							</label>
						</div>
						<br />
					</div>

					<div className='form-group'>
						<label for='intrests'>Intrests</label>
						<Select isMulti options={intrestsArray} onChange={addIntrests}></Select>
					</div>
					<div className='pb-3'>
						<File
							type='file'
							multiple={false}
							onDone={({ base64 }) => setData({ ...data, profileImg: base64 })}
						/>
					</div>
					{msg && <span className='text-danger'>{msg}*</span>}
					<div className='d-flex justify-content-center'>
						<button type='submit' className='btn btn-primary '>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPost;

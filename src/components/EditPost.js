import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { BACKEND_URL } from '../endpoints';
import File from 'react-file-base64';

const EditPost = () => {
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
	const editPost = async (e) => {
		e.preventDefault();
		if (data.name && data.description && data.gender && data.intrests && data.profileImg) {
			const req = await fetch(
				`${BACKEND_URL}/api/v1/user/${window.location.pathname.split('/')[2]}`,
				{
					method: 'PUT',
					headers: {
						authorization: localStorage.getItem('token'),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const res = await req.json();
			console.log(res);
			navigate('/posts');
		} else {
			setMsg('Fields should not be empty');
		}
	};
	const addIntrests = (e) => {
		setData({ ...data, intrests: Array.isArray(e) ? e.map((x) => x.value) : [] });
	};
	const getPost = async () => {
		let req = await fetch(`${BACKEND_URL}/api/v1/user/${window.location.pathname.split('/')[2]}`, {
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
		let res = await req.json();
		console.log(res);
		setData({
			name: res.data.name,
			email: res.data.email,
			password: '',
			confirmPassword: '',
			description: res.data.description,
			gender: res.data.gender,
			intrests: res.data.intrests,
			profileImg: res.data.profileImg,
		});
	};
	useEffect(() => {
		getPost();
	}, []);
	return (
		<div className='container my-5'>
			<div className='card p-4 card-width'>
				<form onSubmit={editPost}>
					<h2 className='d-flex justify-content-center'>Add Post</h2>

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
								checked={data.gender == 'male' ? true : false}
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
								checked={data.gender == 'female' ? true : false}
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
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPost;

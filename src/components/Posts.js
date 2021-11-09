import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../endpoints';

const Posts = () => {
	const [posts, setPosts] = useState(null);
	const navigate = useNavigate();
	const getPosts = async () => {
		const req = await fetch(`${BACKEND_URL}/api/v1/user`, {
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
		const res = await req.json();
		setPosts(res.data);
		console.log(res);
	};

	useEffect(() => {
		getPosts();
	}, []);
	const handleDelete = async (post) => {
		console.log(post._id);
		const req = await fetch(`${BACKEND_URL}/api/v1/user/${post._id}`, {
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		});
		const res = await req.json();
		console.log(res);
		if (res.status) {
			getPosts();
		}
	};

	return (
		<div className='posts container'>
			<h1 className='d-flex justify-content-center mt-2'>All Posts</h1>
			<div>
				<div class='input-group mb-3'>
					<input
						type='text'
						class='form-control'
						placeholder='Search'
						aria-label='search'
						aria-describedby='button-addon2'
					/>
					<div class='input-group-append'>
						<button class='btn btn-outline-secondary' type='button' id='button-addon2'>
							Button
						</button>
					</div>
				</div>
			</div>
			<div className='row '>
				{posts &&
					posts.map((post) => (
						<div className='col col-sm-12 col-md-4 my-4 d-flex justify-content-center'>
							<div class='card' style={{ width: '20rem' }}>
								<div className='d-flex justify-content-between p-3'>
									<span>
										<span class='card-title mb-0 h5 pl-2'>{post.name}</span>
									</span>
									<div class=''>
										<i
											class='far fa-edit pt-1 px-1 pointer'
											onClick={() => navigate(`/edit/${post._id}`)}
										></i>
										<i
											class='far fa-trash-alt pt-1 px-1 pointer'
											onClick={() => handleDelete(post)}
										></i>
									</div>
								</div>
								<img src={post.profileImg} class='card-img-top px-3 image-dimension' alt='...' />
								<div class='card-body'>
									<p class='card-text'>
										<strong>Gender : </strong>
										{post.gender}
									</p>
									<div class='card-description'>
										<p class='card-text'>{post.description}</p>
									</div>
									<div>
										{post.intrests &&
											post.intrests.map((intrest) => (
												<span class='badge badge-pill badge-warning mr-1'>{intrest}</span>
											))}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Posts;

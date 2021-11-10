import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BACKEND_URL } from '../endpoints';

const Posts = () => {
	const [posts, setPosts] = useState(null);
	const [filterPosts, setFilterPosts] = useState(null);
	const [postNames, setPostNames] = useState(null);
	const [display, setDisplay] = useState(false);
	const [search, setSearch] = useState('');

	const wrapperRef = useRef(null);

	const navigate = useNavigate();
	const postNamesArray = [];

	const getPosts = async () => {
		const req = await fetch(`${BACKEND_URL}/api/v1/user`, {
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
		const res = await req.json();
		setPosts(res.data);
		setFilterPosts(res.data);
		console.log(res);
		res.data.map((post) => postNamesArray.push(post.name.toLocaleLowerCase()));
		setPostNames(postNamesArray);
		console.log(postNamesArray);
	};

	const handleClickOutside = (event) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(event.target)) {
			setDisplay(false);
		}
	};

	const updatePokeDex = (poke) => {
		setSearch(poke);
		setDisplay(false);
	};

	const handleFilter = () => {
		console.log(search);
		console.log(posts);
		let filteredPosts = posts.filter((post) => post.name.toLocaleLowerCase() == search);
		console.log(filteredPosts);
		setFilterPosts(filteredPosts);
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

	useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	});

	const [pageNumber, setPageNumber] = useState(0);
	const usersPerPage = 10;
	const pagesVisited = pageNumber * usersPerPage;
	const displayPosts =
		filterPosts &&
		filterPosts.slice(pagesVisited, pagesVisited + usersPerPage).map((post) => {
			return (
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
			);
		});
	const pageCount = filterPosts && Math.ceil(filterPosts.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	return (
		<div className='posts container'>
			<h1 className='d-flex justify-content-center mt-2'>All Posts</h1>
			<div>
				<div ref={wrapperRef} className='flex-container flex-column pos-rel '>
					<div class='input-group mb-3'>
						<input
							id='auto'
							onClick={() => setDisplay(!display)}
							placeholder='Type to search'
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							autocomplete='off'
							class='form-control'
							aria-label='search'
							aria-describedby='button-addon2'
						/>
						<div class='input-group-append'>
							<button
								class='btn btn-outline-secondary'
								type='button'
								id='button-addon2'
								onClick={handleFilter}
							>
								Button
							</button>
						</div>
					</div>

					{display && (
						<div className='autoContainer'>
							{postNames &&
								postNames
									.filter((post) => post.indexOf(search.toLocaleLowerCase()) > -1)
									.map((post, i) => (
										<div
											onClick={() => updatePokeDex(post)}
											className='option'
											key={i}
											tabIndex='0'
										>
											<span>{post}</span>
										</div>
									))}
						</div>
					)}
				</div>
			</div>
			<div className='row'>{displayPosts}</div>
			<ReactPaginate
				previousLabel={'<'}
				nextLabel={'>'}
				breakLabel='...'
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				onPageChange={changePage}
				containerClassName='pagination paginationBttns d-flex justify-content-center mt-3'
				breakClassName='break-me'
				previousLinkClassName='text-dark'
				nextLinkClassName='text-dark'
				disabledClassName='text-secondary'
				activeClassName='text-primary'
			/>
		</div>
	);
};

export default Posts;

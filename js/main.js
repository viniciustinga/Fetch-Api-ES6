// Buttons
const buttonText = document.getElementById('getText');
const buttonUsers = document.getElementById('getUsers');
const buttonUsersPosts = document.getElementById('getPosts');

// Form Button
const buttonSubmitPosts = document.getElementById('addPost');

// Div Output
const outputText = document.getElementById('outputText');
const outputUsers = document.getElementById('outputUsers');
const outputPosts = document.getElementById('outputPosts');

// Event Listeners
buttonText.addEventListener('click', getText);
buttonUsers.addEventListener('click', getUsers);
buttonUsersPosts.addEventListener('click', getPosts);
buttonSubmitPosts.addEventListener('submit', addPost);


// Fetch sample.txt
function getText() {
/*	fetch('sample.txt')
	.then(function(res) {
		return res.text();
	})
	.then(function(data) {
		console.log(data);
	}); */

	fetch('sample.txt')
	.then((res) => res.text())
	.then((data) => {
		outputText.innerHTML = data;
	})
	.catch((err) => console.log(err));
}

// Fetch users.json
function getUsers() {
	fetch('users.json')
	.then((res) => res.json())
	.then((data) => {
		let output = '<h2 class="mb-4">Users</h2>';
		data.forEach(function(user) {
			output += `
				<ul class="list-group mb-3">
					<li class="list-group-item">Id: ${user.id}</li>
					<li class="list-group-item">User: ${user.name}</li>
					<li class="list-group-item">Email: ${user.email}</li>
				</ul>
			`;
			outputUsers.innerHTML = output;
		});
	});
}

// Fetch posts from external URL
function getPosts() {
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then((res) => res.json())
	.then((data) => {
		let output = '<h2 class="mb-4">Posts</h2>';
		data.forEach(function(post) {
			output += `
				<div class="card card-body mb-3">
					<h3>${post.title}</h3>
					<p>${post.body}</p>
				</div>
			`;
			outputPosts.innerHTML = output;
		});
	});
}

// Adding post
function addPost(e) {
	e.preventDefault();

	let title = document.getElementById('title').value;
	let body = document.getElementById('body').value;

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body:JSON.stringify({title:title, body:body})
	})
	.then((res) => res.json())
	.then((data) => console.log(data))

	// Clear input and textarea after submit
	document.getElementById('title').value = '';
	document.getElementById('body').value = '';
}


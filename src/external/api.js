import axios from 'axios';

const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

const newUser = await axios.post('https://jsonplaceholder.typicode.com/users', {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
});

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

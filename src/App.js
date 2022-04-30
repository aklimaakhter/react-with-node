
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = ({name, email});

    //post data

    fetch('http://localhost:5000/user', {
      method: 'POST', 
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUser =[...user, data];
        setUsers(newUser);
        console.log( data);
      })


  }
  return (
    <div className="App">
      <h1>My own data:{users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' required />
        <input type="text" name="email" placeholder='Email' required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> id:{user.id} Name:{user.name} email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;

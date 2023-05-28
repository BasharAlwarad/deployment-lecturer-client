import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const [userList, setUserList] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // @desc       GET all users
  const getAllUsers = async () => {
    const data = await fetch(`http://localhost:5000/data`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    setUserList(data);
  };

  // @desc       POST create user
  const addUser = async () => {
    const data = await fetch(`http://localhost:5000/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    setUserList(data);
    getAllUsers();
  };

  // @desc       DELETE single user
  const deleteSingleUser = async () => {
    await fetch(`http://localhost:5000/data/${user?.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    getAllUsers();
  };

  return (
    <div className='App'>
      <main>
        <section>
          <form action='submit'>
            <label htmlFor='userIdIn'>ID</label>
            <input
              id='userIdIn'
              name='id'
              type='number'
              value={user.id}
              onChange={handleChange}
            />
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={user.name}
              onChange={handleChange}
            />
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={user.password}
              onChange={handleChange}
            />
          </form>
        </section>
        <section>
          <button id='getAllUsers' onClick={getAllUsers}>
            Get all users
          </button>
          <button id='addUser' onClick={addUser}>
            Crate a user
          </button>
          <button id='deleteSingleUser' onClick={deleteSingleUser}>
            Delete a user
          </button>
        </section>
        <section>
          <ul id='usersList'>
            {userList.user?.map((e) => (
              <li key={e.id}>{`${e.name}:  ${e.email}`}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
export default App;

import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const [userList, setUserList] = useState([]);
  const [url, setUrl] = useState(`http://localhost:5000/data`);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // @desc       GET all users
  const getAllUsers = async () => {
    const data = await fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    setUserList(data);
  };

  // @desc       POST create user
  const addUser = async () => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
    });
    getAllUsers();
  };

  // @desc       DELETE single user
  const deleteSingleUser = async () => {
    await fetch(`${url}/${user.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
    });
    getAllUsers();
  };

  useEffect(() => {
    return () => {
      setUrl(`https://deployment-dhdu.onrender.com/data`);
    };
  }, []);

  return (
    <div className='App'>
      <main>
        <section>
          <form action='submit'>
            <label htmlFor='userIdIn'>ID</label>
            <input
              id='userIdIn'
              name='id'
              type='text'
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
            {userList?.map((e, i) => (
              <li key={i}>{`${e.name}:  ${e.email}`}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
export default App;

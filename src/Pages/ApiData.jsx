import { useEffect, useState } from "react";

const ApiData = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state to show while data is fetching
  const [numberOfUsers, setNumberOfUsers] = useState(5);

  useEffect(() => {
    // Fetching data from API
    setLoading(true)
    fetch(`https://randomuser.me/api/?results=${numberOfUsers}`) // Random User API
      .then(response => response.json()) // Convert response to JSON
      .then(data => {
        setUsers(data.results); // Store the users in the state
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => console.error("Error fetching data:", error)); // Handle any errors
  }, [numberOfUsers]); // Empty array means this useEffect runs only once when component loads

  const handleSelect = (e) => {
    setNumberOfUsers(e.target.value)
  }
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">User List</h1>
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <ul>
        <select onChange={handleSelect} value={numberOfUsers} name="" id="">
          <option value="" disabled>Number of user you want to see</option>
          <option value="5">5</option>
          <option value="10">10</option>
          
        </select>
          {users.map((user, index) => (
            <li key={index} className="p-2 border-b">
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiData;

import  { useState , useEffect ,Fragment } from 'react';
import { BiEdit } from 'react-icons/bi';

import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


export default function Profilehome() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { username: initialUsername, email: initialEmail } = decodedToken;

  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      username,
      email,
      images: selectedFiles.length > 0 ? selectedFiles : null,
    };
  
    console.log('Selected Images:', selectedFiles);
  
    const formData = new FormData();
    formData.append('username', updatedData.username);
    formData.append('email', updatedData.email);
  
    if (updatedData.images) {
      updatedData.images.forEach((file, index) => {
        formData.append('images', file, `image-${index}`);
      });
    }
  
    try {
      const response = await axios.put(`http://localhost:5151/api/update?user_id=${decodedToken.user_id}`, formData);
      const updatedUser = response.data;
      console.log('User updated:', updatedUser);
  
      // Perform any necessary actions with the updated user data
  
      console.log('Data updated successfully!', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error or show an error message
    }
  };
  const [user, setUser] = useState(null);


  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user_id: decodedToken.user_id,
      },
    };
  
    axios
      .get("http://localhost:5151/get-user-data", config)
      .then((response) => {
        const userData = response.data[0]; // Access the first user object in the response array
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  }, [user]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { username1, email1, role } = decodedToken; // Extract the relevant data from the decoded token

  return (
    <>
      <div className="h-screen flex justify-center items-center">

      <div
      className="custom-width"
      style={{
        maxWidth: "700px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderColor: "red" // Specify the color you want here
      }}
    >
          <div className="bg-white shadow-xl rounded-lg p-6">
 
          <div className="photo-wrapper">
          {user?.images && user.images.length > 0 ? (
            <img
            className="w-48 h-48 rounded-full mx-auto text-gray-500"
            src={`data:image/jpeg;base64, ${user.images[0]}`}
            alt="Profile Image"
          />
          ) : (
            <FaUser className="w-32 h-32 rounded-full mx-auto text-gray-500" />
          )}
        </div>

       
            <div className="p-6">
              <h3 className="text-center text-3xl text-gray-900 font-medium mb-4">
               {user?.user_name}
              </h3>
              <div className="text-center text-gray-600 text-lg font-semibold mb-4">
                <p>Web Developer</p>
              </div>
              <div className="flex">
                <div className="w- ml-auto">
                  <table className="text-lg my-4">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>Address :</span>  Zarqa-1-F20</td>

                      </tr>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>Phone :</span>  +977 9955221114</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>Email :</span> {user?.user_email}</td>


                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div className="w-1/2 order-first">
                  <table className="text-lg my-4" id="datas">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>First Name :</span> Mahmoud </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>Last Name :</span> Hassan </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2"><span style={{ fontWeight: 'bold' }}>City :</span> Zarqa</td>

                      </tr>
                    </tbody>
                  </table>
          
                </div>
              </div>
              <div className="text-center mt-6">
              <Fragment>
              
        
       
            

              <button onClick={handleOpen} className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
              <BiEdit className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
            
           
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader style={{ marginBottom: "-120px" }}  >Account Settings </DialogHeader>
                <DialogBody divider style={{ marginTop: "30px", border: "none" }}>
<div style={{ maxHeight: "550px", overflow: "auto", width: "550px" }}>
  
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
 
    <form className="text-black" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-black dark:text-gray-200" htmlFor="username">
            Username
          </label>
          <input
          id="username"
          value={username}
          onChange={handleUsernameChange}
            className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="text-black dark:text-gray-200" htmlFor="emailAddress">
            Email Address
          </label>
          <input
          id="emailAddress"
          value={email}
          onChange={handleEmailChange}
          type="email"
            className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="text-black dark:text-gray-200" htmlFor="password">
            Password
          </label>
          <input
          value="*********"
            id="password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
  
        <div>
          <label  className="text-black dark:text-gray-200" htmlFor="citySelect">
            Select
          </label>
          <select
            id="citySelect"
            className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            value={location}
          >
            <option value="Amman">Zarqa</option>
            <option value="Zarqa">Amman</option>
            <option value="Irbid">Irbid</option>
            <option value="Aqaba">Aqaba</option>
            <option value="Jerash">Jerash</option>
            <option value="Madaba">Madaba</option>
          </select>
        </div>
  
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="multiple_files"
          onChange={handleFileChange}
          type="file"
          multiple=""
        />
      </div>
  
      <div className="flex justify-end mt-6">
      <DialogFooter>
      <Button
        variant="text"
        color="red"
        onClick={handleOpen}
        className="mr-1"
      >
        <span>Cancel</span>
        </Button>
        
        <Button type="submit"variant="gradient" color="green" onClick={handleOpen}>
          <span>Update</span>
        </Button>
    </DialogFooter>
      </div>
    </form>
  </section>


     
              </div> 
                </DialogBody>
        
              </Dialog>
            </Fragment>
            
            <br/>
             <br/>
                <a
                  className="text-2xl text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium flex items-center justify-center"
                  href="#asd"
                  style={{ color: "#54B435" }}
                >
                  {decodedToken && decodedToken.role == "user"
                 
                    ? "Your Reservations 🡫"
                    : ""}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <br id="asd" />
    </>
  );
}

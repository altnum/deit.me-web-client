import React, { useState, useEffect } from 'react'
import Input from './Input.js'
import Button from './Button'
import { useNavigate, Navigate } from "react-router-dom";
import { hobbyService, userService } from './Services.js';
import './Register.css'
import Multiselect from 'multiselect-react-dropdown';

export const Register = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [description, setDescription] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [chosenHobbies, setChosenHobbies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllHobbies()    
  }, [])
  
  const getAllHobbies = async() => {
    var hobbiesArr = await hobbyService.getAll()
    setHobbies(JSON.parse(hobbiesArr))
  }

  const sendRequest = async() => {
    var _hobbies = new Map();
    chosenHobbies.forEach((item) => {
      _hobbies[item.id]= item.hobby
    })

    var user = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phoneNumber,
      "preference": preference,
      "gender": gender,
      "description": description,
      "hobbies": _hobbies
    }

    var t = await userService.register(user);
    if (t === false) {
      setError(true);
    } else {
      setError(false);
      history("/login", {replace: true})
    }
  }

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Unsuccessfull register!</h1>
      </div>
    );
  };

  const checkGender = (e) => {
    if (e === gender) {
      return true;
    } 

    return false;
  }

  const checkPreference = (e) => {
    if (e === preference) {
      return true;
    } 

    return false;
  }

  const addHobbie = (selectedList, selectedItem) => {
    setChosenHobbies(selectedList)
  }

  const removeHobbie = (selectedList, removedItem) => {
    setChosenHobbies(selectedList)
  }

  if (localStorage.getItem('user')) {
    return <Navigate to='/' />
  } else {
  return (
    <div>
      <div className="messages">
          {errorMessage()}
      </div>
      <div className='formWrapper'>
      <div>First Name:</div>
      <Input value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
      <div>Last Name:</div>
      <Input value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
      <div>E-mail:</div>
      <Input value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <div>Password:</div>
      <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
      <div>Phone number:</div>
      <Input value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
      <div>Description: </div>
      <Input value={description} onChange={(e)=> setDescription(e.target.value)}/>
      </div>
      <form onSubmit={sendRequest} className='radios'>
      <div style={{ marginRight: "10px"}}><b>Gender:</b></div>
        <div className="genderRadios">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Male"
                checked={checkGender('male')}
                onChange={(e)=> setGender(e.target.value.toLowerCase())}
              />
              Male
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Female"
                checked={checkGender('female')}
                onChange={(e)=> setGender(e.target.value.toLowerCase())}
              />
              Female
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Other"
                checked={checkGender('other')}
                onChange={(e)=> setGender(e.target.value.toLowerCase())}
              />
              Other
            </label>
          </div>
        </div>
        <div style={{ marginRight: "10px" }} ><b>Preference:</b></div>
        <div className="preferenceRadios">
        <div className="radio">
            <label>
              <input
                type="radio"
                value="Men"
                checked={checkPreference('men')}
                onChange={(e)=> setPreference(e.target.value.toLowerCase())}
              />
              Men
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Women"
                checked={checkPreference('women')}
                onChange={(e)=> setPreference(e.target.value.toLowerCase())}
              />
              Women
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Both"
                checked={checkPreference('both')}
                onChange={(e)=> setPreference(e.target.value.toLowerCase())}
              />
              Both
            </label>
          </div>
        </div>
      </form>
      <Multiselect
        options={hobbies}
        selectedValues={chosenHobbies}
        onSelect={addHobbie}
        onRemove={removeHobbie}
        displayValue="hobby"
      />
      <div style={{display: "flex",
                  justifyContent: "center"}}>
      <Button name="Register" onClick={sendRequest}/>
      </div>
    </div>
  )
  }
}

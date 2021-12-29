import React, { useState, useEffect } from 'react'
import Input from './Input.js'
import Button from './Button'
import { Navigate } from "react-router-dom";
import { userService, hobbyService } from './Services.js';

export const Register = () => {
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const hobbyMap = new Map();
  const chosenHobbies = new Map();

  useEffect(() => {
    getAllHobbies()    
  }, [])

  const handleHobbyCheckbox = (checked) => {
    if (!chosenHobbies.get(checked) && chosenHobbies.get(checked) != 0) {
      chosenHobbies.set(checked, 0)
      return;
    }
    
    chosenHobbies.set(checked, chosenHobbies.get(checked) + 1)
    
    if (chosenHobbies.get(checked) % 2 != 0) {
      chosenHobbies.delete(checked)
    }
  }; 

  const printHobbies = () => {
    const hobbiesDivs = [];
    for (let i = 0; i < hobbies.length; i++) {
      console.log(hobbies[i].hobby)
      hobbyMap.set(hobbies[i].hobby, hobbies[i].id)
      hobbiesDivs.push(
        <div>
          <input
          type="checkbox"
          id="topping"
          name="topping"
          value={hobbies[i].hobby}
          onChange={(e)=> handleHobbyCheckbox(e.target.value)}
          />
          {hobbies[i].hobby}
        </div>)
    }
    return hobbiesDivs
  }
  
  const getAllHobbies = async() => {
    var hobbiesArr = await hobbyService.getAll()
    setHobbies(JSON.parse(hobbiesArr))
  }

  const sendRequest = () => {
    var _hobbies = []
    console.log('request sent')
    chosenHobbies.forEach((value, key) => {
      console.log(hobbyMap.get(key))
      console.log(key)
      var hobby = {
        "id": hobbyMap.get(key),
        "hobby": key
      }
      _hobbies.push(hobby)
    })
    console.log(_hobbies)
  }

  const checkGender = (e) => {
    console.log(gender)
    if (e === gender) {
      return true;
    } 

    return false;
  }

  const checkPreference = (e) => {
    console.log(preference)
    if (e === preference) {
      return true;
    } 

    return false;
  }

  if (localStorage.getItem('user')) {
    return <Navigate to='/' />
  } else {
  return (
    <div>
      <div>First Name:</div>
      <Input />
      <div>Last Name:</div>
      <Input />
      <div>E-mail:</div>
      <Input />
      <div>Password:</div>
      <Input />
      <div>Phone number:</div>
      <Input />
      <Button name="Register"/>
      <button onClick={sendRequest}>
          test
        </button>

      <div>Gender:</div>
      <form onSubmit={sendRequest}>
        <div className="genderRadios">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Male"
                checked={checkGender()}
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
        <div>Preference:</div>
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
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
      {printHobbies()}
      
    </div>
  )
  }
}

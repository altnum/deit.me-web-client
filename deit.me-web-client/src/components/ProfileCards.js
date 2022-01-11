import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap'
import { userService } from './Services.js';

export const ProfileCards = (props) => {
    const [isButtonClicked, setButtonClicked] = useState(false)

    const renderHobbies = () => {
        return props.hobbies.map((hobby, index) => {
            if (props.hobbies.length - 1 === index) {
                return hobby.hobby
            } 
            return hobby.hobby + ", "
        })
    }

    const handleButtonClick = () => {
        setButtonClicked(!isButtonClicked)
    }

    return (
        <Card style={{ width: '18rem', ...props.style }} className={props.className}>
            <Card.Img variant="top" src={props.picture}/>
            <Card.Body>
                <Card.Title>{props.firstName} {props.lastName}</Card.Title>
                <Card.Text>Preference: {props.preference}</Card.Text>
                {isButtonClicked && <Card.Text>Description: {props.description}</Card.Text>}
                {isButtonClicked && <Card.Text>Hobbies: {renderHobbies()}</Card.Text>}
                <Button variant="primary" onClick={handleButtonClick.bind(this)}>{!isButtonClicked ? 'Show details' : 'Hide Details' }</Button>
            </Card.Body>
        </Card>
    )
}

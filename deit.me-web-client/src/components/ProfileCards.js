import React from 'react';
import { Card, Button } from 'react-bootstrap'

export const ProfileCards = (props) => {
    const renderHobbies = () => {
        return props.hobbies.map((hobby, index) => {
            if (props.hobbies.length - 1 === index) {
                return hobby.hobby
            } 
            return hobby.hobby + ", "
        })
    }
    return (
        <Card style={{ width: '18rem', ...props.style }} className={props.className}>
            <Card.Img variant="top" src="https://picsum.photos/200/300" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>Preference: {props.preference}</Card.Text>
                <Card.Text>Description: {props.description}</Card.Text>
                <Card.Text>Hobbies: {renderHobbies()}</Card.Text>
                <Button variant="primary">See details</Button>
            </Card.Body>
        </Card>
    )
}

import React from 'react';
import { Card, Button } from 'react-bootstrap'

export const ProfileCards = (props) => {
    return (
        <Card style={{ width: '18rem', ...props.style }} className={props.className}>
            <Card.Img variant="top" src="https://picsum.photos/200/300" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

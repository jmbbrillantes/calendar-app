import React from 'react'
import { Card } from 'react-bootstrap'
import './Item.css'

const Item = ({item, onEdit, setAction}) => {
    return (
        <Card onClick={() => {onEdit(item); setAction('Edit')}}>
            <Card.Body className={(item.status==="Pending") ? 'bg-orange' : (item.status==="On-going") ? 'bg-blue' : 'bg-green'}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.date}</Card.Subtitle>
                <Card.Text>{item.status}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item

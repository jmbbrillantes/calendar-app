import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createItem, deleteItem } from '../actions'
import { Alert, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap' 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './Add.css'

export class Add extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: 0,
            title: '',
            status: 'Select Status',
            date: new Date(),
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state)
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.onDelete(this.state.id)
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeStatus(text) {
        this.setState({status: text})
    }

    changeDate(text) {
        this.setState({date: text})
    }

    componentDidMount(){
        if (this.props.location && this.props.location.state && this.props.location.state.item) {
            let item = this.props.location.state.item;
            console.log('componentDidMount item',item)
            this.setState({
                id: item.id,
                title: item.title,
                status: item.status,
                date: new Date(item.date)
            })
        }
    }

    render() {
        return (
            <div id="Add">
                <h1 className="add-title">Add an Item</h1>
                {   this.props.error ?
                    <Alert variant="danger">
                        {this.props.error}
                    </Alert> : ''
                }
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <Form.Group id="add-btn-navigate" className="form-group">
                        
                        <Link to="/" className="back-btn"><Button type="button" size="lg" className="btn btn-warning back-btn">Back</Button></Link>
                        <Button type="submit" size="lg" className="btn btn-success">
                            {this.props.action==="Add" ? 'Add Item' : 'Update Item'}
                        </Button>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" 
                            className="form-control"
                            name="title"
                            placeholder="Enter Title" 
                            value={this.state.title}    
                            onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Date</Form.Label>
                        <DatePicker 
                            id="my-date-picker"
                            className="form-control"
                            selected={this.state.date} 
                            onChange={(dateVal) => this.setState({date: dateVal})}
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Status</Form.Label>
                        <DropdownButton id="dropdown-basic-button" title={this.state.status}>
                            <Dropdown.Item onClick={(e) => this.changeStatus(e.target.textContent)}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => this.changeStatus(e.target.textContent)}>On-going</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => this.changeStatus(e.target.textContent)}>Done</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>

                    { (this.props.action === "Add") ? ''
                        : 
                        <Button type="button" size="lg" className="btn btn-danger btn-delete" onClick={this.handleDelete.bind(this)}>
                            Delete Item
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.itemList.error,
        action: state.itemList.action
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (item) => {
            dispatch(createItem(item))
        },
        onDelete: (id) => {
            dispatch(deleteItem(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)


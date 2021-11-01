import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchItems, setAction, fetchItemsByStatus, fetchItemsByTitle } from '../actions'
import { history } from '..'
import { Form, Dropdown, DropdownButton } from 'react-bootstrap' 
import Item from '../components/Item'
import './Home.css'

export class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            status: 'Select Status',
            search: '',
            action: ''
        };
    }

    componentDidMount() {
        this.props.onLoad()
    }

    handleStatus(status) {
        console.log('handleStatus')
        this.props.onChangeStatus(status)
    }

    handleInput(text) {
        this.props.onChangeInput(text)
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit(item) {
        history.push({
            pathname: `/edit/${item.id}`,
            state: {
                item: item,
            }
        })
    }

    changeStatus(text){
        console.log('changeStatus',text)
        this.setState({status: text})
    }

    setAction(text){
        this.setState({action: text})
        this.props.onAdd(text)
    }
    
    render() {
        return (
            <div id="home-container">

                <div id="home-header">
                    <h1 id="title" >Calendar App</h1>
                    <Link id="add-btn" className="btn btn-primary" to="/add" onClick={this.setAction.bind(this, 'Add')}>Add</Link>
                </div>

                <div id="home-function">
                    <Form.Group className="form-group">
                        <DropdownButton id="dropdown-basic-button" title={this.state.status}>
                            <Dropdown.Item onClick={(e) => {this.changeStatus(e.target.textContent); this.handleStatus.call(this, 'All')}}>All</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {this.changeStatus(e.target.textContent); this.handleStatus.call(this, 'Pending')}}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {this.changeStatus(e.target.textContent); this.handleStatus.call(this, 'On-going')}}>On-going</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {this.changeStatus(e.target.textContent); this.handleStatus.call(this, 'Done')}}>Done</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <Form.Control 
                        type="text" 
                        name="search"
                        placeholder="Search by Title" 
                        value={this.state.search}
                        onChange={this.handleInputChange.bind(this)}
                        onKeyUp={this.handleInput.bind(this, this.state.search)}
                    />
                </div>

                <div id="cards-container">
                    {
                        this.props.isLoading ? 
                        <h3 style={{textAlign: 'center', margin: '1em 0 0 0'}}>Fetching data please wait...</h3>
                        :
                        (this.props.items && this.props.items.length > 0) ?
                            this.props.items.map((item) => 
                                <Item 
                                    key={item.id} 
                                    item={item} 
                                    onEdit={this.handleEdit.bind(this)}
                                />
                            )
                        :
                        <h3 style={{textAlign: 'center', margin: '1em 0 0 0'}}>No data fetched...</h3>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.itemList.items || [],
        isLoading: state.itemList.isLoading || false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchItems());
        },
        onAdd: (action) => {
            dispatch(setAction(action));
        },
        onChangeStatus: (status) => {
            console.log('onChangeStatus', status)
            dispatch(fetchItemsByStatus(status));
        },
        onChangeInput: (text) => {
            console.log('onChangeInput', text)
            dispatch(fetchItemsByTitle(text));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

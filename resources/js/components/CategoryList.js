import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class CategoryList extends Component {
    constructor() {
        super()
        this.state = {
            categories: []
        }

        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(id) {
        // remove from local state
        const isNotId = category => category.id !== id;
        // make delete request to the backend
        axios.delete(`/api/deleteCategory/${id}`);

    }

    componentDidMount() {
        axios.get('/api/categories').then(response => {
            this.setState({
                categories: response.data
            })
        })
    }

    render() {
        const {categories} = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Categories
                                <Link className='btn btn-primary btn-sm mb-3 float-right' to='/create'>
                                    Add new category
                                </Link></div>
                            <div className='card-body'>

                                <ul className='list-group list-group-flush'>
                                    {categories.map(category => (

                                        <div
                                            className='row list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                            key={category.id}>
                                            <div className='col-9'>
                                                <Link
                                                    className=''
                                                    to={`category/${category.id}`}

                                                >
                                                    {category.name}
                                                </Link>
                                            </div>

                                            <div className='col-1'>
                                                <span className='badge badge-primary badge-pill'>
                                                    {category.products_count}
                                                </span>
                                            </div>

                                            <div className='col-1'>
                                                <Link className='btn btn-primary btn-sm'
                                                      to={`edit/${category.id}`}>
                                                    Edit
                                                </Link>
                                            </div>

                                            <div className='col-1'>
                                                <button className='btn btn-danger btn-sm'
                                                      onClick={() => this.handleDelete(category.id)}>
                                                    Delete
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryList

import axios from 'axios'
import React, { Component } from 'react'

class EditCategory extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            errors: [],
            category: {},
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdateCategory (event) {
        event.preventDefault()

        const { history } = this.props
        const categoryId = this.props.match.params.id

        const categoryUpdated = {
            name: this.state.name,
            description: this.state.description
        }

        axios.post(`/api/categoryUpdate/${categoryId}`, categoryUpdated)
            .then(response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    componentDidMount () {
        const categoryId = this.props.match.params.id

        axios.get(`/api/categoryEdit/${categoryId}`).then(response => {
            this.setState({
                name: response.data.name,
                description: response.data.description
            })
        })
    }

    render () {
        const { category } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Update Category</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateCategory}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            // value=''
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Description</label>
                                        <textarea
                                            id='description'
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                            name='description'
                                            rows='10'
                                            value={this.state.description}
                                            // value=''
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('description')}
                                    </div>
                                    <button className='btn btn-primary'>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditCategory

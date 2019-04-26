import axios from 'axios'
import React, { Component } from 'react'

class NewProduct extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            description: '',
            price: '',
            parentID:'',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProduct = this.handleCreateNewProduct.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewProduct (event) {
        event.preventDefault()

        const { history } = this.props

        const product = {
            parentID:this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
        }

        axios.post('/api/storeProduct', product)
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

        axios.get(`/api/createProduct/${categoryId}`).then(response => {
            this.setState({
                id: response.data.id,
            })
        })
    }

    render () {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Add New Product</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewProduct}>
                                    <input
                                        id='parentID'
                                        type='hidden'
                                        name='parentID'
                                        value={this.state.id}
                                    />
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='price'>Price</label>
                                        <div className="input-group">
                                        <input
                                            id='price'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                                            name='price'
                                            aria-describedby="inputGroupPrepend"
                                            value={this.state.price}
                                            onChange={this.handleFieldChange}
                                        />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend">€</span>
                                        </div>
                                        {this.renderErrorFor('price')}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Description</label>
                                        <textarea
                                            id='description'
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                            name='description'
                                            rows='10'
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('description')}
                                    </div>
                                    <button className='btn btn-primary'>Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProduct

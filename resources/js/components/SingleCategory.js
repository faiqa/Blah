import axios from 'axios'
import React, { Component } from 'react'
import {Link} from "react-router-dom";

class SingleCategory extends Component {
    constructor (props) {
        super(props)
        this.state = {
            category: {},
            products: []
        }

    }

    componentDidMount () {
        const categoryId = this.props.match.params.id

        axios.get(`/api/category/${categoryId}`).then(response => {
            this.setState({
                category: response.data,
                products: response.data.products
            })
        })
    }

    render () {
        const { category, products } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>{category.name}
                                &nbsp;
                                <Link className='btn btn-primary btn-sm float-right' to={`/createProduct/${category.id}`}>

                                    Add Product
                                </Link>
                                &nbsp;
                                <Link className='btn btn-primary btn-sm float-right mr-1' to='/'>
                                    Back
                                </Link>

                            </div>
                            <div className='card-body'>
                                <p>{category.description}</p>



                                <hr />
                                <ul className='list-group mt-3'>
                                    {products.map(product => (
                                        <li
                                            className='list-group-item d-flex justify-content-between align-items-center'
                                            key={product.id}
                                        >
                                            {product.name}

                                            <button className='btn btn-primary btn-sm'>
                                                {product.price}€ &nbsp; Add to Cart
                                            </button>
                                        </li>
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

export default SingleCategory

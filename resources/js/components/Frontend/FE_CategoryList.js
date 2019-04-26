import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class FE_CategoryList extends Component {
    constructor() {
        super()
        this.state = {
            categories: []
        }

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

        var divStyle = {
            minHeight: '100px',
            background: '#f3f3f3',
            fontSize: '2vw',
            textAlign: 'center',
            paddingTop: '7%',
            border: '1px solid #2f2f2f'
        }

        var linkStyle = {
            color: '#2f2f2f',
            textDecoration: 'none'
        }

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col=12'>
                        <img src='/images/slider1.png' alt='Slider Image here'/>
                    </div>

                    {categories.map(category => (

                        <div
                            className='col-3'
                            key={category.id}>
                            <div className='col-12 ml-3 mt-5' style={divStyle}>
                                <Link
                                    style={linkStyle}
                                    to={`category/${category.id}`}

                                >
                                    {category.name}
                                </Link>
                            </div>

                            {/*<div className='col-12'>*/}
                            {/*                    <span className='badge badge-primary badge-pill'>*/}
                            {/*                        {category.products_count}*/}
                            {/*                    </span>*/}
                            {/*</div>*/}
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}

export default FE_CategoryList

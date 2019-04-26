import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import CategoryList from './CategoryList'
import SingleCategory from './SingleCategory'
import NewProduct from './NewProduct'
import NewCategory from './NewCategory'
import EditCategory from './EditCategory'
import FE_CategoryList from './Frontend/FE_CategoryList'


class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={CategoryList} />
                        <Route path='/category/:id' component={SingleCategory} />
                        <Route path='/create' component={NewCategory} />
                        <Route path='/edit/:id' component={EditCategory} />
                        <Route path='/createProduct/:id' component={NewProduct} />

                        <Route path='/ourCategories' component={FE_CategoryList} />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

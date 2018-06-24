import React, { Component } from 'react';


import RecipeItem from '../RecipeItem/RecipeItem'

import './List.css';
class List extends Component {

  // Set Initial State
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }    
  }

  // Fetch recipes if user has typed something
  componentDidMount() {
    if (this.props.query !== '') {
      this.fetchData()
    }
  }

  // Handles the fetching of data to a proxy of recipepuppy to avoid issues with cors
  // Since the api lacks passing a limit param we fetch the first, and second page
  // both contain 10 results, so we combine the results to show a maximum of 20 recipes to the user
  fetchData = () => {
    let url = new URL('https://recipepuppyproxy.herokuapp.com/api')
    let params = { q: this.props.query, p: 1 };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    let urlp2 = new URL('https://recipepuppyproxy.herokuapp.com/api')
    let paramsp2 = { q: this.props.query, p: 2 };
    Object.keys(paramsp2).forEach(key => urlp2.searchParams.append(key, paramsp2[key]));
    let data = {
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    Promise.all([fetch(url, data), fetch(urlp2, data)])
      .then((res) => {
        let data = res[0].json();
        let data2 = res[1].json();
        data.then((recipe1) => {
          data2.then((recipe2) => {
            let recipes = recipe1.results.concat(recipe2.results);
            let cleanedData = recipes.map((data) => this.cleanResults(data))
            this.setState({
              recipes: cleanedData
            })
          })
        });
      })           
  }

  // When a user enters text we pass the updated text down and then do a fetch request using the new query param
  componentDidUpdate(prevProps){
    if (prevProps.query !== this.props.query && this.props.query.length > 1) {
        this.fetchData();
    }
  }

  // Handles cleaning the results of recipe puppy for a better user experience
  cleanResults = (data) => {
    
    if(data.title.match(/&quot;/g)) {
      data.title = data.title.replace(/&quot;/g, '')
    }
    if (data.title.match(/&#039;/g)) {
      data.title = data.title.replace(/&#039;/g, '\'')
    }
    if (data.title.match(/&amp/g)) {
      data.title = data.title.replace(/&amp;/g, '')
    }
    return data;
  }

  renderComponent = () => {
    if(this.props.query !== '') {
      return (
        this.state.recipes.map((recipe, i) => {
          return (          
              <RecipeItem key={i} index={i} recipe={recipe}/>            
          )
        })
      )
    }
  }
  render() {
    return(
      <div className="ListContainer">
        {this.renderComponent()}          
      </div>
    )
  }
}

export default List;
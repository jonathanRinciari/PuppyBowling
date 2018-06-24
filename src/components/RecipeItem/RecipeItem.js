import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';

import './RecipeItem.css';

class RecipeItem extends Component {

  // Set Initial State
  constructor(props) {
    super(props)
    this.state = {
      openModal: false
    }
  }

  // Triggers the opening of the details modal
  onOpenModal = () => {
    this.setState({
      openModal: true
    })
  }

  //Closes detail modal
  onCloseModal = () => {
    this.setState({
      openModal: false
    })
  }

  // Renders a simple checklist for the ingredients of the recipe
  renderCheckList = () => {
    let ingredientArr = this.props.recipe.ingredients.split(', ')
    return ingredientArr.map((ingredient, i) => {
      return (
        <div className="IngredientListContainer" key={i}>
          <input type="checkbox" />
          <p style={{marginLeft: '20px'}}> 
            {ingredient} 
          </p>
        </div>  
      )
    })
  }

  // If the recipe contains a thumbnail render it
  renderThumbnail = () => {
    if(this.props.recipe.thumbnail.length > 1) {
      return (
        <img className="Image" alt={this.props.recipe.title + '_img'} src={this.props.recipe.thumbnail}/>
      )
    }
  }

  render() {
    return (
      <Fragment>
      <div onClick={this.onOpenModal} className="ItemContainer" id={this.props.index % 2 === 0 ? 'Dark' : 'Light' }>
        <p className="RecipeTitle"> {this.props.recipe.title} </p> 
      </div>
        <Modal onClose={this.onCloseModal} open={this.state.openModal} center>
          <div className="Container">
            <h2 className="Title" >{this.props.recipe.title}</h2>
            {this.renderThumbnail()}
            <div style={{width: '75%'}}>
              {this.renderCheckList()}
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
}



export default RecipeItem;
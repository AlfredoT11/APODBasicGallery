import React from 'react';

import './mainPage.css';

class SearchNewPhotos extends React.Component{

    constructor(props){
        super(props);
        console.log(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchClick(e){
        e.preventDefault();
        this.props.searchClickFunction();
    }

    render(){
        return (
            <div className='search-new-photos'>
                <p>¿No estás satisfecho con esta foto? ¡Busca alguna en un rango determinado!</p>
                <form>
                    <InputDateLabeled labelText='Fecha de inicio: ' inputId='startDateId' />
                    <InputDateLabeled labelText='Fecha final: ' inputId='endDateId' />
                    <div className='get-photos-button'>
                        <button class='search-button' onClick={this.handleSearchClick}>¡Buscar fotos!</button>
                    </div>
                </form>
            </div>
        )
    }
}

class InputDateLabeled extends React.Component{
    render(){
        return (
            <div className='input-date'>
                <label for={this.props.inputId}>{this.props.labelText} </label><input type='date' id={this.props.inputId}></input>
            </div>
        )
    }
}

export default SearchNewPhotos;
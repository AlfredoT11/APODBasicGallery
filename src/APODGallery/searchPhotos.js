import React from 'react';

import './mainPage.css';

class SearchNewPhotos extends React.Component{

    constructor(props){
        super(props);
        const today = new Date();
        this.state = {
            startDate: today.toISOString().split('T')[0],
            endDate: today.toISOString().split('T')[0]
        }
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleDateChanged = this.handleDateChanged.bind(this);
    }

    handleSearchClick(e){
        e.preventDefault();
        this.props.searchClickFunction(this.state.startDate);
    }

    handleDateChanged(newDate, isStartDate){
        if(isStartDate){
            this.setState({
                startDate: newDate
            });
        }else{
            this.setState({
                endDate: newDate
            })
        }
    }

    render(){
        return (
            <div className='search-new-photos'>
                <p>You're not satisfied with today's photo? Look for (20) new ones!</p>
                <form>
                    <InputDateLabeled labelText='Start date: ' inputId='startDateId' isStartDate={true} handleDateChange={this.handleDateChanged}/>
                    <div className='get-photos-button'>
                        <button className='search-button' onClick={this.handleSearchClick}>Look new photos!</button>
                    </div>
                </form>
            </div>
        )
    }
}

class InputDateLabeled extends React.Component{

    constructor(props){
        super(props);
        const today = new Date();
        this.state = {
            selectedDate: today.toISOString().split('T')[0]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            selectedDate: e.target.value
        })
        this.props.handleDateChange(e.target.value, this.props.isStartDate);
    }

    render(){
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0]
        return (
            <div className='input-date'>
                <label htmlFor={this.props.inputId}>{this.props.labelText} </label>
                <input type='date' id={this.props.inputId} onChange={this.handleChange} value={this.state.selectedDate} min='1995-06-16' max={todayDate} />
            </div>
        )
    }
}

export default SearchNewPhotos;
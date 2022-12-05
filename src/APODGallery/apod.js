import React from 'react';

import SearchNewPhotos from './searchPhotos';

import './apod.css';

class PhotoOfTheDay extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class='apod-container'>
                <div className='photo-container'>
                    <figure className='apod-figure'>
                        <a href={this.props.imageUrl} target='_blank'>
                            <img className='apod-image' src={this.props.imageUrl} alt='image_test'/>
                        </a>
                    </figure>
                </div>

                <PhotoInformation photoTitle={this.props.photoTitle} copyright={this.props.copyright} description={this.props.description}/>
                
                <div className='search-section'>
                    <SearchNewPhotos searchClickFunction={this.props.searchClickFunction} />
                </div>
            </div>
        );
    }
}

class PhotoInformation extends React.Component{
    render(){
        return (
            <div className='photo-information'>
                <h2>{this.props.photoTitle}</h2>
                <h3>Copyright: {this.props.copyright}</h3>
                <p>
                    {this.props.description}
                </p>
            </div>
        )
    }
}

export default PhotoOfTheDay;
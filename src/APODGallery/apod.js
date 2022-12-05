import React from 'react';

import './apod.css';

class PhotoOfTheDay extends React.Component{

    render(){
        return(
            <div className='apod-container'>
                <div className='photo-container'>
                    <figure className='apod-figure'>
                        <a href={this.props.hdUrl} target='_blank' rel='noreferrer'>
                            <img className='apod-image' src={this.props.url} alt='image_test'/>
                        </a>
                    </figure>
                </div>

                <PhotoInformation photoTitle={this.props.photoTitle} copyright={this.props.copyright} description={this.props.description}/>
            </div>
        );
    }
}

class PhotoInformation extends React.Component{
    render(){
        return (
            <div className='photo-information'>
                <h2 className='titleH2'>{this.props.photoTitle}</h2>
                <h3>Copyright: {this.props.copyright}</h3>
                <p>
                    {this.props.description}
                </p>
            </div>
        )
    }
}

export default PhotoOfTheDay;
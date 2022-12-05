import React from 'react';

import './gallery.css';

class GalleryImage extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        console.log("Selecting image: " + this.props.title);
        this.props.selectImage({
            title: this.props.title,
            date: this.props.date,
            hdurl: this.props.hdurl,
            url: this.props.url,
            copyright: this.props.copyright,
            description: this.props.description
        });
    }

    render(){
        return (
            <figure className='gallery-photo'>
                <img className='gallery-photo-img' src={this.props.url} alt='image_test' onClick={this.handleClick}/>
                <figcaption>
                    {this.props.date}
                </figcaption>
            </figure>
        )
    }
}

class PhotosGallery extends React.Component{
    
    render(){
        return (
            <div>
                <div className='gallery-container'>
                    {
                        this.props.photosInfo.map(photoInfo => 
                            <GalleryImage 
                                title={photoInfo.title}
                                date={photoInfo.date}
                                hdurl={photoInfo.hdurl}
                                url={photoInfo.url}
                                copyright={photoInfo.copyright}
                                description={photoInfo.description}
                                selectImage={this.props.selectImage}
                            /> 
                        )
                    }
                </div>
            </div>
        )
    }
}

export default PhotosGallery;
import React from 'react';

import './gallery.css';

class GalleryImage extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.selectImage({
            title: this.props.title,
            date: this.props.date,
            hdUrl: this.props.hdUrl ? this.props.hdUrl : this.props.url,
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
                                key={photoInfo.url}
                                title={photoInfo.title}
                                date={photoInfo.date}
                                hdUrl={photoInfo.hdUrl}
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
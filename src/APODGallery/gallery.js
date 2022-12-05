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
                <a onClick={this.handleClick}>
                    <img className='gallery-photo-img' src={this.props.url} alt='image_test'/>
                </a>
                <figcaption>
                    {this.props.date}
                </figcaption>
            </figure>
        )
    }
}

class PhotosGallery extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            photosInfo: []
        }
    }


    componentDidMount(){
        const today = new Date();
        console.log(today.toISOString().split('T')[0]);
        let inFiveDays = new Date();
        inFiveDays.setDate(today.getDate() + 28);
        console.log(inFiveDays.toISOString().split('T')[0]);

        const diffTime = Math.abs(inFiveDays - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        fetch("https://api.nasa.gov/planetary/apod?" + new URLSearchParams({
            api_key: "DEMO_KEY",
            start_date: "2022-11-01",
            end_date: "2022-11-28",
        }), 
        {
            method: 'GET'
        }).then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Algo salió mal. Inténtalo más tarde.');
            }
        })
        .then(data => {
            console.log("Returned values: " + data);
            console.log("Tamaño: " + data.length);

            let reduced = data.reduce((filteredData, photoInfo) => {
                if(photoInfo.media_type === 'image'){
                    const filteredImageInfo = {
                        title: photoInfo.title,
                        date: photoInfo.date,
                        hdUrl: photoInfo.hdurl ? photoInfo.hdurl : photoInfo.url,
                        url: photoInfo.url ? photoInfo.url : photoInfo.url,
                        copyright: photoInfo.copyright ? photoInfo.copyright : null,
                        description: photoInfo.explanation
                    }
                    filteredData.push(filteredImageInfo);
                    console.log(filteredImageInfo.url);
                }
                return filteredData;
            }, []);

            console.log("Filtered tamaño: " + reduced.length);
            this.setState({
                photosInfo: reduced
            })
        })
        .catch(error => alert(error));        
    }

    render(){
        return (
            <div>
                <div className='gallery-container'>
                    {
                        this.state.photosInfo.map(photoInfo => 
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
import React, { Fragment } from 'react';

import './main_page.css'

class PictureOfTheDay extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            photoTitle: "Strawberry Supermoon Over Devil's Saddle",
            copyright: "Lorenzo Busilacchi",
            description: "Near the horizon the full moon often seems to loom large, swollen in appearance by the famous Moon illusion. But time-lapse image sequences demonstrate that the Moon's angular size doesn't really change as it rises or sets. Its color does, though. Recording a frame about every 60 seconds, this image also shows how red the Sun can look while low on the horizon. The featured montage was taken from Cagliari, Sardinia, Italy, the day after June's Strawberry Moon, a full moon dubbed a supermoon due to its slightly larger-than-usual angular size.  This Strawberry Supermoon is seen rising behind the Devil's Saddle, a mountain named for the unusual moon-sized dip seen just to the right of the rising moon. A shrinking line-of-sight through planet Earth's dense and dusty atmosphere shifted the moonlight from strawberry red through honey-colored and paler yellowish hues. That change seems appropriate for a northern June Full Moon also known as the Strawberry or Honey Moon. A Thunder Supermoon -- the third of four supermoons in 2022 -- will occur later this month.   Today's Adventure Link: Click on \"Cagliari\"",
            imageUrl: "https://apod.nasa.gov/apod/image/2207/StrawberryMoonRise_Busilacchi_6720.jpg"

        }
    }

    componentDidMount(){
        /*
        fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-10-02", {
            method: 'GET'
        }).then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Algo salió mal. Inténtalo más tarde.');
            }
        })
        .then(data => {
            console.log(data);
            this.setState({
                photoTitle: data.title,
                copyright: "None",
                description: data.explanation,
                imageUrl: data.hdurl
            })
        })
        .catch(error => alert(error));
        */

    }

    render(){
        return (
            <Fragment>
                <div className='page-container-1'>
                    <div className='header-section borders-gradient'>
                        <h1>Fotos del 1 de noviembre del 2022 al 4 de noviembre del 2022</h1>
                    </div>
                    <div>
                        {/*
                        <PhotoOfTheDay 
                            imageUrl={this.state.imageUrl} 
                            copyright={this.state.copyright} 
                            photoTitle={this.state.photoTitle} 
                            description={this.state.description}
                        />
                        */}
                        <PhotosGallery></PhotosGallery>
                    </div>
                    <div className='footer-section'>
                        <p>Coded with love by Tona Díaz.</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

class SearchNewPhotos extends React.Component{
    render(){
        return (
            <div className='search-new-photos'>
                <p>¿No estás satisfecho con esta foto? ¡Busca alguna en un rango determinado!</p>
                <form>
                    <InputDateLabeled labelText='Fecha de inicio: ' inputId='startDateId' />
                    <InputDateLabeled labelText='Fecha final: ' inputId='endDateId' />
                    <div className='get-photos-button'>
                        <button class='search-button'>¡Buscar fotos!</button>
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
                if(photoInfo.media_type == 'image'){
                    const filteredImageInfo = {
                        title: photoInfo.title,
                        date: photoInfo.date,
                        url: photoInfo.url ? photoInfo.url : photoInfo.url,
                        copyright: photoInfo.copyright ? photoInfo.copyright : null
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
                            <figure className='gallery-photo'>
                                <a href={photoInfo.url} target='_blank'>
                                    <img className='gallery-photo-img' src={photoInfo.url} alt='image_test'/>
                                </a>
                                <figcaption>
                                    {photoInfo.date}
                                </figcaption>
                            </figure>
                        )
                    }

                    {/* 
                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src='https://apod.nasa.gov/apod/image/2212/Mars-Stereo.png' alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src="https://apod.nasa.gov/apod/image/2211/Lobster_Blanco_4000.jpg" alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src='https://apod.nasa.gov/apod/image/2212/potm2211a.jpg' alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>                            
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src="https://apod.nasa.gov/apod/image/2211/M33-NOIR-HST-LL.jpg" alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src="https://apod.nasa.gov/apod/image/2211/PIA25287_insight.jpg" alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src="https://apod.nasa.gov/apod/image/2211/Lunar-Eclipse-South-Pole.jpg" alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href="www.google.com" target='_blank'>
                            <img className='gallery-photo-img' src="https://apod.nasa.gov/apod/image/2211/darksun_lafferty_1600.jpg" alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>
                    */}
                </div>
            </div>
        )
    }
}

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
                
                <div className='search-section borders-gradient'>
                    <SearchNewPhotos></SearchNewPhotos>
                </div>
            </div>
        );
    }
}

export default PictureOfTheDay;
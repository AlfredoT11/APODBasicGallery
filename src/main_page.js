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
                        <h1>Foto astronómica del día 1 de diciembre de 2022</h1>
                    </div>
                    
                    <div className='photo-container'>
                        <figure className='apod-figure'>
                            <a href={this.state.imageUrl} target='_blank'>
                                <img className='apod-image' src={this.state.imageUrl} alt='image_test'/>
                            </a>
                        </figure>
                    </div>

                    <PhotoInformation photoTitle={this.state.photoTitle} copyright={this.state.copyright} description={this.state.description}/>
                    
                    <div className='search-section borders-gradient'>
                        <SearchNewPhotos></SearchNewPhotos>
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
                        <button>¡Buscar fotos!</button>
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
    render(){
        return (
            <div>
                <div className='gallery-container'>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src='https://apod.nasa.gov/apod/image/2212/Mars-Stereo.png' alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src={this.state.imageUrl} alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src='https://apod.nasa.gov/apod/image/2212/potm2211a.jpg' alt='image_test'/>
                        </a>
                        <figcaption>
                            This is a sample image
                        </figcaption>                            
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src={this.state.imageUrl} alt='image_test'/>
                        </a>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src={this.state.imageUrl} alt='image_test'/>
                        </a>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src={this.state.imageUrl} alt='image_test'/>
                        </a>
                    </figure>

                    <figure className='gallery-photo'>
                        <a href={this.state.imageUrl} target='_blank'>
                            <img className='gallery-photo-img' src={this.state.imageUrl} alt='image_test'/>
                        </a>
                    </figure>
                </div>
            </div>
        )
    }
}

export default PictureOfTheDay;
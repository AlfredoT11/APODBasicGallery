import React, { Fragment } from 'react';

import PhotoOfTheDay from './apod';
import PhotosGallery from './gallery';
import SearchNewPhotos from './searchPhotos';

import './mainPage.css'

class MainView extends React.Component{

    constructor(props){
        super(props);
        const todayDate = new Date();
        this.state = {
            photoTitle: "Strawberry Supermoon Over Devil's Saddle",
            copyright: "Lorenzo Busilacchi",
            date: "2022-12-04",
            description: "Near the horizon the full moon often seems to loom large, swollen in appearance by the famous Moon illusion. But time-lapse image sequences demonstrate that the Moon's angular size doesn't really change as it rises or sets. Its color does, though. Recording a frame about every 60 seconds, this image also shows how red the Sun can look while low on the horizon. The featured montage was taken from Cagliari, Sardinia, Italy, the day after June's Strawberry Moon, a full moon dubbed a supermoon due to its slightly larger-than-usual angular size.  This Strawberry Supermoon is seen rising behind the Devil's Saddle, a mountain named for the unusual moon-sized dip seen just to the right of the rising moon. A shrinking line-of-sight through planet Earth's dense and dusty atmosphere shifted the moonlight from strawberry red through honey-colored and paler yellowish hues. That change seems appropriate for a northern June Full Moon also known as the Strawberry or Honey Moon. A Thunder Supermoon -- the third of four supermoons in 2022 -- will occur later this month.   Today's Adventure Link: Click on \"Cagliari\"",
            imageUrl: "https://apod.nasa.gov/apod/image/2207/StrawberryMoonRise_Busilacchi_6720.jpg",
            currentSection: 'apod',
            startDate: todayDate.toISOString().split('T')[0],
            endDate: todayDate.toISOString().split('T')[0],
            photosInfo: []
        }
        this.changeToGallery = this.changeToGallery.bind(this);
        this.changeToApod = this.changeToApod.bind(this);
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

    changeToGallery(newStartDate){
        console.log("Galería" + newStartDate);
        this.setState({
            currentSection: 'gallery',
            startDate: newStartDate
        }, () => {
            const today = new Date();
            console.log("Stard date: " + this.state.startDate);
            const startDate = new Date(this.state.startDate);
            let twentyDaysLater = new Date(this.state.startDate);
            twentyDaysLater.setDate(twentyDaysLater.getDate() + 20);
    
            if(twentyDaysLater > today){
                console.log("Fecha mayor a hoy");
                twentyDaysLater.setDate(today.getDate());
            }else{
                console.log("Fecha válida");
            }

            console.log("Start: " + startDate.toISOString());
            console.log("Veinte: " + twentyDaysLater.toISOString());
            console.log("Hoy: " +  today.toISOString());
            
            fetch("https://api.nasa.gov/planetary/apod?" + new URLSearchParams({
                api_key: process.env.API_KEY,
                start_date: startDate.toISOString().split('T')[0],
                end_date: twentyDaysLater.toISOString().split('T')[0],
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
        });
    }

    changeToApod(photoInformation){
        this.setState({
            currentSection: 'apod',
            photoTitle: photoInformation.title,
            date: photoInformation.date,
            copyright: photoInformation.copyright,
            description: photoInformation.description,
            imageUrl: photoInformation.hdUrl ? photoInformation.hdUrl : photoInformation.url,
        })
    }

    render(){

        let mainViewComponent;
        if(this.state.currentSection === 'apod'){
            mainViewComponent = <PhotoOfTheDay 
                imageUrl={this.state.imageUrl} 
                copyright={this.state.copyright} 
                photoTitle={this.state.photoTitle} 
                description={this.state.description}
            />
        }else{
            mainViewComponent = <PhotosGallery 
                                    selectImage={this.changeToApod} 
                                    startDate={this.state.startDate} 
                                    endDate={this.state.endDate}
                                    photosInfo={this.state.photosInfo}
                                />
        }

        return (
            <Fragment>
                <div className='page-container-1'>
                    <div className='header-section'>
                        <h1>Fotos del 1 de noviembre del 2022 al 4 de noviembre del 2022</h1>
                    </div>
                    <div className='mainDiv'>
                        {mainViewComponent}
                    </div>
                    <div className='search-section'>
                        <SearchNewPhotos searchClickFunction={this.changeToGallery} />
                    </div>                    
                    <div className='footer-section'>
                        <p>Coded with love by Tona Díaz.</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainView;
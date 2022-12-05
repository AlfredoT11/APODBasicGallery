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
            photoTitle: 'Dark Ball in Inverted Starfield',
            copyright: 'N/A',
            date: '2022-11-06',
            description: 'Does this strange dark ball look somehow familiar? If so, that might be because it is our Sun. In the featured image from 2012, a detailed solar view was captured originally in a very specific color of red light, then rendered in black and white, and then color inverted. Once complete, the resulting image was added to a starfield, then also color inverted. Visible in the image of the Sun are long light filaments, dark active regions, prominences peeking around the edge, and a moving carpet of hot gas. The surface of our Sun can be a busy place, in particular during Solar Maximum, the time when its surface magnetic field is wound up the most. Besides an active Sun being so picturesque, the plasma expelled can also become picturesque when it impacts the Earth\'s magnetosphere and creates auroras.    Compute it Yourself: Browse 2,900+ codes in the Astrophysics Source Code Library',
            hdUrl: 'https://apod.nasa.gov/apod/image/2211/darksun_lafferty_1600.jpg',
            url: 'https://apod.nasa.gov/apod/image/2211/darksun_lafferty_960.jpg',
            currentSection: 'apod',
            startDate: todayDate.toISOString().split('T')[0],
            endDate: todayDate.toISOString().split('T')[0],
            photosInfo: []
        }
        this.changeToGallery = this.changeToGallery.bind(this);
        this.changeToApod = this.changeToApod.bind(this);
    }

    getPhotoOfToday(){
        const today = new Date();
        fetch('https://api.nasa.gov/planetary/apod?' + new URLSearchParams({
            api_key: 'DEMO_KEY',
            date: today.toISOString().split('T')[0]
        }),{
            method: 'GET'
        }).then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Something went wrong. Please try it later.');
            }
        })
        .then(data => {
            if(data.media_type === 'image'){
                this.setState({
                    photoTitle: data.title,
                    copyright: data.copyright ? data.copyright : 'N/A',
                    description: data.explanation,
                    hdUrl: data.hdUrl ? data.hdUrl : data.url,
                    url: data.url
                })
            }else{
                this.setState({
                    currentSection: 'dayWOPhoto'
                })
            }
        })
        .catch(error => alert(error));
    }

    getAndFilterNewPhotos(startDate, twentyDaysLater){
        fetch('https://api.nasa.gov/planetary/apod?' + new URLSearchParams({
            api_key: 'DEMO_KEY',
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
            let reduced = data.reduce((filteredData, photoInfo) => {
                if(photoInfo.media_type === 'image'){
                    const filteredImageInfo = {
                        title: photoInfo.title,
                        date: photoInfo.date,
                        hdUrl: photoInfo.hdurl ? photoInfo.hdurl : photoInfo.url,
                        url: photoInfo.url,
                        copyright: photoInfo.copyright ? photoInfo.copyright : 'N/A',
                        description: photoInfo.explanation
                    }
                    filteredData.push(filteredImageInfo);
                }
                return filteredData;
            }, []);
            this.setState({
                photosInfo: reduced
            })
        })
        .catch(error => alert(error));        
    }

    changeToGallery(newStartDate){
        this.setState({
            currentSection: 'gallery',
            startDate: newStartDate
        }, () => {
            const today = new Date();
            const startDate = new Date(this.state.startDate);
            let twentyDaysLater = new Date(this.state.startDate);
            twentyDaysLater.setDate(twentyDaysLater.getDate() + 20);
            if(twentyDaysLater > today){
                twentyDaysLater.setDate(today.getDate() - 1);
            }
            this.getAndFilterNewPhotos(startDate, twentyDaysLater);
        });
    }

    changeToApod(photoInformation){
        this.setState({
            currentSection: 'apod',
            photoTitle: photoInformation.title,
            date: photoInformation.date,
            copyright: photoInformation.copyright,
            description: photoInformation.description,
            url: photoInformation.url,
            hdUrl: photoInformation.hdUrl ? photoInformation.hdUrl : photoInformation.url,
        });
    }

    componentDidMount(){
        this.getPhotoOfToday();
    }

    render(){

        let mainViewComponent;
        if(this.state.currentSection === 'apod'){
            mainViewComponent = <PhotoOfTheDay 
                hdUrl={this.state.hdUrl}
                url={this.state.url}
                copyright={this.state.copyright} 
                photoTitle={this.state.photoTitle} 
                description={this.state.description}
            />
        }else if(this.state.currentSection === 'gallery'){
            mainViewComponent = <PhotosGallery 
                                    selectImage={this.changeToApod} 
                                    startDate={this.state.startDate} 
                                    endDate={this.state.endDate}
                                    photosInfo={this.state.photosInfo}
                                />
        }else{
            mainViewComponent = <h2>There isn't a photo today. ):</h2>
        }

        return (
            <Fragment>
                <div className='page-container-1'>
                    <div className='header-section'>
                        <h1>Astronomy Picture of the Day</h1>
                    </div>
                    <div className='mainDiv'>
                        {mainViewComponent}
                    </div>
                    <div className='search-section'>
                        <SearchNewPhotos searchClickFunction={this.changeToGallery} />
                    </div>                    
                    <div className='footer-section'>
                        <p>Coded by Tona Díaz.</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainView;
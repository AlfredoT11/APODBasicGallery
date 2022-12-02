import React from 'react';

import './main_page.css'

class PictureOfTheDay extends React.Component{
    render(){
        return (
            <div className='page-container'>
                <div className='header-section borders-gradient'>
                    <h1>Foto astronómica del día 1 de diciembre de 2022</h1>
                </div>
                
                <div className='photo-container'>
                    <a href="https://apod.nasa.gov/apod/image/2207/StrawberryMoonRise_Busilacchi_6720.jpg" target='_blank'>
                        <img className='apodPhoto' src='https://apod.nasa.gov/apod/image/2207/StrawberryMoonRise_Busilacchi_6720.jpg' alt='image_test'/>
                    </a>       
                </div>
                <div className='photo-information'>
                    <h2>Strawberry Supermoon Over Devil's Saddle</h2>
                    <h3>Copyright: Lorenzo Busilacchi</h3>
                    <p>
                        Near the horizon the full moon often seems to loom large, swollen in appearance by the famous Moon illusion. But time-lapse image sequences demonstrate that the Moon's angular size doesn't really change as it rises or sets. Its color does, though. Recording a frame about every 60 seconds, this image also shows how red the Sun can look while low on the horizon. The featured montage was taken from Cagliari, Sardinia, Italy, the day after June's Strawberry Moon, a full moon dubbed a supermoon due to its slightly larger-than-usual angular size.  This Strawberry Supermoon is seen rising behind the Devil's Saddle, a mountain named for the unusual moon-sized dip seen just to the right of the rising moon. A shrinking line-of-sight through planet Earth's dense and dusty atmosphere shifted the moonlight from strawberry red through honey-colored and paler yellowish hues. That change seems appropriate for a northern June Full Moon also known as the Strawberry or Honey Moon. A Thunder Supermoon -- the third of four supermoons in 2022 -- will occur later this month.   Today's Adventure Link: Click on \"Cagliari\"
                    </p>
                </div>
                
                <div className='search-section borders-gradient'>
                    <div className='search-new-photos'>
                        <p>¿No estás satisfecho con esta foto? ¡Busca alguna en un rango determinado!</p>
                        <form>
                            <div className='input-date'>
                                <label for='startDate'>Fecha de inicio: </label><input type='date' id='startDate'></input>
                            </div>
                            <div className='input-date'>
                                <label for='endDate'>Fecha final: </label><input type='date' id='endDate'></input>
                            </div>
                            <div className='get-photos-button'>
                                <button>¡Buscar fotos!</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className='footer-section-1'>
                    
                </div>
            </div>
        );
    }
}

export default PictureOfTheDay;
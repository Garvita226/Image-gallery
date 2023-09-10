import React, { useState } from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { images } from './imageData';
import './style.css'

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return images.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === images.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    const handleIndexChange = ({ curIndex }) => {
        // Update the current index in the state
        setCurrentIndex(curIndex);
    };

    const handleSwipeMoveX = (displacementX) => {
        // Determine the threshold for considering it a swipe (adjust as needed)
        const swipeThreshold = 50

        if (displacementX > swipeThreshold) {
            // Swipe to the right (previous image)
            setCurrentIndex((prevIndex) => {
                if (prevIndex === 0) {
                    // If at the first image, stay at the first image
                    return prevIndex;
                } else {
                    return prevIndex - 1;
                }
            });
        } else if (displacementX < -swipeThreshold) {
            // Swipe to the left (next image)
            setCurrentIndex((prevIndex) => {
                if (prevIndex === images.length - 1) {
                    // If at the last image, stay at the last image
                    return prevIndex;
                } else {
                    return prevIndex + 1;
                }
            });
        }
    };

    return (
        <div className='gallery'>
            <div className='imageHolder'>
                <Carousel images={images} index={currentIndex} className='carousel' onIndexChange={handleIndexChange} shouldSwipeOnMouse={true} swipeThreshold={0.1}
                    swipeRollbackSpeed={0.1}
                    onSwipeMoveX={handleSwipeMoveX}
                    shouldMaximizeOnClick={true} shouldMinimizeOnClick={true}
                    shouldMinimizeOnSwipeDown={true} />
                    
                <div className='navigation'>
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <span className='caption'><i>Image {currentIndex + 1} of {images.length}</i></span>
                    <button className='btn' onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Gallery

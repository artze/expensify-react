import React from 'react';
import loadingSpinner from '../assets/images/loader.gif'

const LoadingPage = () => (
    <div className="loader">
        <img className="loader__image" src={loadingSpinner} />
    </div>
)

export default LoadingPage;
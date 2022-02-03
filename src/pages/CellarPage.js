import React from 'react';
import StockTake from "../components/StockTake"

const CellarPage = () => {
    return (
        <div>
        <header className="masthead">
            <div className="container">
            <div className="masthead-heading text-uppercase">Welcome To Your Wine Cellar!</div>
                <div className="masthead-subheading">Help yourself</div>
                
            </div>
        </header>
         <StockTake/>
            
        </div>
    );
};

export default CellarPage;
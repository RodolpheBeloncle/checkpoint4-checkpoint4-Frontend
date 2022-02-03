import React from 'react';
import StockTake from "../components/StockTake"

const CellarPage = () => {
    return (
        <div>
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Welcome To Your Wine Cellar!</div>
                <div className="masthead-heading text-uppercase">Help Yourself</div>
            </div>
        </header>
         <StockTake/>
            
        </div>
    );
};

export default CellarPage;
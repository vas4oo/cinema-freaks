import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
    return (
        <div className="app-content">

            <div className="dashboard">
                <Link to="/movies">
                    <div className="card summary">
                        <span className="title">{"Movies"}</span>
                        <span className="detail">{"Check all movies"}</span>
                        <span className="count movies"><FontAwesomeIcon icon={faChevronRight} /></span>
                    </div>
                </Link>
            </div>

        </div>
    );
}

export default Home;

import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

interface IProps {
}

interface IState {
}

class FooterComponent extends React.Component<IProps, IState> {


    public render() {
        return (
            <>
                <div className="web-footer-small">
                    <div className="web-footer-small-container">
                        <div className="content-rights">
                            © 2020 Vasil Smolyanski All rights reserved
                        </div>
                        <div className="footer-menu">
                            <Link to="/cookie-policy">Cookies Policy</Link> | <Link to="/personal-data-policy">Personal Data Policy</Link>
                        </div>
                        <div className="web-footer-content social-links">
                            <a style={{ fontSize: 20 }} href="https://www.facebook.com/vas4oo" target="_blank" title="Facebook">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FooterComponent;
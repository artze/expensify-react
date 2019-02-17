import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>These are some info: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>These are priviledged info. Do not share!</p> }
            <WrappedComponent {...props}></WrappedComponent>
        </div>
    )
}

const AdminComponent = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { !props.isAuthenticated && <p>Please login to view info</p>  }
            { props.isAuthenticated && <WrappedComponent {...props} /> }
        </div>
    )
}

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminComponent isAdmin={true} info="some classified stuff" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="some classified stuff" />, document.getElementById('app'));
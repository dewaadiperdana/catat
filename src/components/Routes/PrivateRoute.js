import React, { Component } from 'react';
import {
    AsyncStorage,
    View,
    StyleSheet
} from 'react-native';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-native';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import { BASE_URL, AUTH_TOKEN, AUTH_USER } from '../config';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            redirect: false,
            isAuthenticated: true
        };
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem(AUTH_TOKEN);
        const { history } = this.props;

        if(!token) {
            this.setState({ loading: false });
            history.push('/');
            return;
        }

        let header = {
            'Authorization': `Bearer ${token}`
        };

        try {
            let response = await axios.post(`${BASE_URL}api/users/is-authenticated`, {}, {headers: header});
            this.setState({ loading: false, isAuthenticated: true });
            await AsyncStorage.setItem(AUTH_USER, JSON.stringify(response.data.user));
        } catch(error) {
            this.setState({ loading: false, isAuthenticated: false });
            this.props.history.push('/');
            return;   
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { loadingTextStyle } = styles;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <Route {...rest} render={props => (
                    <Component {...props}></Component>
                )} />
            </View>
        );
    }
}

export default withRouter(PrivateRoute);

const styles = StyleSheet.create({
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    }
});

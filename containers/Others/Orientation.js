import React, { Component } from "react";
import Orientation from "react-native-orientation";

export class PortraitScreen extends Component {

    constructor(props) {
        super(props);
        this._willFocusSubscription = this.props.navigation.addListener("willFocus", payload => {
            // lock to portrait when this screen is about to appear
            Orientation.lockToPortrait();
        })
    }

    componentWillUnmount() {
        // remove subscription when unmount
        this._willFocusSubscription.remove();
    }
}

export class LandscapeScreen extends Component {

    constructor(props) {
        super(props);
        this._willFocusSubscription = this.props.navigation.addListener("willFocus", payload => {
            // lock to landscape
            Orientation.lockToLandscape();
        })
    }

    componentWillUnmount() {
        // remove subscription either
        this._willFocusSubscription.remove();
    }
}
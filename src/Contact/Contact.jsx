import React from "react";
import { Button, Select } from 'antd';
import { connect } from "react-redux";
import ContactClass from './ContactClass';
import ContactMain from "./ContactMain";
import ContactDataEdit from "./ContactDataEdit";

import './Ui.css';


const Option = Select.Option;

class Contact extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { layoutType } = this.props;
        let layout;
        switch (layoutType) {
            case "Main":
                layout = (
                    <ContactMain />
                );
                break;
            case "ContactDataEdit":
                layout = (
                    <ContactDataEdit />
                );
                break;
            case "ContactClass":
                layout = (
                    <ContactClass />
                );
                break;
            default:
                layout = "";
        }

        return (
            <div className="container">
                {layout}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        layoutType: state.Layout.showType,
        contactClass: state.Class.contactTypeList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLayoutType: (LayoutType) => dispatch({ type: "changeType", layoutType: LayoutType })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
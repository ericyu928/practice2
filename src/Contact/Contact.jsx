import React from "react";
import { connect } from "react-redux";
import ContactClass from './ContactClass';
import ContactMain from "./ContactMain";
import ContactDataEdit from "./ContactDataEdit";
import ContactClassEdit from "./ContactClassEdit";
import './Ui.css';



class Contact extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { LayoutType, Params } = this.props;
        let layout;
        switch (LayoutType) {
            case "Main":
                layout = (
                    <ContactMain />
                );
                break;
            case "ContactDataEdit":
                layout = (
                    <ContactDataEdit Data={Params} />
                );
                break;
            case "ContactClass":
                layout = (
                    <ContactClass />
                );
                break;
            case "ContactClassEdit":
                layout = (
                    <ContactClassEdit Data={Params}/>
                );
                break;
            default:
                layout = (
                    <ContactMain />
                );
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
        LayoutType: state.Layout.LayoutType,
        Params: state.Layout.Params,
    }
}

export default connect(mapStateToProps)(Contact);
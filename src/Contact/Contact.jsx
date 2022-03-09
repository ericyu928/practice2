import React from "react";
import { connect } from "react-redux";


import ContactType from "./ContactType.jsx";
import ContactTable from "./ContactTable.jsx";
import ContactTypeList from "./ContactTypeList.jsx";
import ContactAdd from "./ContactAdd.jsx";

import './Ui.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContactTypeList: false,
            showContactAdd: false,
            classType: "*"
        }
    }
    openTypeList = () => {
        this.setState({
            showContactTypeList: true
        })
    }
    openAddList = () => {
        this.setState({
            showContactAdd: true,
        })
        this.props.editContact({
            ContactId: Math.random().toString(),
            ClassId: this.props.contacttypelist[0].ClassId,
            Classname: this.props.contacttypelist[0].Name,
            Name: '',
            Sex: '男',
            Phone: '',
            Address: '',
            Email: ''
        }, true);
    }
    contactTypeSelect = (typeValue) => {
        this.setState({
            classType: typeValue
        })
    }
    showContactClassType = (onshow) => {
        this.setState({
            showContactTypeList: onshow
        })
    }
    showContactAdd = (onshow) => {
        this.setState({
            showContactAdd: onshow,
        })
    }
    openContactEdit = () => {
        this.setState({
            showContactAdd: true
        })
    }
    contactDeleted = (contactId) => {
        this.setState({ showContactAdd: false })
    }
    render() {
        return (
            <div className="container">
                {this.state.showContactTypeList && <ContactTypeList onShow={this.showContactClassType} />}
                {!this.state.showContactTypeList && !this.state.showContactAdd ?
                    <div>
                        <div className='contacttypetitle'>
                            <button type="button" onClick={this.openTypeList}>類別維護</button>
                        </div>
                        <h1>通訊錄</h1>
                        <label className="textlabel" style={{ marginLeft: 30 }}>類別</label>
                        <ContactType typeSelected={this.contactTypeSelect} classType={this.state.classType} />
                        <button className="enter" type="button" onClick={this.openAddList}>新增</button>
                        <ContactTable classType={this.state.classType} openContactEdit={this.openContactEdit}/>
                    </div>
                    :
                    <div></div>
                }
                {this.state.showContactAdd && <ContactAdd onEditContact={this.showContactAdd} onDelete={this.contactDeleted} />}
            </div>


        )
    }
}

const useReduxProps = state => {
    return {
        contacttypelist: state.List.contacttypelist,
        contactData: state.Data.contactData,
        contactAddMode: state.Data.contactAddMode
    }
}
const useReduxSelector = dispatch => {
    return {
        delContactList: (contactId) => dispatch({ type: 'delContactList', contactId: contactId }),
        editContact: (editContactData, contactAddMode) => dispatch({ type: 'editContactData', editContactData: editContactData, contactAddMode: contactAddMode })
    }
}

export default connect(useReduxProps, useReduxSelector)(Contact);
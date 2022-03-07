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
            classType: "*",
            addMode: false,
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
        this.props.openAddList({
            ContactId: Math.random().toString(),
            ClassId: this.props.contacttypelist[0].ClassId,
            Name: '',
            Sex: '男',
            Phone: '',
            Address: '',
            Email: ''
        },true);
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
    editData = () => {
        this.setState({
            showContactAdd: true
        })
    }
    contactDeleted = (contactId) => {
        this.props.delContactList(contactId);
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
                        <div>
                            <h1>通訊錄</h1>
                        </div>
                        <div>
                            <label className="textlabel" style={{ marginLeft: 30 }}>類別</label>
                            <ContactType typeSelected={this.contactTypeSelect} />
                            <button className="enter" type="button" onClick={this.openAddList}>新增</button>
                        </div>
                        <ContactTable classType={this.state.classType} contactData={this.props.contactData}
                            editContactData={this.editData}
                        />
                    </div>
                    :
                    <div></div>
                }
                {this.state.showContactAdd && <ContactAdd onShow={this.showContactAdd} onDelete={this.contactDeleted} />}
            </div>


        )
    }
}

const useReduxProps = state => {
    return {
        contacttypelist: state.ContactTypeReducer.contacttypelist,
        contactData: state.ContactListReducer.contactData,
        contactAddMode: state.ContactListReducer.contactAddMode
    }
}
const useReduxSelector = dispatch => {
    return {
        delContactList: (contactId) => dispatch({ type: 'delContactList', contactId: contactId }),
        openAddList: (editContactData, contactAddMode) => dispatch({ type: 'openAddList', editContactData: editContactData, contactAddMode: contactAddMode })
    }
}

export default connect(useReduxProps, useReduxSelector)(Contact);
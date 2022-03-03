import React from "react";
import { connect } from "react-redux";

import ContactClass from "../ContactClass.json";
import ContactData from "../ContactData.json";


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
            contacttypelist: ContactClass,
            contactData: ContactData,
            newContactData: [],
            editContactData: [],
            addMode: false,
            deleteContactId: ''
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
            addMode: true,
            editContactData: {
                ContactId: Math.random().toString(),
                ClassId: this.props.contacttypelist[0].ClassId,
                Name: '',
                Sex: '男',
                Phone: '',
                Address: '',
                Email: ''
            }

        })
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
    setContactTypeList = (contacttype) => {
        this.setState({
            contacttypelist: contacttype
        })
    }
    setContactList = (contact) => {
        if (contact.length !== 0) {
            if (this.state.addMode) {
                this.props.addContactList(contact);
            }
            else {
                this.props.editContactList(contact);
            }
        }
    }
    editData = (ContactData, mode) => {
        this.setState({
            editContactData: ContactData,
            showContactAdd: true,
            addMode: mode
        })
    }
    contactDeleted = (contactId) => {
        this.props.delContactList(contactId);
        this.setState({ showContactAdd: false })
    }
    render() {
        return (
            <div className="container">
                {this.state.showContactTypeList && <ContactTypeList onShow={this.showContactClassType}
                    onContactTypeList={this.setContactTypeList} contacttypeList={this.props.contacttypelist} />}
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
                            <ContactType typeSelected={this.contactTypeSelect} contacttypeList={this.props.contacttypelist} />
                            <button className="enter" type="button" onClick={this.openAddList}>新增</button>
                        </div>
                        <ContactTable classType={this.state.classType} contactData={this.props.contactData}
                            editContactData={this.editData}
                        />
                    </div>
                    :
                    <div></div>
                }
                {this.state.showContactAdd && <ContactAdd onShow={this.showContactAdd} onDelete={this.contactDeleted}
                    onContactList={this.setContactList}
                    onContactData={this.state.editContactData}
                    addMode={this.state.addMode}
                    contactClassList={this.props.contacttypelist} />}
            </div>


        )
    }
}

const useReduxProps = state => {
    return {
        contacttypelist: state.contacttypelist,
        contactData: state.contactData
    }
}
const useReduxSelector = dispatch => {
    return {
        addContactList: (contact) => dispatch({ type: 'addContactList', contact: contact }),
        editContactList: (contact) => dispatch({ type: 'editContactList', contact: contact }),
        delContactList: (contactId) => dispatch({ type: 'delContactList', contactId: contactId }),
    }
}

export default connect(useReduxProps, useReduxSelector)(Contact);
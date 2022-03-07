import React from "react";

import { connect } from 'react-redux'

class ContactTable extends React.Component {
    constructor(props) {
        super(props);
    }
    editContactData = event => {
        this.props.editContact(event, false);
        this.props.editContactData();

    }
    render() {
        let newContactList = [];
        if (this.props.classType !== "*") {
            for (let i = 0; i < this.props.contactData.length; i++) {
                if (this.props.classType === this.props.contactData[i].ClassId) {
                    newContactList.push(this.props.contactData[i])
                }
            }
        }
        else {
            for (let i = 0; i < this.props.contactData.length; i++) {
                newContactList.push(this.props.contactData[i])
            }
        }
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>名稱</th>
                                <th>性別</th>
                                <th>郵件</th>
                                <th>電話</th>
                                <th>地址</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newContactList.map((contacts) =>
                                <tr key={contacts.ContactId}>
                                    <td>{contacts.Name}</td>
                                    <td>{contacts.Sex}</td>
                                    <td>{contacts.Email}</td>
                                    <td>{contacts.Phone}</td>
                                    <td>{contacts.Address}</td>
                                    <td className="editbutton"><button className="back" onClick={this.editContactData.bind(this, contacts)}>修改</button></td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const useReduxProps = state => {
    return {
        contactData: state.Data.contactData,
    }
}

const useReduxSelector = dispatch =>{
    return{
        editContact:(contact,addMode)=>dispatch({type:'editContactData',editContactData:contact,contactAddMode:addMode})
    }
}

export default connect(useReduxProps,useReduxSelector)(ContactTable);
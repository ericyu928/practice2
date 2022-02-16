import React from "react";

class ContactTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactList: this.props.contactData,
            contactClassType: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.contactData !== this.props.contactData) {
            this.setState({
                contactList: this.props.contactData
            })
        }
    }
    editContactData = event =>{
        this.props.editContactData(event,false)
    }
    render() {
        let newContactList = [];
        if (this.props.classType !== "*") {
            for (let i = 0; i < this.state.contactList.length; i++) {
                if (this.props.classType === this.state.contactList[i].ClassId) {
                    newContactList.push(this.state.contactList[i])
                }
            }
        }
        else {
            for (let i = 0; i < this.state.contactList.length; i++) {
                newContactList.push(this.state.contactList[i])
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
                                    <td className="editbutton"><button className="back" onClick={this.editContactData.bind(this,contacts)}>修改</button></td>
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

export default ContactTable;
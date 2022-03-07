import React from "react";

import { connect } from 'react-redux';
import TypeError from "./TypeError";

class ContactAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactId: this.props.contactId,
            name: this.props.name,
            sex: this.props.sex,
            email: this.props.email,
            phone: this.props.phone,
            address: this.props.address,
            errorType: false
        }
    }
    nameTyped = event => {
        this.setState({
            name: event.target.value
        })
    }
    sexTyped = event => {
        this.setState({
            sex: event.target.value
        })
    }
    emailTyped = event => {
        this.setState({
            email: event.target.value
        })
    }
    phoneTyped = event => {
        this.setState({
            phone: event.target.value
        })
    }
    addressTyped = event => {
        this.setState({
            address: event.target.value
        })
    }
    onClickSave = event => {
        let editContactList = []
        if (event && (this.state.name === "" || this.state.phone === "" || this.state.address === "" ||
            this.state.email === "")) {
            this.setState({
                errorType: true
            })
        }
        else {
            if (event) {
                editContactList = {
                    ContactId: this.state.contactId,
                    ClassId: this.props.classid,
                    Name: this.state.name,
                    Sex: this.state.sex,
                    Phone: this.state.phone,
                    Address: this.state.address,
                    Email: this.state.email
                }
                this.props.saveClick(editContactList,this.props.contactAddMode)
            }
            this.props.onShow(false)
        }
    }
    isAddMode = () => {
        if (!this.props.contactAddMode) {
            return <label>修改通訊錄</label>
        }
        else {
            return <label>新增通訊錄</label>
        }
    }
    deleteContact = () => {
        this.props.onDelete(this.state.contactId)
    }
    deleteButton = () => {
        if (!this.props.contactAddMode) {
            return <button className="del" onClick={this.deleteContact}>刪除</button>
        }
        else {
            return <div style={{ display: "none" }}></div>
        }
    }
    checkTyped = (onOk) => {
        this.setState({
            errorType: onOk
        })
    }
    render() {
        return (
            <div>
                {this.state.errorType && <TypeError onCheck={this.checkTyped} />}
                {!this.state.errorType && <div>
                    <this.isAddMode />
                    <br></br>
                    <div>
                        <label className="textlabel">類別</label>
                        <input className="readonly" type="text" value={this.props.className} readOnly="readonly"></input>
                    </div>
                    <div>
                        <label className="textlabel">姓名</label>
                        <input type="text" value={this.state.name} placeholder="姓名" onChange={this.nameTyped}></input>
                    </div>
                    <div>
                        <label className="textlabel">性別</label>
                        <select value={this.state.sex} onChange={this.sexTyped}>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </div>
                    <div>
                        <label className="textlabel">Email</label>
                        <input type="email" value={this.state.email} placeholder="Email" onChange={this.emailTyped}></input>
                    </div>
                    <div>
                        <label className="textlabel">電話</label>
                        <input type="text" value={this.state.phone} placeholder="電話" onChange={this.phoneTyped}></input>
                    </div>
                    <div>
                        <label className="textlabel">地址</label>
                        <input type="text" value={this.state.address} placeholder="地址" onChange={this.addressTyped}></input>
                    </div>
                    <button className="enter" type="button" onClick={this.onClickSave.bind(this, true)}>儲存</button>
                    <this.deleteButton />
                    <button className="back" type="button" onClick={this.onClickSave.bind(this, false)}>取消</button>
                </div>
                }
            </div>
        )
    }
}

const useReduxProps = state => {
    let cName;
    let cId;
    let conId;
    if (state.ContactListReducer.editContactData.ClassId !== "") {
        cId = state.ContactListReducer.editContactData.ClassId;
        for (let i = 0; i < state.ContactTypeReducer.contacttypelist.length; i++) {
            if (state.ContactTypeReducer.contacttypelist[i].ClassId === state.ContactListReducer.editContactData.ClassId) {
                cName = state.ContactTypeReducer.contacttypelist[i].Name
                break;
            }
        }
    }
    else {
        cId = state.ContactTypeReducer.contacttypelist[0].ClassId
        cName = state.ContactTypeReducer.contacttypelist[0].Name
    }
    if (state.ContactListReducer.editContactData.ContactId === "") {
        conId = Math.random().toString();
    }
    else {
        conId = state.ContactListReducer.editContactData.ContactId
    }
    return {
        classid: cId,
        className: cName,
        contactId: conId,
        name: state.ContactListReducer.editContactData.Name,
        sex: state.ContactListReducer.editContactData.Sex,
        email: state.ContactListReducer.editContactData.Email,
        phone: state.ContactListReducer.editContactData.Phone,
        address: state.ContactListReducer.editContactData.Address,
        contactAddMode:state.ContactListReducer.contactAddMode
    }
}
const useReduxSelector = dispatch => {
    return {
        saveClick: (editContactData,contactAddMode) => dispatch({ type: 'saveContactData', editContactData: editContactData,contactAddMode: contactAddMode  })
    }
}


export default connect(useReduxProps, useReduxSelector)(ContactAdd);
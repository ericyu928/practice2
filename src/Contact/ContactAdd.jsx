import React from "react";

import TypeError from "./TypeError";

class ContactAdd extends React.Component {
    constructor(props) {
        super(props);
        let cName;
        let cId;
        let conId;
        if (this.props.onContactData.ClassId !== "") {
            cId = this.props.onContactData.ClassId;
            for (let i = 0; i < this.props.contactClassList.length; i++) {
                if (this.props.contactClassList[i].ClassId === this.props.onContactData.ClassId) {
                    cName = this.props.contactClassList[i].Name
                    break;
                }
            }
        }
        else {
            cId = this.props.contactClassList[0].ClassId
            cName = this.props.contactClassList[0].Name
        }
        if(this.props.onContactData.ContactId===""){
            conId=Math.random().toString();
        }
        else{
            conId= this.props.onContactData.ContactId
        }
        this.state = {
            classid: cId,
            className: cName,
            contactId: conId,
            name: this.props.onContactData.Name,
            sex: this.props.onContactData.Sex,
            email: this.props.onContactData.Email,
            phone: this.props.onContactData.Phone,
            address: this.props.onContactData.Address,
            addMode: this.props.addMode,
            contactData: this.props.onContactData,
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
        if ((this.state.name === "" || this.state.phone === "" || this.state.address === "" ||
            this.state.email === "")&& event) {
            this.setState({
                errorType: true
            })
        }
        else {
            if (event) {           
                editContactList = {
                    ContactId: this.state.contactId,
                    ClassId: this.state.classid,
                    Name: this.state.name,
                    Sex: this.state.sex,
                    Phone: this.state.phone,
                    Address: this.state.address,
                    Email: this.state.email
                }
            }
            console.log(editContactList)

            this.props.onContactList(editContactList)
            this.props.onShow(false)
        }
    }
    isAddMode = () => {
        if (!this.state.addMode) {
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
        if (!this.state.addMode) {
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
                        <input className="readonly" type="text" value={this.state.className} readOnly="readonly"></input>
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

export default ContactAdd;
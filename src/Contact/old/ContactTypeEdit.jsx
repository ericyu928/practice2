import React from "react";
import { connect } from "react-redux";
import { Button, Input, message } from 'antd';

class ContactTypeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.nameRef = React.createRef();
    }
    componentDidMount() {
        this.nameRef.current.focus();
        this.setState({
            name: this.props.editContactType.Name
        })
    }
    nameTyped = event => {
        this.setState({
            name: event.target.value
        })
    }
    saveClick = event => {
        if (event && this.state.name === "") {
          message.error("名稱不可為空");
        }
        else {
            let { classAddMode, saveContactTypeList, editContactType, contacttypelist, onEdit } = this.props;

            if (event) {
                if (classAddMode) {
                    saveContactTypeList(
                        [...contacttypelist, {
                            ClassId: editContactType.ClassId,
                            Name: this.state.name,
                            UserId: editContactType.UserId
                        }]
                    )
                }
                else {
                    let newItems = []
                    for (let i = 0; i < contacttypelist.length; i++) {
                        if (editContactType.ClassId === contacttypelist[i].ClassId) {
                            newItems = [...contacttypelist];
                            newItems[i].Name = this.state.name;
                            break;
                        }
                    }
                    saveContactTypeList(newItems);
                }
            }
            onEdit()//關閉編輯頁
        }
    }
    deleteContact = () => {
        let newItems = [];
        let { editContactType, contacttypelist, saveContactTypeList, onEdit } = this.props;

        for (let i = 0; i < contacttypelist.length; i++) {
            if (editContactType.ClassId === this.props.contacttypelist[i].ClassId) {
                newItems = [...contacttypelist];
                newItems.splice(i, 1);
                break;
            }
        }
        saveContactTypeList(newItems);
        onEdit()//關閉編輯頁
    }
    render() {
        return (
            <div className="ctype">
                {!this.props.classAddMode && <label>修改類別</label>}
                {this.props.classAddMode && <label>新增類別</label>}
                <p className="textlabel">名稱:</p>
                <Input type='text' placeholder="名稱" value={this.state.name} onChange={this.nameTyped} ref={this.nameRef}></Input>
                <Button type="primary" onClick={this.saveClick.bind(this, true)}>儲存</Button>
                {!this.props.classAddMode && <Button type='danger' onClick={this.deleteContact}>刪除</Button>}
                <Button onClick={this.saveClick.bind(this, false)}>取消</Button>
            </div>
        )
    }
}

const useReduxProps = state => {
    return {
        classAddMode: state.List.classAddMode,
        editContactType: state.List.editContactType,
        contacttypelist: state.List.contacttypelist
    }
}

const useReduxSelector = dispatch => {
    return {
        saveContactTypeList: (contacttypelist) => dispatch({ type: 'saveContactTypeList', contacttypelist: contacttypelist })
    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTypeEdit);
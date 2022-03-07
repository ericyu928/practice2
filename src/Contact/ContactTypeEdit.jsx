import React from "react";
import { connect } from "react-redux";

import TypeError from "./TypeError";

class ContactTypeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.editContactType.Name,
            errorType: false
        }
    }
    nameTyped = event => {
        this.setState({
            name: event.target.value
        })
    }
    saveClick = event => {
        if (event && this.state.name === "") {
            this.setState({
                errorType: true
            })
        }
        else {
            if (event) {
                this.props.saveClick({
                    ClassId: this.props.editContactType.ClassId,
                    Name: this.state.name,
                    UserId: this.props.editContactType.UserId
                })
            }
            this.props.onEdit()
        }
    }
    isAddMode = () => {
        if (!this.props.classAddMode) {
            return <label>修改類別</label>
        }
        else {
            return <label>新增類別</label>
        }
    }
    deleteContact = () => {
        this.props.onDelete(this.props.editContactType.ClassId)
    }
    deleteButton = () => {
        if (!this.props.classAddMode) {
            return <button className="del" onClick={this.deleteContact}>刪除</button>
        }
        else {
            return <div style={{ display: "none" }}></div>
        }
    }
    checkTyped = () => {
        this.setState({
            errorType: false
        })

    }
    render() {
        return (
            <div>
                {this.state.errorType && <TypeError onCheck={this.checkTyped} />}
                {!this.state.errorType &&
                    <div>
                        <this.isAddMode />
                        <div>
                            <label className="textlabel">名稱:</label>
                        </div>
                        <div>
                            <input type='text' placeholder="名稱" value={this.state.name} onChange={this.nameTyped}></input>
                        </div>
                        <div>
                            <button className="enter" type="button" onClick={this.saveClick.bind(this, true)}>儲存</button>
                            <this.deleteButton />
                            <button className="back" type="button" onClick={this.saveClick.bind(this, false)}>取消</button>
                        </div>
                    </div>}
            </div>
        )
    }
}

const useReduxProps = state => {
    return {
        classAddMode: state.ContactTypeReducer.classAddMode,
        editContactType: state.ContactTypeReducer.editContactType
    }
}

const useReduxSelector = dispatch => {
    return {
        saveClick: (newClass) => dispatch({ type: 'saveContactType', newClass: newClass })
    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTypeEdit);
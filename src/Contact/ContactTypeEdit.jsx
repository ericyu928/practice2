import React from "react";

import TypeError from "./TypeError";

class ContactTypeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ClassId: '',
            addMode: false,
            errorType: false
        }
    }
    componentDidMount(){
        this.setState({
            name: this.props.onClickName,
            ClassId: this.props.onClickClassId,
            addMode: this.props.addMode
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.state.addMode) {
            if (prevProps.onClickClassId !== this.props.onClickClassId) {
                this.setState({
                    name: this.props.onClickName,
                    ClassId: this.props.onClickClassId
                })
            }
        }
    }
    nameTyped = event => {
        this.setState({
            name: event.target.value
        })
    }
    saveClick = event => {
        let newClass = [];
        if (this.state.name === "" && event) {
            this.setState({
                errorType: true
            })
        }
        else {
            if (event) {
                if (!this.state.addMode) {
                    newClass = {
                        ClassId: this.state.ClassId,
                        Name: this.state.name,
                        UserId: 'Eric'
                    }
                }
                else {
                    newClass = {
                        ClassId: Math.random().toString(),
                        Name: this.state.name,
                        UserId: 'Eric'
                    }
                }
            }

            this.props.onEdit(newClass)
            this.setState({ name: '' })
        }

    }
    isAddMode = () => {
        if (!this.state.addMode) {
            return <label>修改類別</label>
        }
        else {
            return <label>新增類別</label>
        }
    }
    deleteContact = () => {
        this.props.onDelete(this.state.ClassId)
    }
    deleteButton = () => {
        if (!this.state.addMode) {
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

export default ContactTypeEdit;
import React from "react";

import ContactTypeEdit from "./ContactTypeEdit";

import './Ui.css';


class ContactTypeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactclasslist: this.props.contacttypeList,
            contactTypeEdit: false,
            newclass: [],
            clickClassId: '',
            clickName: '',
            addMode: true,
            deleteClassId: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.newclass !== this.state.newclass) {
            if (this.state.addMode) {
                this.setState({
                    contactclasslist: [...prevState.contactclasslist, this.state.newclass]
                })

            }
            else {
                for (let i = 0; i < this.state.contactclasslist.length; i++) {
                    if (this.state.newclass.ClassId === this.state.contactclasslist[i].ClassId) {
                        this.setState(() => {
                            const newItems = [...prevState.contactclasslist];
                            newItems[i].Name = this.state.newclass.Name;
                            return { contactclasslist: newItems };
                        })
                        break;
                    }
                }
            }
        }
        if (prevState.deleteClassId !== this.state.deleteClassId) {
            for (let i = 0; i < this.state.contactclasslist.length; i++) {
                if (this.state.deleteClassId === this.state.contactclasslist[i].ClassId) {
                    this.setState(() => {
                        const newItems = [...prevState.contactclasslist];
                        newItems.splice(i,1);
                        return { contactclasslist: newItems };
                    })
                    break;
                }
            }
        }
    }
    editContactType = () => {
        this.setState({
            contactTypeEdit: true,
            addMode: true,
            clickClassId: Math.random().toString(),
            clickName: ''
        })
    }
    classEdited = (newClass) => {
        this.setState({
            contactTypeEdit: false
        })
        if (newClass.length !== 0 && newClass.Name !== "") {
            this.setState({
                contactTypeEdit: false,
                newclass: newClass
            })
        }
    }
    classDeleted = (classId) => {
        this.setState({
            contactTypeEdit: false,
            deleteClassId: classId
        })
    }
    editClass = event => {
        this.setState({
            contactTypeEdit: true,
            clickClassId: event.ClassId,
            clickName: event.Name,
            addMode: false
        })
    }
    hideContactType = () => {
        this.props.onShow(false)
        this.props.onContactTypeList(this.state.contactclasslist)
    }
    render() {
        return (
            <div className="container">
                {!this.state.contactTypeEdit && <div>
                    <div>
                        <label>類別維護</label>
                    </div>
                    <div>
                        <button className="back" onClick={this.hideContactType}>返回</button>
                        <button className="enter" onClick={this.editContactType}>新增</button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>名稱</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contactclasslist.map((conlist) =>
                                    <tr>
                                        <td>
                                            <button className="classlistitem" onClick={this.editClass.bind(this, conlist)}>{conlist.Name}</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                <div>
                    {this.state.contactTypeEdit && <ContactTypeEdit onEdit={this.classEdited} onDelete={this.classDeleted}
                        onClickClassId={this.state.clickClassId}
                        onClickName={this.state.clickName}
                        addMode={this.state.addMode} />}
                </div>
            </div>
        )
    }
}

export default ContactTypeList;
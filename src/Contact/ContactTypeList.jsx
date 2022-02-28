import React from "react";
import { connect } from "react-redux";
import ContactTypeEdit from "./ContactTypeEdit";

import './Ui.css';


class ContactTypeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactclasslist: [],
            contactTypeEdit: false,
            newclass: [],
            clickClassId: '',
            clickName: '',
            addMode: true,
            deleteClassId: ''
        }
    }
    componentDidMount() {
        this.setState({
            contactclasslist: this.props.contacttypeList
        })
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
            if (this.state.addMode) {
                // this.setState({
                //     contactclasslist: [...this.state.contactclasslist, newClass]
                // })
                this.props.addContactList();
            }
            else {
                // for (let i = 0; i < this.state.contactclasslist.length; i++) {
                //     if (newClass.ClassId === this.state.contactclasslist[i].ClassId) {
                //         this.setState(() => {
                //             const newItems = [...this.state.contactclasslist];
                //             newItems[i].Name = newClass.Name;
                //             return { contactclasslist: newItems };
                //         })
                //         break;
                //     }
                // }
                this.props.editContactList();
            }
        }
    }
    classDeleted = (classId) => {
        // for (let i = 0; i < this.state.contactclasslist.length; i++) {
        //     if (classId === this.state.contactclasslist[i].ClassId) {
        //         this.setState(() => {
        //             const newItems = [...this.state.contactclasslist];
        //             newItems.splice(i, 1);
        //             return {
        //                 contactclasslist: newItems, contactTypeEdit: false,
        //             };
        //         })
        //         break;
        //     }
        // }
        this.setState({
            contactTypeEdit: false
        })
        this.props.deleteContactList();

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
        this.props.onContactTypeList(this.props.contacttypelist)
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
                                {this.props.contacttypelist.map((conlist) =>
                                    <tr key={conlist.ClassId}>
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

const useReduxProps = state => {
    return {
        contacttypelist: state.contacttypelist
    }
}

const useReduxSelector = dispatch => {
    return {
        addContactList: () => dispatch({ type: 'addContactList', newClass: this.props.newClass }),
        editContactList: () => dispatch({ type: 'editContactList', newClass: this.props.newClass }),
        deleteContactList: () => dispatch({ type: 'deleteContactList', classId: this.props.classId }),
    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTypeList);
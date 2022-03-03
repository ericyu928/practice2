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
                this.props.addContactTypeList(newClass);
            }
            else {
                this.props.editContactTypeList(newClass);
            }
        }
    }
    classDeleted = (classId) => {
         this.setState({
            contactTypeEdit: false
        })
        this.props.deleteContactTypeList(classId);

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
        addContactTypeList: (newClass) => dispatch({ type: 'addContactTypeList', newClass: newClass }),
        editContactTypeList: (newClass) => dispatch({ type: 'editContactTypeList', newClass: newClass }),
        deleteContactTypeList: (classId) => dispatch({ type: 'deleteContactTypeList', classId: classId }),
    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTypeList);
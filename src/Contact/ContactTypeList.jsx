import React from "react";
import { connect } from "react-redux";
import ContactTypeEdit from "./ContactTypeEdit";

import './Ui.css';


class ContactTypeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactTypeEdit: false,
            deleteClassId: ''
        }
    }
    editContactType = () => {
        this.setState({
            contactTypeEdit: true
        })
        this.props.openClassEdit(true, {
            ClassId: Math.random().toString(),
            Name: '',
            UserId: 'Eric'
        })
    }
    classEdited = () => {
        this.setState({
            contactTypeEdit: false
        })
    }
    classDeleted = (classId) => {
        this.setState({
            contactTypeEdit: false
        })
        this.props.deleteContactTypeList(classId);

    }
    editClass = event => {
        this.setState({
            contactTypeEdit: true
        })
        this.props.openClassEdit(false, {
            ClassId: event.ClassId,
            Name: event.Name
        })
    }
    hideContactType = () => {
        this.props.onShow(false)
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
                        onClickName={this.state.clickName} />}
                </div>
            </div>
        )
    }
}

const useReduxProps = state => {
    return {
        contacttypelist: state.List.contacttypelist,
        classAddMode: state.List.classAddMode
    }
}

const useReduxSelector = dispatch => {
    return {
        deleteContactTypeList: (classId) => dispatch({ type: 'deleteContactTypeList', classId: classId }),
        openClassEdit: (classAddMode, editContactType) => dispatch({ type: 'openClassEdit', classAddMode: classAddMode, editContactType: editContactType }),

    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTypeList);
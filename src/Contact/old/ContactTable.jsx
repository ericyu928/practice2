import React from "react";

import { connect } from 'react-redux'

import { Table, Button } from 'antd'

class ContactTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newContactList: [],
            classType: "*"
        }
        this.columns = [
            {
                title: '名稱',
                dataIndex: 'Name',
                align: 'center'
            },
            {
                title: '性別',
                dataIndex: 'Sex',
                align: 'center'
            },
            {
                title: '郵件',
                dataIndex: 'Email',
                align: 'center'
            },
            {
                title: '電話',
                dataIndex: 'Phone',
                align: 'center'
            },
            {
                title: '地址',
                dataIndex: 'Address',
                align: 'center'
            },
            {
                render: (record) => (
                    <Button shape="round" type="primary" onClick={this.editContactData.bind(this, record)}>修改</Button>
                )
            }
        ]
    }
    editContactData = event => {
        let { editContact, openContactEdit } = this.props;

        editContact(event, false);
        openContactEdit();
    }
    componentDidMount() {
        let { contactData } = this.props;

        let newList = []
        for (let i = 0; i < contactData.length; i++) {
            newList.push(contactData[i])
            this.setState({
                newContactList: newList
            })
        }
    }
    componentDidUpdate(prevState, prevProps) {
        let { classType, contactData } = this.props;

        if (this.state.classType !== classType) {
            let newList = []
            for (let i = 0; i < contactData.length; i++) {
                if (classType !== "*") {
                    if (classType === contactData[i].ClassId) {
                        newList.push(contactData[i])
                    }
                }
                else {
                    newList.push(contactData[i])
                }
            }
            this.setState({
                classType: classType,
                newContactList: newList
            })
        }
    }

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.newContactList}
                rowKey={(recond, index) => "row_" + index}
            />
        )
    }
}

const useReduxProps = state => {
    return {
        contactData: state.Data.contactData,
    }
}

const useReduxSelector = dispatch => {
    return {
        editContact: (contact, addMode) => dispatch({ type: 'editContactData', editContactData: contact, contactAddMode: addMode })
    }
}

export default connect(useReduxProps, useReduxSelector)(ContactTable);
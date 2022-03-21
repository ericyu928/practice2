import React from "react";
import { Form, Input, Select, Button } from 'antd';
import TypeError from "./TypeError";
import { connect } from 'react-redux';

const Option = Select.Option;


class ContactAdd extends React.Component {
    constructor(props) {
        super(props);
    }
    formRef = React.createRef();

    componentDidMount() {
        let { editContactData } = this.props;
        this.formRef.current.setFieldsValue({
            ContactId: editContactData.ContactId,
            Classname: editContactData.Classname,
            ClassId: editContactData.ClassId,
            Name: editContactData.Name,
            Sex: editContactData.Sex,
            Phone: editContactData.Phone,
            Address: editContactData.Address,
            Email: editContactData.Email
        });
    }
    deleteContact = () => {
        let { contactData, editContactData, onDelete, saveContactData } = this.props;
        let newItems = [];
        for (let i = 0; i < contactData.length; i++) {
            if (editContactData.ContactId === contactData[i].ContactId) {
                newItems = [...contactData];
                newItems.splice(i, 1);
                break;
            }
        }
        saveContactData(newItems)
        onDelete()//刪除關閉編輯頁
    }
    onCancel = () => {
        this.props.onEditContact(false)
    }
    formsubmit = (value) => {
        let { contactAddMode, saveContactData, contactData, editContactData, onEditContact } = this.props;

        if (contactAddMode) {
            saveContactData([...contactData,
            {
                ContactId: editContactData.ContactId,
                ClassId: editContactData.ClassId,
                Classname: editContactData.Classname,
                Name: value.Name,
                Sex: value.Sex,
                Phone: value.Phone,
                Address: value.Address,
                Email: value.Email
            }])
        }
        else {
            let newItems = [];
            for (let i = 0; i < contactData.length; i++) {
                if (editContactData.ContactId === contactData[i].ContactId) {
                    newItems = [...contactData];
                    newItems[i] = {
                        ContactId: editContactData.ContactId,
                        ClassId: editContactData.ClassId,
                        Classname: editContactData.Classname,
                        Name: value.Name,
                        Sex: value.Sex,
                        Phone: value.Phone,
                        Address: value.Address,
                        Email: value.Email
                    };
                    break;
                }
            }
            saveContactData(newItems);
        }
        onEditContact(false)

    }
    render() {
        let { contactAddMode } = this.props;
        return (
            <Form ref={this.formRef} onFinish={this.formsubmit}>
                {contactAddMode && <label>新增通訊錄</label>}
                {!contactAddMode && <label>修改通訊錄</label>}
                <br></br>
                <Form.Item name="Classname" label="類別">
                    <Input className="readonly" readOnly="readonly" />
                </Form.Item>
                <Form.Item name="Name" label="姓名" rules={[{ required: true, message: '請輸入姓名'}]}>
                    <Input type="text" placeholder="姓名" />
                </Form.Item>
                <Form.Item name="Sex" label="性別" rules={[{ required: true, message: '請輸入性別'}]}>
                    <Select>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="Email" label="Email" rules={[{ required: true, message: '請輸入Email'}]}>
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="Phone" label="電話" rules={[{ required: true, message: '請輸入電話'}]}>
                    <Input type="text" placeholder="電話" />
                </Form.Item>
                <Form.Item name="Address" label="地址" rules={[{ required: true, message: '請輸入地址'}]}>
                    <Input type="text" placeholder="地址" />
                </Form.Item>
                <Button type="primary" shape="round" htmlType="submit">儲存</Button>
                {!contactAddMode && <Button type="danger" shape="round" onClick={this.deleteContact}>刪除</Button>}
                <Button shape="round" onClick={this.onCancel}>取消</Button>
            </Form>
        )
    }
}

const useReduxProps = state => {
    return {
        contactData: state.Data.contactData,
        editContactData: state.Data.editContactData,
        contactAddMode: state.Data.contactAddMode
    }
}
const useReduxSelector = dispatch => {
    return {
        saveContactData: (contactData) => dispatch({ type: 'saveContactData', contactData: contactData })
    }
}
export default connect(useReduxProps, useReduxSelector)(ContactAdd);

import React from "react";
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';

const Option = Select.Option;
const validateMessages = {
    required: '請輸入${label}',
    types: {
        email: '${label} 格式不符',
    },
};

class ContactDataEdit extends React.Component {
    constructor(props) {
        super(props);
    }
    formRef = React.createRef();

    componentDidMount() {
        let { contactDetail, Classname, contactAddMode } = this.props;
        this.formRef.current.setFieldsValue(contactDetail);
        if (contactAddMode) {
            this.formRef.current.setFieldsValue({ Classname: Classname });
        }
    }

    validateMessages = {
        required: '${name} is required',
        // ...
    }
    checkPhone = (rule, value) => {
        if (value === "" || value === undefined) {
            return Promise.reject("請輸入電話!");
        }
        else if (/^[09]{2}[0-9]{8,8}$/.test(value) || /^\++\d{6,15}$/.test(value)) {
            return Promise.resolve();
        }
        else {
            return Promise.reject("手機號碼格式錯誤!");
        }
    }
    handleDelClick = () => {
        this.props.saveContactData("Del")
        this.handleLayoutType();
    }

    formsubmit = (value) => {
        let { Classid, Classname, saveContactData } = this.props;
        saveContactData("Save", value, Classid, Classname)//新增時帶入最前面一筆課程代號、名稱。修改不會用到
        this.handleLayoutType();
    }
    handleLayoutType = () => {
        this.props.setLayoutType("Main");
    }
    render() {
        let { contactAddMode } = this.props;
        return (
            <Form ref={this.formRef} onFinish={this.formsubmit} validateMessages={validateMessages}>
                {contactAddMode ? <label>新增通訊錄</label> : <label>修改通訊錄</label>}
                <br></br>
                <Form.Item name="Classname" label="類別">
                    <Input className="readonly" readOnly="readonly" />
                </Form.Item>
                <Form.Item name="Name" label="姓名" rules={[{ required: true }]}>
                    <Input type="text" placeholder="姓名" />
                </Form.Item>
                <Form.Item name="Sex" label="性別" rules={[{ required: true }]}>
                    <Select>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="Email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="Phone" label="電話" rules={[{ required: true, validator: this.checkPhone }]}>
                    <Input type="text" placeholder="電話" />
                </Form.Item>
                <Form.Item name="Address" label="地址" rules={[{ required: true }]}>
                    <Input type="text" placeholder="地址" />
                </Form.Item>
                <Button type="primary" shape="round" htmlType="submit">儲存</Button>
                {!contactAddMode && <Button type="danger" shape="round" onClick={this.handleDelClick}>刪除</Button>}
                <Button shape="round" onClick={this.handleLayoutType}>取消</Button>
            </Form>
        )
    }
}
const mapStateToProps = state => {
    return {
        contactAddMode: state.Data.contactAddMode,
        contactDetail: state.Data.contactDetail,
        Classid: state.Class.contactClassList[0].ClassId,
        Classname: state.Class.contactClassList[0].Name
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLayoutType: (LayoutType) => dispatch({ type: "changeType", layoutType: LayoutType }),
        saveContactData: (mode, editData, classId, className) => dispatch({
            type: "saveContactData",
            mode: mode,
            editData: editData,
            classId: classId,
            className: className
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDataEdit);
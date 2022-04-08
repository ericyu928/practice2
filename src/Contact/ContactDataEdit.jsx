import React from "react";
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { ChangeType } from '../Reducer/LayoutReducer'
import { ContactModel } from '../Model/ContactModel';
import { PostData } from '../lib/utility'

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
        this.formRef.current.setFieldsValue(this.props.Data);
        if (this.props.Data) {
            this.formRef.current.setFieldsValue({ Classname: this.props.Data.Classname });
        }
        else {
            console.log(this.props.contactClass[0])
            this.formRef.current.setFieldsValue({ Classname: this.props.contactClass[0].Name });
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
    delClick = () => {
        let { Data, setData, contactData } = this.props;
        // let data = [...contactData];
        // let i = contactData.findIndex(p => p.ContactId === Data.ContactId);
        // data.splice(i, 1);
        // setData(data)
        let cData = [];
        cData = PostData("/ContactApi/api/Contact/DelData",Data.ContactId);
        setData(cData.Result);
        this.props.actions.ChangeType("Main")
    }

    formsubmit = (value) => {
        let { Data, setData, contactData } = this.props;

        // let data = [...contactData];
        let model = new ContactModel();
        model = value;

        let cData = [];
        cData = PostData("/ContactApi/api/Contact/ModifyData",value);
        console.log(cData)
        setData(cData.Result);
        // if (Data) {
        //     let i = contactData.findIndex(p => p.ContactId === Data.ContactId);
        //     data[i] = value;
        // }
        // else {
        //     model = value;
        //     model.ClassId = this.props.contactClass[0].ClassId;

        //     data.push(model);
        //     console.log(model)
        // }
        // setData(data)
        this.props.actions.ChangeType("Main")
    }

    render() {
        return (
            <Form ref={this.formRef} onFinish={this.formsubmit} validateMessages={validateMessages} id="contactForm">
                {!this.props.Data ? <label>新增通訊錄</label> : <label>修改通訊錄</label>}
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
                {this.props.Data && <Button type="danger" shape="round" onClick={this.delClick.bind(this)}>刪除</Button>}
                <Button shape="round" onClick={() => { this.props.actions.ChangeType("Main") }}>取消</Button>
            </Form>
        )
    }
}
const mapStateToProps = state => {
    return {
        contactData: state.Data.contactData,
        contactClass: state.Class.contactClass
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ChangeType }, dispatch),
        setData: (data) => dispatch({ type: "setContactData", data })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDataEdit);
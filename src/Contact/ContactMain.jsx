import React from "react";
import { Button, Select, Table } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ChangeType } from '../Reducer/LayoutReducer'
import { PostData } from '../lib/utility'

const Option = Select.Option;

class ContactMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactTable: []
        };
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
                render: (items) => (
                    <Button shape="round" type="primary" onClick={this.editData.bind(this, items)}>修改</Button>
                )
            }
        ]
    }
    componentDidMount() {
        let { contactData, setData, setClassData } = this.props;
        if (!contactData) {
            let cData = [];
            let cClass = [];
            cData = PostData("/ContactApi/api/Contact/GetContactData",[]);
            setData(cData.Result);
            cClass = PostData("/ContactApi/api/Contact/GetContactClass",[]);
            setClassData(cClass.Result);
            this.setState({
                contactTable: cData.Result
            })
        }
        else {
            this.setState({
                contactTable: contactData
            })
        }

    }
    editData = items => {
        this.props.actions.ChangeType("ContactDataEdit", items);
    }
    classSelect = value => {
        let { contactData } = this.props;
        let newList = contactData.filter(items => value === "*" || items.ClassId === value);
        this.setState({
            contactTable: newList
        })
    }
    render() {
        return (
            <div className="container">
                <div className='ContactTypeTitle'>
                    <Button onClick={() => { this.props.actions.ChangeType("ContactClass") }}>類別維護</Button>
                </div>
                <h1>通訊錄</h1>
                <label className="textlabel">類別</label>
                <Select style={{ width: "150px" }} onChange={this.classSelect.bind(this)} defaultValue="*">
                    <Option value="*">全部</Option>
                    {this.props.contactClass && this.props.contactClass.map((c_class) =>
                        <Option key={c_class.ClassId} value={c_class.ClassId}>{c_class.Name}</Option>
                    )}
                </Select>
                <Button className="enter" onClick={() => { this.props.actions.ChangeType("ContactDataEdit") }}>新增</Button>
                <Table
                    columns={this.columns}
                    dataSource={this.state.contactTable}
                    rowKey={(recond, index) => "row_" + index}
                />
            </div>
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
        setData: (data) => dispatch({ type: "setContactData", data }),
        setClassData: (data) => dispatch({ type: "setClassData", data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactMain);
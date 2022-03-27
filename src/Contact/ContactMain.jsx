import React from "react";
import { Button, Select, Table } from 'antd';
import { connect } from "react-redux";

const Option = Select.Option;

class ContactMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            contactTable: []
        })
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
                    //onClick(頁面切換,單筆明細資料,修改模式)
                    <Button shape="round" type="primary" onClick={this.handleLayoutType.bind(this, "ContactDataEdit", record, false)}>修改</Button>
                )
            }
        ]
    }
    componentDidMount() {
        this.setState({
            contactTable: this.props.contactData
        })
    }
    handleClassSelect = value => {
        let newList = []
        let { contactData } = this.props;
        for (let i = 0; i < contactData.length; i++) {
            if (value !== "*") {
                if (value === contactData[i].ClassId) {
                    newList.push(contactData[i])
                }
            }
            //類別選擇為全部
            else {
                newList.push(contactData[i])
            }
        }
        this.setState({
            contactTable: newList
        })

    }
    handleLayoutType = (event, contactData, contactAddMode) => {
        this.props.setLayoutType(event);
        this.props.editContactData(contactData, contactAddMode);
    }
    render() {
        return (
            <div className="container">
                <div className='ContactTypeTitle'>
                    <Button onClick={this.handleLayoutType.bind(this, "ContactClass")}>類別維護</Button>
                </div>
                <h1>通訊錄</h1>
                <label className="textlabel">類別</label>
                <Select style={{ width: "150px" }} onChange={this.handleClassSelect.bind(this)} defaultValue="*">
                    <Option value="*">全部</Option>
                    {this.props.contactClass.map((c_class) =>
                        <Option key={c_class.ClassId} value={c_class.ClassId}>{c_class.Name}</Option>
                    )}
                </Select>
                {/* onClick(頁面切換,單筆明細資料,修改模式) */}
                <Button className="enter" onClick={this.handleLayoutType.bind(this, "ContactDataEdit", '', true)}>新增</Button>
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
        layoutType: state.Layout.showType,
        contactClass: state.Class.contactClassList,
        contactData: state.Data.contactData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLayoutType: (LayoutType) => dispatch({ type: "changeType", layoutType: LayoutType }),
        editContactData: (contactDetail, contactAddMode) => dispatch({ type: "editContactData", contactDetail: contactDetail, contactAddMode: contactAddMode })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactMain);
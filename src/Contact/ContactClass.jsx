import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "antd";
import { bindActionCreators } from 'redux';
import { ChangeType } from '../Reducer/LayoutReducer'
class ContactClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editmode: false
        }
        this.columns = [
            {
                title: '名稱',
                render: (items) => <Button type="link" onClick={this.editClass.bind(this, items)}>{items.Name}</Button>,
            }
        ]
    }
    editClass = items => {
        this.props.actions.ChangeType("ContactClassEdit", items);
    }
    render() {
        return (
            <div>
                <div>
                    <label>類別維護</label>
                </div>
                <Button type="primary" shape="round" onClick={() => { this.props.actions.ChangeType("Main") }}>返回</Button>
                <Button shape="round" onClick={() => { this.props.actions.ChangeType("ContactClassEdit") }}>新增</Button>
                <Table className="tb"
                    columns={this.columns}
                    dataSource={this.props.contactClass}
                    rowKey={(recond, index) => "row_" + index}
                />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        contactClass: state.Class.contactClass
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ChangeType }, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactClass);
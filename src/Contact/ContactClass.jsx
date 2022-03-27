import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "antd";
import ContactClassEdit from './ContactClassEdit'

class ContactClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editmode: false
        }
        this.columns = [
            {
                title: '名稱',
                render: (record) => <Button type="link" onClick={this.handleEditClass.bind(this, record, false)}>{record.Name}</Button>,
            }
        ]
    }
    handleLayoutType = event => {
        this.props.setLayoutType(event);
    }
    handleEditClass = (event, classAddMode) => {
        this.setState({
            editmode: true
        });
        this.props.openClassEdit(event, classAddMode);
    }
    classEdited = () => {
        this.setState({
            editmode: false
        });
    }
    render() {
        return (
            <div>
                {!this.state.editmode && <div>
                    <div>
                        <label>類別維護</label>
                    </div>
                    <Button type="primary" shape="round" onClick={this.handleLayoutType.bind(this, "Main")}>返回</Button>
                    <Button shape="round" onClick={this.handleEditClass.bind(this, '', true)}>新增</Button>
                    <Table className="tb"
                        columns={this.columns}
                        dataSource={this.props.contactClass}
                        rowKey={(recond, index) => "row_" + index}
                    />
                </div>
                }
                {this.state.editmode && <ContactClassEdit onEdit={this.classEdited} />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        contactClass: state.Class.contactClassList,
        classAddMode: state.Class.classAddMode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLayoutType: (LayoutType) => dispatch({ type: "changeType", layoutType: LayoutType }),
        openClassEdit: (classDetail, classAddMode) => dispatch({ type: "openClassEdit", classDetail: classDetail, classAddMode: classAddMode })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactClass);
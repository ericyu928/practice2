import React from "react";
import { Input, Button } from 'antd';
import { connect } from 'react-redux';

class ContactClassEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.nameRef = React.createRef();
    }
    componentDidMount() {
        this.nameRef.current.focus();
        this.setState({
            name: this.props.name
        })
    }
    nameTyped = event => {
        this.setState({
            name: event.target.value
        })
    }
    handleClick = event => {
        this.props.saveContactTypeList(event, this.state.name)
        this.props.onEdit();//關閉編輯頁
    }
    render() {
        return (
            <div className="ctype">
                {this.props.classAddMode ? <label>新增類別</label> : <label>修改類別</label>}
                <p className="textlabel">名稱:</p>
                <Input type='text' placeholder="名稱" value={this.state.name} onChange={this.nameTyped} ref={this.nameRef}></Input>
                <Button type="primary" onClick={this.handleClick.bind(this, "Save")}>儲存</Button>
                {!this.props.classAddMode && <Button type='danger' onClick={this.handleClick.bind(this, "Del")}>刪除</Button>}
                <Button onClick={this.handleClick.bind(this, "Cancel")}>取消</Button>
            </div>)
    }
}
const mapStateToProps = state => {
    return {
        classAddMode: state.Class.classAddMode,
        name: state.Class.classDetail.Name
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveContactTypeList: (mode, className) => dispatch({ type: "saveContactTypeList", mode: mode, className: className })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactClassEdit);
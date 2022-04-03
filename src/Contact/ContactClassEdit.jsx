import React from "react";
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChangeType } from '../Reducer/LayoutReducer'
import { ContactClassModel } from '../Model/ContactClassModel';

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
        if (this.props.Data) {
            this.setState({
                name: this.props.Data.Name
            })
        }
    }
    nameTyped = () => {
        this.setState({
            name: this.nameRef.current.input.value
        })
    }
    saveClick = () => {
        let { Data, setClassData, contactClass } = this.props;
        let data = [...contactClass];

        if (Data) {
            let i = contactClass.findIndex(p => p.ClassId === Data.ClassId);
            data[i]["Name"] = this.nameRef.current.input.value;
            setClassData(data)
        }
        else {

            let model = new ContactClassModel();
            model.Name = this.state.name;

            data = [...data, model]
            setClassData(data)

        }
        this.props.actions.ChangeType("ContactClass")
    }
    delClick = () => {
        let { Data, setClassData, contactClass } = this.props;
        let data = [...contactClass];
        let i = contactClass.findIndex(p => p.ClassId === Data.ClassId);
        data.splice(i, 1);
        console.log(i, data)
        setClassData(data)
        this.props.actions.ChangeType("ContactClass")
    }
    render() {
        return (
            <div className="ctype">
                {!this.props.Data ? <label>新增類別</label> : <label>修改類別</label>}
                <p className="textlabel">名稱:</p>
                <Input type='text' placeholder="名稱" value={this.state.name} onChange={this.nameTyped} ref={this.nameRef}></Input>
                <Button type="primary" onClick={this.saveClick.bind(this)}>儲存</Button>
                {this.props.Data && <Button type='danger' onClick={this.delClick.bind(this)}>刪除</Button>}
                <Button onClick={() => { this.props.actions.ChangeType("ContactClass") }}>取消</Button>
            </div>)
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
        setClassData: (data) => dispatch({ type: "setClassData", data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactClassEdit);
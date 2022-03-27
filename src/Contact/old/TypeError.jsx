import React from "react";
import { Modal,Button } from 'antd'

class TypeError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onCheck: false
        }
    }
    componentDidMount(){
        this.setState({onCheck:this.props.onVisible})
    }
    okClick = () => {
        this.setState({onCheck:false})

        this.props.onCheck()
    }
    render() {
        return (
            <Modal title="警告" visible={this.state.onCheck}  footer={[
                <Button key="submit" type="primary"  onClick={this.okClick}>
                  OK
                </Button>
              ]} >
                <p>尚有欄位未輸入</p>
            </Modal>
        )
    }
}

export default TypeError;
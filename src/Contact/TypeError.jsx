import React from "react";

class TypeError extends React.Component{
    constructor(props){
        super(props);
        this.state={
            onOk:false
        }
    }
    okClick =()=>{
        this.props.onCheck(this.state.onOk)
    }
    render(){
        return(
            <div>
                <div>
                    <label>尚有欄位未輸入</label>
                </div>
                <footer>
                    <button className="del" onClick={this.okClick} onOk={this.state.onOk}>確定</button>
                </footer>
            </div>
        )
    }
}

export default TypeError;
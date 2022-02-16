import React from "react";


class ContactType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contactclass:this.props.contacttypeList
        }
    }
    classTypeChange = event =>{
        this.props.typeSelected(event.target.value)
    }
    render(){
        return(
               <select className="classtype" onChange={this.classTypeChange}>
                   <option value="*">全部</option>
                   {this.state.contactclass.map((c_class)=>
                       <option value={c_class.ClassId}>{c_class.Name}</option>
                   )}
               </select> 
        )
    }
}

export default ContactType;
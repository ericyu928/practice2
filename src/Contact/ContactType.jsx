import React from "react";
import { connect } from 'react-redux';


class ContactType extends React.Component {
    constructor(props) {
        super(props);
    }
    classTypeChange = event => {
        this.props.typeSelected(event.target.value)
    }
    render() {
        return (
            <select className="classtype" onChange={this.classTypeChange} value={this.props.classType}>
                <option value="*">全部</option>
                {this.props.contacttypelist.map((c_class) =>
                    <option key={c_class.ClassId} value={c_class.ClassId}>{c_class.Name}</option>
                )}
            </select>
        )
    }
}

const useReduxProps = state => {
    return {
        contacttypelist: state.List.contacttypelist
    }
}

export default connect(useReduxProps)(ContactType);
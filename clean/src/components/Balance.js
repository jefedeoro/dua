import React,  { Component } from 'redux'
import {connect} from 'react-redux'

class Balance extends Component {

    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                    'Balance'
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
     
    }
}

export default connect(mapStateToProps)(Balance)
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { connect } from 'react-redux'

import * as userActions from 'actions/userActions'
import { apiServiceUrl } from 'config/api'

export class Login extends Component {
  submit() {
    const {
      usernameInput: { value : username },
      passwordInput: { value : password }
    } = this.refs
    const { changeLoginState } = this.props

    request
      .post(`${apiServiceUrl}login`)
      .auth(username ,password)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }

        changeLoginState(username, password, res.body.data)
        this.context.router.push('/')
      })
  }

  render() {
    return (
      <div>
        <input ref='usernameInput' type='text' defaultValue='username'/>
        <input ref='passwordInput' type='password' />
        <button onClick={this.submit.bind(this)} >
          Submit
        </button>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLoginState: userActions.changeLoginState
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)

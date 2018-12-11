import React from 'react'
import styled from 'styled-components'

const HideableDiv = styled.div`
  display: ${p => p.visible ? 'inherit' : 'none'};
`

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() { 
    return (
      <div>
        <HideableDiv visible={!this.state.visible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </HideableDiv>
        <HideableDiv visible={this.state.visible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </HideableDiv>
      </div>
    )
  }
}

export {Togglable, HideableDiv}
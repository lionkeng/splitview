import React, { Component } from 'react'
// import { findDOMNode } from 'react-dom'
import jss from 'jss'
import preset from 'jss-preset-default'

import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import CodeIcon from '@material-ui/icons/Code'


jss.setup(preset())

const styles = {
   container: {
     position: 'absolute',
     top: 0,
     bottom: 0,
     width: '100%',
     backgroundColor: 'rgba(0,0,0,0.45)',
     display: 'flex',
     justifyContent: 'space-around',
     alignItems: 'stretch',
     flexFlow: 'row wrap',
     flexDirection: 'row',
   },
   leftPanel: {
     flexGrow: 1,
     backgroundColor: '#E68364',
   },
   rightPanel: {
     flexGrow: 1,
     backgroundColor: '#4D8FAC'
   },
   divider: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     width: 5,
     backgroundColor: 'white',
   },
 }

const {classes} = jss.createStyleSheet(styles).attach()


class SplitView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drag: false,
      currentX: null,
      direction: 0,
    }
    this.startDrag = this.startDrag.bind(this)
    this.stopDragging = this.stopDragging.bind(this)
    this.dragging = this.dragging.bind(this)
    this.myRef = React.createRef()
    this.leftGrow = 1
    this.rightGrow = 1
  }

  dragging(e) {
    if (this.state.drag) {

      //const currentTargetDOM = findDOMNode(this.myRef.current)
      //const currentTargetRect = currentTargetDOM.getBoundingClientRect()
      //const eventOffsetX = e.nativeEvent.pageX - currentTargetRect.left
      // console.log(e.nativeEvent.pageX, currentTargetRect.left)
      // this.setState({drag: true})
      let direction = 0
      if (e.clientX > this.state.currentX) {
        direction = 1
      }
      else {
        direction = -1
      }
      this.setState({currentX: e.clientX, direction})
    }
  }

  startDrag(e) {
    // const currentTargetDOM = findDOMNode(this.myRef.current)
    this.setState({drag: true, currentX: e.clientX})
    // const currentTargetRect = currentTargetDOM.getBoundingClientRect()
    // const eventOffsetX = e.nativeEvent.pageX - currentTargetRect.left
    // console.log('eventOffsetX', eventOffsetX)
  }

  stopDragging(e) {
    this.setState({drag: false, currentX: null, direction: 0})
  }

  render() {
    if (this.state.direction === 1){
      this.leftGrow = this.leftGrow + 0.01
      this.rightGrow = this.rightGrow - 0.01
    }
    else if (this.state.direction === -1) {
      this.leftGrow = this.leftGrow - 0.01
      this.rightGrow = this.rightGrow + 0.01
    }
    const localStyles = {
      leftPanel: {
        flexGrow: this.leftGrow,
      },
      rightPanel: {
        flexGrow: this.rightGrow,
      },
    }
    return (
      <div
        className={`${classes.container}`}
        onMouseUp={this.stopDragging}
        onMouseMove={this.dragging}
      >
        <div style={localStyles.leftPanel} className={`${classes.leftPanel}`}>
        </div>
        <div className={`${classes.divider}`}>
          <Button
            ref = {this.myRef}
            style={{marginLeft: -20, marginRight: -20}}
            mini
            disableRipple
            variant='fab'
            color='primary'
            aria-label='adjust'
            onMouseDown={this.startDrag}
            onMouseMove={this.dragging}
            onMouseUp={this.stopDragging}
            onTouchStart={this.startDrag}
            onTouchMove={this.dragging}
            onTouchEnd={this.stopDragging}
            onTouchCancel={this.stopDragging}
          >
            <Icon><CodeIcon /></Icon>
          </Button>
        </div>
        <div style={localStyles.rightPanel} className={`${classes.rightPanel}`}></div>
      </div>
    )
  }
}



export default SplitView

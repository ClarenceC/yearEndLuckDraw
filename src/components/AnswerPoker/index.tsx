import React, { PureComponent } from 'react'

import './index.css'

interface AnswerPokerPropsType {
  frontPic: string,
  answerPic: string,
  closeAnswerPoker:() => void
}

interface AnswerPokerStateType {
  isOpened: boolean
}

class AnswerPoker extends PureComponent<AnswerPokerPropsType, AnswerPokerStateType> {
  constructor(props:AnswerPokerPropsType) {
    super(props)
    this.state = {
      isOpened: false
    }
  }

  openAnswer = () => {
    this.setState({ isOpened: true })
  }

  render() {
    const { closeAnswerPoker, frontPic, answerPic } = this.props
    const { isOpened } = this.state
    return (
      <div className='answer-container'>
        <div className={isOpened ? 'card active' : 'card'} onClick={() => {isOpened ? closeAnswerPoker() : this.openAnswer()}}>
          <div className='card-face card-front'>{frontPic}</div>
          <div className='card-face card-back'>{answerPic}</div>
        </div>
      </div>
    )
  }
}


export default AnswerPoker
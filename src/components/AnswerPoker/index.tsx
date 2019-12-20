import React, { PureComponent } from 'react'

import styles from './index.css'

interface AnswerPokerPropsType {
  frontBigerPic: string,
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
    const { closeAnswerPoker, frontBigerPic, answerPic } = this.props
    const { isOpened } = this.state
    return (
      <div className={styles['answer-container']}>
        <div className={isOpened ? styles['card'] + ' ' + styles['active'] : styles['card']} onClick={() => {isOpened ? closeAnswerPoker() : this.openAnswer()}}>
          <div className={styles['card-face'] + ' ' + styles['card-front']}><img src={frontBigerPic} /></div>
          <div className={styles['card-face'] + ' ' + styles['card-back']}><img width='400' height='600' src={answerPic}/></div>
        </div>
      </div>
    )
  }
}


export default AnswerPoker
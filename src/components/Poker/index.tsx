import React, { PureComponent }  from 'react'
import { LuckParamsTypes } from '@/containers/Luckdraw'
import styles from './index.css'


interface PokerPropsType {
  poker: LuckParamsTypes,
  showAnswerPoker: (frontPic:string, answer:string) => void,
  openLuck: (id: number) => void,
}

interface PokerStateType {
  isOpened: boolean,
}

class Poker extends PureComponent<PokerPropsType, PokerStateType> {
  constructor(props:PokerPropsType) {
    super(props)
    this.state = {
      isOpened: false,
    }
  }

  openPoker = (poker: LuckParamsTypes) => {
    const { luckNum, frontBigerPic, frontAnswer } = poker
    const { openLuck } = this.props
    this.setState({ isOpened: true })
    openLuck(luckNum)
    setTimeout(() => {
      this.zoomIn(frontBigerPic, frontAnswer)
    }, 1000)
  }

  zoomIn = (frontBigerPic: string, answerPic: string)  => {
    this.props.showAnswerPoker(frontBigerPic, answerPic)
  }

  render() {
    const { isOpened } = this.state
    const { poker } = this.props
    return (
      <div className={styles['wrapper']}>
        <div className={isOpened ? styles['card'] + ' ' + styles['active'] : styles['card']} onClick={() => {this.openPoker(poker)}}>
          <div className={styles['card-face'] + ' ' + styles['card-front' + poker.id]}></div>
          <div className={styles['card-face'] + ' ' + styles['card-back']}><img src={poker.frontPic} /></div>
        </div>
      </div>
    )
  }
}

export default Poker
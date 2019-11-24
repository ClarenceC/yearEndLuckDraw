import React, { PureComponent }  from 'react'
import { LuckParamsTypes } from '@/containers/Luckdraw'
import './index.css'

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
    const { luckNum, frontPic, frontAnswer } = poker
    const { openLuck } = this.props
    this.setState({ isOpened: true })
    openLuck(luckNum)
    setTimeout(() => {
      this.zoomIn(frontPic, frontAnswer)
    }, 1000)
  }

  zoomIn = (frontPic: string, answer: string)  => {
    this.props.showAnswerPoker(frontPic, answer)
  }

  render() {
    const { isOpened } = this.state
    const { poker } = this.props  
    return (
      <div className='wrapper'>
        <div className={isOpened ? 'card active' : 'card'} onClick={() => {this.openPoker(poker)}}>
          <div className='card-face card-front'>{poker.backPic}</div>
          <div className='card-face card-back'>{poker.frontPic}</div>
        </div>
      </div>
    )
  }
}

export default Poker
import React, { PureComponent }  from 'react'
import { LuckParamsTypes } from '@/containers/Luckdraw'
import './index.css'

interface PokerPropsType {
  poker: LuckParamsTypes,
  showAnswerPoker: (answer:string) => void
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

  openPoker = (id:number) => {
    this.setState({ isOpened: true })
    console.log(id)
  }

  zoomIn = (answer: string)  => {
    this.props.showAnswerPoker(answer)
  }

  render() {
    const { isOpened } = this.state
    const { poker } = this.props  
    return (
      <div className='wrapper'>
        <div className={isOpened ? 'card active' : 'card'} onClick={() => {isOpened ? this.zoomIn(poker.frontAnswer) : this.openPoker(poker.luckNum)}}>
          <div className='card-face card-front'>{poker.backPic}</div>
          <div className='card-face card-back'>{poker.frontPic}</div>
        </div>
      </div>
    )
  }
}

export default Poker
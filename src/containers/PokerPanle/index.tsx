import React, { PureComponent } from 'react'
import Poker from '@/components/Poker'
import { LuckParamsTypes } from '@/containers/Luckdraw'
import AnswerPoker from '@/components/AnswerPoker'
import './index.css'

interface PokerPanleProps {
  closePanle: ()=>void,
  openLuck: (id: number) => void,
  waitOpenLuckPeoples: Array<LuckParamsTypes>
}

interface PokerPanleStates {
  isShowAnswerPoker: boolean,
  frontPic: string,
  answerPic: string
}

class PokerPanle extends PureComponent<PokerPanleProps, PokerPanleStates> {
  constructor(props:PokerPanleProps) {
    super(props)
    this.state = {
      isShowAnswerPoker: false,
      frontPic: '',
      answerPic: '',
    }
  }

  handleWaitOpenList = () => {
    const { waitOpenLuckPeoples, openLuck } = this.props
    const rowOpenList:Array<any> = []
    let rowOpenIndex = 0
    waitOpenLuckPeoples.forEach((item, index) => {
      if (index !== 0 && (index % 3 === 0)) {
        rowOpenIndex++
      }
      if (!rowOpenList[rowOpenIndex]) {
        rowOpenList[rowOpenIndex] = []
      }
      rowOpenList[rowOpenIndex].push(item)
    })
    return (
      <>{
        rowOpenList.map((rowListItem, rowIndex) => {
          return (
            <div key={rowIndex} className='poker-rowList'>
              { rowListItem.map((poker:LuckParamsTypes, index:number) => (
                <Poker key={index} poker={poker} showAnswerPoker={this.showAnswerPoker} openLuck={openLuck}/>
              )) }
            </div>
          )
        })
      }</>
    )
  }

  showAnswerPoker = (frontPic: string, answerPic:string) => {
    this.setState({ 
      isShowAnswerPoker: true,
      answerPic,
      frontPic,
    })
  }

  closeAnswerPoker = () => {
    this.setState({ isShowAnswerPoker: false })
  }

  render() {
    const { closePanle } = this.props
    const { isShowAnswerPoker, frontPic, answerPic } = this.state
    return(
        <div className='poker-panle-mask'>
          <div className='poker-panle'>
            <div className='poker-panle-header'><div className='close-btn' onClick={closePanle}>X</div></div>
            <div className='poker-content'>
              {this.handleWaitOpenList()}
            </div>
            { isShowAnswerPoker && <AnswerPoker frontPic={frontPic} answerPic={answerPic} closeAnswerPoker={this.closeAnswerPoker}/> }
          </div>
        </div>
    )
  }
}

export default PokerPanle
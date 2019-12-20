import React, { PureComponent } from 'react'
import Poker from '@/components/Poker'
import { LuckParamsTypes } from '@/containers/Luckdraw'
import AnswerPoker from '@/components/AnswerPoker'
import styles from './index.css'

interface PokerPanleProps {
  closePanle: ()=>void,
  openLuck: (id: number) => void,
  waitOpenLuckPeoples: Array<LuckParamsTypes>
}

interface PokerPanleStates {
  isShowAnswerPoker: boolean,
  frontBigerPic: string,
  answerPic: string
}

class PokerPanle extends PureComponent<PokerPanleProps, PokerPanleStates> {
  constructor(props:PokerPanleProps) {
    super(props)
    this.state = {
      isShowAnswerPoker: false,
      frontBigerPic: '',
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
      rowOpenList[rowOpenIndex].push({ ...item, id: index + 1})
    })
    return (
      <>{
        rowOpenList.map((rowListItem, rowIndex) => {
          return (
            <div key={rowIndex} className={styles['poker-rowList']}>
              { rowListItem.map((poker:LuckParamsTypes, index:number) => (
                <Poker key={index} poker={poker} showAnswerPoker={this.showAnswerPoker} openLuck={openLuck}/>
              )) }
            </div>
          )
        })
      }</>
    )
  }

  showAnswerPoker = (frontBigerPic: string, answerPic:string) => {
    this.setState({ 
      isShowAnswerPoker: true,
      answerPic,
      frontBigerPic,
    })
  }

  closeAnswerPoker = () => {
    this.setState({ isShowAnswerPoker: false })
  }

  render() {
    const { closePanle } = this.props
    const { isShowAnswerPoker, frontBigerPic, answerPic } = this.state
    return(
        <div className={styles['poker-panle-mask']}>
          <div className={styles['poker-panle']}>
            <div className={styles['poker-panle-header']}><div className={styles['close-btn']} onClick={closePanle}>X</div></div>
            <div className={styles['poker-content']}>
              {this.handleWaitOpenList()}
            </div>
            { isShowAnswerPoker && <AnswerPoker frontBigerPic={frontBigerPic} answerPic={answerPic} closeAnswerPoker={this.closeAnswerPoker}/> }
          </div>
        </div>
    )
  }
}

export default PokerPanle
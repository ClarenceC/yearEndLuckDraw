import React, { PureComponent } from 'react'
import PokerPanle from '@/containers/PokerPanle'

import './index.css'

export interface LuckParamsTypes {
  luckNum: number,
  backPic: string,
  frontPic: string,
  frontAnswer: string,
  isOpened: boolean,
}

interface LuckdrawPropTypes {}

interface LuckdrawStateType {
  luckPeopleTotal: number,
  luckNumArray: Array<LuckParamsTypes>,
  showLuckPeoplePanle: boolean,
  waitOpenArray: Array<LuckParamsTypes>
}

class Luckdraw extends PureComponent<LuckdrawPropTypes, LuckdrawStateType> {
  constructor(props:LuckdrawPropTypes) {
    super(props)
    this.state = {
      luckPeopleTotal: 120,
      luckNumArray: [],
      showLuckPeoplePanle: false,
      waitOpenArray: []
    }
  }

  componentDidMount() {
    const luckPeopleArray:Array<LuckParamsTypes> = Array.from({length: 120}, (item, index:number) => ({
      luckNum: index,
      backPic: "反",
      frontPic: "正"+index,
      frontAnswer: "Answer"+index,
      isOpened: false,
    }))
    this.setState({ luckNumArray: luckPeopleArray })
  }

  randomDraw = (minNum:number, maxNum:number):number => {
    return Math.floor(Math.random() * (maxNum - minNum) + minNum)
  }

  openLuck = (id: number) => {
    const { luckNumArray } = this.state
    luckNumArray.forEach(item => {
      if (item.luckNum === id) {
        item.isOpened = true
      }
    })
  }

  showLuckPanle = () => {
    this.setState({ showLuckPeoplePanle: true })
  }

  closeLuckPanle = () => {
    this.setState({ showLuckPeoplePanle: false })
  }

  onDraw = () => {
    const { luckNumArray } = this.state
    const notDrawnPeopleArray = luckNumArray.filter(luckPeople => luckPeople.isOpened === false)
    const notDrawnTotal = notDrawnPeopleArray.length
    const randomArray = []
    while(randomArray.length !== 6) {
      const randomNum = this.randomDraw(0, notDrawnTotal)
      if (randomArray.findIndex(element => element === randomNum ) === -1) {
        randomArray.push(randomNum)
      }
    }
    console.log('randomArray:', randomArray)
    const waitOpen = randomArray.map(item => notDrawnPeopleArray[item])
    console.log('onDraw', notDrawnTotal)
    this.setState({ waitOpenArray: waitOpen })
    this.showLuckPanle()
  }

  render() {
    const { showLuckPeoplePanle, waitOpenArray } = this.state
    return (
      <div className='luckdraw-container'>
        { showLuckPeoplePanle && <PokerPanle openLuck={this.openLuck} closePanle={this.closeLuckPanle} waitOpenLuckPeoples={waitOpenArray}/>}
        <div className='draw-btn' onClick={this.onDraw}>抽奖</div>
      </div>
    )
  }
}

export default Luckdraw
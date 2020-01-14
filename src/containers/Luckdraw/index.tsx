import React, { PureComponent } from 'react'
import PokerPanle from '@/containers/PokerPanle'

import styles from './index.css'

export interface LuckParamsTypes {
  luckNum: number,
  backPic: string,
  frontPic: string,
  frontBigerPic: string,
  frontAnswer: string,
  isOpened: boolean,
  id: number,
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
    const images = this.importAll(require.context('../../assets/images/Poker/Front/Confused/', false, /\.(gif|png|jpe?g|svg)$/))
    const imagesBiger = this.importAll(require.context('../../assets/images/Poker/Front/ConfusedBiger/', false, /\.(gif|png|jpe?g|svg)$/))
    const imagesPuzzle = this.importAll(require.context('../../assets/images/Poker/Front/Puzzle/', false, /\.(gif|png|jpe?g|svg)$/))
    const luckPeopleArray:Array<LuckParamsTypes> = Array.from({length: 101}, (item, index:number) => ({
      luckNum: index,
      backPic: "反",
      frontPic: images[`${index}.png`],
      frontBigerPic: imagesBiger[`${index}.png`],
      frontAnswer: index < 10 ? imagesPuzzle[`qianzi_0${index}.png`] : imagesPuzzle[`qianzi_${index}.png`],
      isOpened: false,
      id: 0,
    }))
    this.setState({ luckNumArray: luckPeopleArray })
  }

  randomDraw = (minNum:number, maxNum:number):number => {
    return Math.floor(Math.random() * (maxNum - minNum) + minNum)
  }

  importAll = (r:any):any => {
    let images:{[index: string]:any} = {};
    r.keys().map((item:string, index:number) => { images[item.replace('./', '')] = r(item) });
    return images;
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
    // console.log(require.context('../../assets/images/Poker/Front/Confused/', false, /\.(gif|png|jpe?g|svg)$/))
    return (
      <div className={styles['luckdraw-container']}>
        { showLuckPeoplePanle && <PokerPanle openLuck={this.openLuck} closePanle={this.closeLuckPanle} waitOpenLuckPeoples={waitOpenArray}/>}
        <div className={styles['draw-btn']} onClick={this.onDraw}></div>
      </div>
    )
  }
}

export default Luckdraw
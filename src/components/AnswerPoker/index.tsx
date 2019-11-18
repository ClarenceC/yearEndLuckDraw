import React from 'react'

import './index.css'

interface  AnswerPokerPropsType {
  answerPic: string,
  closeAnswerPoker:() => void
}

const AnswerPoker = (props:AnswerPokerPropsType) => {
  const { closeAnswerPoker, answerPic } = props
  return (
    <div className='answer-container' onClick={closeAnswerPoker}>
      {answerPic}
    </div>
  )
}

export default AnswerPoker
export type CardProps = {
  id: string
  front: string
  back: string
}

export type FlashcardProps = Omit<CardProps, 'back' | 'front'> & {
  query: string
  isCorrect?: boolean
}

export type FlashcardAnswerValidation = {
  expectedAnswer: string
  isAnswerCorrect: boolean
}

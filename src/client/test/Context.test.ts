import { describe, it, expect, vi } from 'vitest'
import { initialState, reducer } from '../session/gameReducer'
import * as helper from '../session/helper'
import { GameState } from '../session/helper'
import { CardProps } from '../../shared/CardProps'
import { GameResultItem, InputType, SortDirection } from '../common/types'

const retrieveLabel = vi.spyOn(helper, 'retrieveLabel')

describe('Game reducer', () => {
  it('should initialize game state when INIT_GAME action is dispatched', () => {
    const gameCards: GameResultItem[] = [{ id: '1', front: 'A', back: 'B' }]

    const newState = reducer(initialState, {
      type: 'INIT_GAME',
      payload: gameCards,
    })

    expect(newState.gameCards).toEqual(gameCards)
    expect(newState.gameState).toBe(GameState.ONGOING)
    expect(newState.currentCardIndex).toBe(0)
    expect(retrieveLabel).toHaveBeenCalledWith(GameState.ONGOING)
  })

  it('should update game card when SUBMIT_GAME_ANSWER action is dispatched', () => {
    const initial = {
      ...initialState,
      gameCards: [{ id: '1', front: 'A', back: 'B' }],
      currentCardIndex: 0,
    }
    const updatedCard: GameResultItem = {
      id: '1',
      front: 'A',
      back: 'B',
      answer: 'B',
      isAccepted: true,
    }
    const newState = reducer(initial, {
      type: 'SUBMIT_GAME_ANSWER',
      payload: updatedCard,
    })

    expect(newState.gameCards[0]).toEqual(updatedCard)
  })

  it('should set the current card index when SET_CARD_INDEX action is dispatched', () => {
    const newState = reducer(initialState, {
      type: 'SET_CARD_INDEX',
      payload: 1,
    })

    expect(newState.currentCardIndex).toBe(1)
    expect(retrieveLabel).toHaveBeenCalledWith(initialState.gameState, 1)
  })

  it('should reset state when DELETE_GAME action is dispatched', () => {
    const newState = reducer(initialState, { type: 'DELETE_GAME' })

    expect(newState.gameCards).toEqual([])
    expect(newState.gameState).toBe(GameState.NOT_STARTED)
    expect(newState.currentCardIndex).toBe(0)
    expect(retrieveLabel).toHaveBeenCalledWith(GameState.NOT_STARTED)
  })

  it('should finish the game when FINISH_GAME action is dispatched', () => {
    const newState = reducer(initialState, { type: 'FINISH_GAME' })

    expect(newState.gameState).toBe(GameState.FINISHED)
    expect(retrieveLabel).toHaveBeenCalledWith(GameState.FINISHED)
  })

  it('should set the store cards when SET_CARDS action is dispatched', () => {
    const storeCards: CardProps[] = [{ id: '1', front: 'A', back: 'B' }]
    const newState = reducer(initialState, {
      type: 'SET_CARDS',
      payload: storeCards,
    })

    expect(newState.storeCards).toEqual(storeCards)
  })

  it('should add a card when ADD_CARD action is dispatched', () => {
    const newCard: CardProps = { id: '2', front: 'C', back: 'D' }
    const newState = reducer(
      { ...initialState, storeCards: [{ id: '1', front: 'A', back: 'B' }] },
      { type: 'ADD_CARD', payload: newCard }
    )

    expect(newState.storeCards).toContainEqual(newCard)
    expect(newState.storeCards).toHaveLength(2)
  })

  it('should delete a card when DELETE_CARD action is dispatched', () => {
    const initial = {
      ...initialState,
      storeCards: [
        { id: '1', front: 'A', back: 'B' },
        { id: '2', front: 'C', back: 'D' },
      ],
    }
    const newState = reducer(initial, { type: 'DELETE_CARD', payload: '1' })

    expect(newState.storeCards).toHaveLength(1)
    expect(newState.storeCards[0].id).toBe('2')
  })

  it('should set the sort type when SET_SORT_TYPE action is dispatched', () => {
    const newState = reducer(initialState, {
      type: 'SET_SORT_TYPE',
      payload: 'back' as InputType,
    })

    expect(newState.sortType).toBe('back')
  })

  it('should set the sort direction when SET_SORT_DIRECTION action is dispatched', () => {
    const newState = reducer(initialState, {
      type: 'SET_SORT_DIRECTION',
      payload: 'desc' as SortDirection,
    })

    expect(newState.sortDirection).toBe('desc')
  })

  it('should set card input when SET_CARD_INPUT action is dispatched', () => {
    const cardInput = { front: 'Front text', back: 'Back text' }
    const newState = reducer(initialState, {
      type: 'SET_CARD_INPUT',
      payload: cardInput,
    })

    expect(newState.cardInput).toEqual(cardInput)
  })

  it('should set filterChecked when SET_FILTER_CHECKED action is dispatched', () => {
    const newState = reducer(initialState, {
      type: 'SET_FILTER_CHECKED',
      payload: true,
    })

    expect(newState.filterChecked).toBe(true)
  })
})

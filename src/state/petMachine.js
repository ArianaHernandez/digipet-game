import { useEffect, useState } from 'react'
import {
	createMachine,
	state,
	state as final,
	transition,
	guard,
	reduce
} from 'robot3'
import { createUseMachine } from 'robot-hooks'


export const STATE = {
	hungry: 'hungry',
	thirsty: 'thirsty',
	bored: 'bored',
	happy: 'happy',
	ranAway: 'ranAway'
}

export const moodStates = [
	STATE.hungry,
	STATE.thirsty,
	STATE.bored
]

export const ACTION_TYPES = {
	moodChange: 'moodChange'
}

export const ACTIONS = {
	moodChange: (payload = {}) => {
	return ({
		payload,
		type: ACTION_TYPES.moodChange
	})
}
}
const createInitialContext = ({  hunger = 0, thirst = 50, amusement = 70 } = {}) => ({
	hunger,
	thirst,
	amusement
  });


const checkIfThirsty = (ctx, {payload}) => {
	return payload.thirst < payload.hunger && payload.thirst < payload.amusement
	
}
const checkIfHungry = (ctx, {payload}) => {
	return payload.hunger < payload.thirst && payload.hunger < payload.amusement
}
const checkIfBored = (ctx, {payload}) => {
	return payload.amusement < payload.thirst && payload.amusement < payload.hunger
}
const checkIfRanAway = (ctx, {payload}) => {
	return payload.hunger <= 0 && payload.thirst <= 0 && payload.amusement <= 0
}
const checkIfHappy = (ctx, {payload}) => {
	return payload.hunger >= 100 && payload.thirst >= 100 && payload.amusement >= 100
}

export const useMachine = createUseMachine(useEffect, useState)

export const petMachine = createMachine(
	{
		[STATE.hungry]: state(
			transition(
				ACTION_TYPES.moodChange,
				STATE.thirsty,
				guard(checkIfThirsty),
				reduce((ctx) => ({
					...ctx,
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.bored,
				guard(checkIfBored),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.ranAway,
				guard(checkIfRanAway),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.happy,
				guard(checkIfHappy),
				reduce((ctx) => ({
					...ctx
				})),
			),
		),
		[STATE.thirsty]: state(
			transition(
				ACTION_TYPES.moodChange,
				STATE.hungry,
				guard(checkIfHungry),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.bored,
				guard(checkIfBored),
				reduce((ctx) => ({
					...ctx
				})),
			),	transition(
				ACTION_TYPES.moodChange,
				STATE.ranAway,
				guard(checkIfRanAway),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.happy,
				guard(checkIfHappy),
				reduce((ctx) => ({
					...ctx
				})),
			),
		),
		[STATE.bored]: state(
			transition(
				ACTION_TYPES.moodChange,
				STATE.happy,
				guard(checkIfHappy),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.thirsty,
				guard(checkIfThirsty),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.hungry,
				guard(checkIfHungry),
				reduce((ctx) => ({
					...ctx
				})),
			),
			transition(
				ACTION_TYPES.moodChange,
				STATE.thirsty,
				guard(checkIfRanAway),
				reduce((ctx) => ({
					...ctx
				})),
			),
		),
		[STATE.happy]: final(),
		[STATE.ranAway]: final()
	},
	createInitialContext
)
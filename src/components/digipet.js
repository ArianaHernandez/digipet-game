/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import  monster from '../images/monster.png'
import bowlingalleypattern from '../images/bowlingalley.jpeg'
import cutlery from '../images/cutlery.png'
import drink from '../images/drink.png'
import toy from '../images/toy.png'
import styled from 'styled-components'
import { useMachine, triviaMachine, ACTIONS } from '../state/petMachine'

export const Digipet = () => {

	const [thirstCount, setThirstCount] = useState(50)
	const [hungerCount, setHungerCount] = useState(10)
	const [amusementCount, setAmusementCount] = useState(70)
	const [state, send] = useMachine(triviaMachine)

	const feed = () => {
		setHungerCount(hungerCount+1);
		send(ACTIONS.moodChange({hunger: hungerCount, thirst: thirstCount, amusement: amusementCount}));
	}
	const giveWater = () => {
		setThirstCount(thirstCount+1);
	}
	const playWith = () => {
		setAmusementCount(amusementCount+1);
	}


	useEffect(() => {
		const lowerHunger = setInterval(() => {
			setHungerCount(hungerCount-1);
		  }, 1000);
		  return () => clearInterval(lowerHunger);
	})

	return (
		<OuterShell>	
			<InnerShell>
			<Stats>
				<Stat fontColor="#4db1d9">Mood: <span>{state.name}</span></Stat>
				<Stat>Thirst: <span> { thirstCount}</span></Stat>
				<Stat>Hunger: <span> { hungerCount}</span></Stat>
				<Stat>Amusement: <span>{amusementCount}</span></Stat>
			</Stats>

					<img src={monster} alt="pet" height="250px" width="250px"/>
				<Buttons>
				<CareButton onClick={feed}><img src={cutlery} alt="Food Button" height="30px"/></CareButton>
					<CareButton onClick={giveWater}><img src={drink} alt="Drink Button" height="30px"/></CareButton>
					<CareButton onClick={playWith}><img src={toy} alt="Play Button" height="30px"/></CareButton>
					</Buttons>

			</InnerShell>
		</OuterShell>
	)
};

const OuterShell = styled.div `
	margin: auto;
	padding:5% 10%;
	border-radius:50%;
	background-image:url(${bowlingalleypattern});
`
const InnerShell = styled.div`
margin: auto;
border-radius: 20%;
display:flex;
flex-direction:column;
text-align:center;
overflow: hidden;
background-color:#eebb8b;
`;

const Stats = styled.section `
background-color:#dd70a7;
display:grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows:30px;
padding:0px 10px;
`
const Buttons = styled.section `
background-color:#dd70a7;
display:flex;
justify-content:space-around;
padding:10px;
`
const Stat = styled.p `
	color: ${props => props.fontColor ? props.fontColor : "#eebb8b"};
`
const CareButton = styled.button `
   max-width:100px;
   border-radius:50%;
   background-color:#eebb8b;
`

// {
// 	"category": "Science: Computers",
// 	"type": "multiple",
// 	"difficulty": "easy",
// 	"question": "What does CPU stand for?",
// 	"correct_answer": "Central Processing Unit",
// 	"incorrect_answers": [
// 		"Central Process Unit",
// 		"Computer Personal Unit",
// 		"Central Processor Unit"
// 	]
// },
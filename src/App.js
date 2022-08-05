import styled from 'styled-components'
import { Digipet } from './components/digipet'
// import { CriteriaForm } from './components/Form'

function App() {
  return (
    <DigipetPage>
			<Heading><h1>Digital Pet</h1></Heading>
			{/* <CriteriaForm /> */}
			<Digipet />
    </DigipetPage>
  );
}

export default App;

const DigipetPage = styled.main `
	background-color: #282c34;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	font-size: calc(10px + 2vmin);
	color: white;
`
const Heading = styled.div `
	width: 100%;
	display: flex;
	justify-content: center;
`
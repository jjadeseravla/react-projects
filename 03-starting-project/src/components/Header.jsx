import logoImg from '../assets/quiz-logo.png';

function Header() {
  return (
    <header>
      <img src={logoImg}></img>
      <h1>Quiz</h1>
    </header>
  )
}

export default Header;
import logoImg from '../assets/logo.jpg';

export default function Header({ title }) {
  return (
    <header id='main-header'>
      <div id="title">
        <img src={logoImg} alt="heading image" />
        <h1> 
          {title}
        </h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  )
}
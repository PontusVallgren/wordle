import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState([
    {
      title: "Game",
      link: "/",
    },
    {
      title: "Highscore",
      link: "/highscore",
    },
    {
      title: "Info",
      link: "/info",
    },
  ]);

  const menuList = menu.map((item) => {
    const path = window.location.pathname;
    const activeClass = item.link == path ? "active" : "inactive";
    return (
      <li key={item.title}>
        <a className={activeClass} href={item.link}>
          {item.title}
        </a>
      </li>
    );
  });
  return (
    <div className='container'>
      <a href='/' className='title'>
        Wordle
      </a>
      <nav className='nav'>
        <ul>{menuList}</ul>
      </nav>
    </div>
  );
};

export default Navbar;

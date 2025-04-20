import React from 'react'
const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-white mx-1 my-5 mt-12 mb-5 px-4 py-5 rounded-xl shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)] text-center">
      <p>
        Copyright &copy; {currYear}, Made with 💗 by <strong>Zameer</strong>
      </p>
    </footer>
  );
  
}

export default Footer

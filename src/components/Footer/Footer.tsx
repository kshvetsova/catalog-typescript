import './Footer.scss';

export const Footer = () => (
  <div className="Footer">
    <a className="Footer-Logo Logo" href="#/home">
      <img
        className="Logo-Image"
        src="./img/icons-page/logo.svg"
        alt="Logo"
      />
    </a>
    <div className="Footer-Socials">
      <a className="Footer-GitHub link" href="https://github.com/kshvetsova">
        GITHUB
      </a>
      <a className="Footer-Contacts link" href="tel:+380506516468">
        CONTACTS
      </a>
      <a className="Footer-Rights link" href="https://en.wikipedia.org/wiki/Rights">
        RIGHTS
      </a>
    </div>
    <div className="Footer-Scroll">
      <p className="Footer-ScrollText">Back to top</p>
      <button className="Footer-ScrollLink" onClick={() => window.scrollTo(0, 0)}>
        <img
          className="Footer-Image"
          src="./img/icons-page/top.svg"
          alt="Top"
        />
      </button>
    </div>
  </div>
)

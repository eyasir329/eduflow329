import HeaderMain from "./HeaderMain";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import News from "./News";

const Header = () => {
  return (
    <header>
      <HeaderMain />
      <section className="white-section" id="nav-bar">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* for large screens */}
            <Navbar />

            {/* for small screens */}
            <MobileNav />
          </div>
        </div>
      </div>
      </section>
      <News />
    </header>
  );
};

export default Header;

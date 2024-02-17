import './Sidebar.css'
import NearbyBanks from '../NearbyBanks/NearbyBanks';
// import logo from'../../assets/logo.png';
// import WF from'../../assets/banks/wellsfargo.png';


const Sidebar = () => {
  return (
   <>
      <div className="sidebar">
        <div className="sidebar-header">
          {/* <img src={logo} alt="Bank Logo" className="sidebar-logo" /> */}
          <h1>Bank of the Future</h1>
          <p>Trusted, AI-powered banking</p>
        </div>

        <div className="sidebar-menu">
          <button className="menu-item">
            <span className="icon">👤</span> Open Account
          </button>
          <button className="menu-item">
            <span className="icon">💰</span> Apply for Loan
          </button>
          <button className="menu-item">
            <span className="icon">💳</span> Select Credit Card
          </button>
          <button className="menu-item">
            <span className="icon">📈</span> Explore Investments
          </button>
        </div>

        <NearbyBanks/>
      </div>
   </>
  )
}

export default Sidebar


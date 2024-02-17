import './NearbyBanks.css'
import WF from'../../assets/banks/wellsfargo.png';


const NearbyBanks = () => {
  return (
   <>
      <div className="sidebar-bottom">
         <div className="find-branches">
            <h2>📍Find Branches/ATMs</h2>
            <div className="branch-list">
               <div className="branch">
                  <img src={WF} alt="Bank Icon" className="branch-icon" />
                  <div className="branch-info">
                  <strong>Future Bank</strong>
                  <p>123 AI Street, 0.5 miles away</p>
                  </div>
               </div>

               <div className="branch">
                  <img src={WF} alt="Bank Icon" className="branch-icon" />
                  <div className="branch-info">
                  <strong>Future Bank</strong>
                  <p>123 AI Street, 0.5 miles away</p>
                  </div>
               </div>

               <div className="branch">
                  <img src={WF} alt="Bank Icon" className="branch-icon" />
                  <div className="branch-info">
                  <strong>Future Bank</strong>
                  <p>123 AI Street, 0.5 miles away</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </>
  )
}

export default NearbyBanks


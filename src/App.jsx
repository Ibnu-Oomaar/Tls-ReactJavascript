// import Navbar from "./components/navbar";
import Sidebar from "./components/asidebar";
// import WelcomeCard from "./components/welcome";

import Page from "./page";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}

      <div className="flex">
        {/* <Sidebar name="Abdiwasic" age="30" phone="7890675"   /> */}

        {/* <main className="flex-1 p-6">
          <WelcomeCard />
        </main> */}
        <Page />
      </div>
    </div>
  );
}

export default App;
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConfirmInfo from "./components/questions/ConfirmInfo";
import Home from "./components/pages/Home";
import AskMeal from "./components/questions/AskMeal";
import AskStatus from "./components/questions/AskStatus";
import AskFeeling from "./components/questions/AskFeeling";
import ListPatient from "./components/manager/ListPatient";
import AddPatient from "./components/manager/AddPatient";
import {PatientsContextProvider} from "./components/contexts/PatientsContext";
import EditPatient from "./components/manager/EditPatient";
import Finish from "./components/questions/Finish";
import {AppContextProvider} from "./components/contexts/AppContext";
import AskMedicine from "./components/questions/AskMedicine";
import Emergency from "./components/pages/Emergency";
function App() {
  return (
      <PatientsContextProvider> {}
        <AppContextProvider> {}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/manage/list" element={<ListPatient/>}/>
              <Route path="/manage/add" element={<AddPatient/>}/>
              <Route path="/manage/edit" element={<EditPatient/>}/>
              <Route path="/ask/confirm" element={<ConfirmInfo/>}/>
              <Route path="/ask/medicine" element={<AskMedicine/>}/>
              <Route path="/pages/emergency" element={<Emergency/>}/>
              <Route path="/ask/meal" element={<AskMeal/>}/>
              <Route path="/ask/status" element={<AskStatus/>}/>
              <Route path="/ask/feeling" element={<AskFeeling/>}/>
              <Route path="/ask/finish" element={<Finish/>}/>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </PatientsContextProvider>
  );
}

export default App;

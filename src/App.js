import { Routes, Route, BrowserRouter } from "react-router-dom";
import Loading from "./components/loading/Loading";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import { CreateJob } from "./pages/JobPage/createJob/CreateJob";
import { CreateUser } from "./pages/userPage/CreateUser/CreateUser";
import JobPage from "./pages/JobPage/JobPage";
import UserPage from "./pages/userPage/UserPage";
import { HomeTemplate } from "./template/HomeTemplate/HomeTemplate";
import AddNewTypeJob from "./pages/categoryPage/AddNewTypeJob/AddNewTypeJob";
import EditTypeJob from "./pages/categoryPage/EditTypeJob/EditTypeJob";
import SubTypeJob from "./pages/categoryPage/ListTypeWork/SubTypeJob/SubTypeJob";
import AddNewSubTypeJob from "./pages/categoryPage/ListTypeWork/AddNewSubTypeJob/AddNewSubTypeJob";
import EditSubTypeJob from "./pages/categoryPage/ListTypeWork/EditSubTypeJob/EditSubTypeJob";

function App() {
  return (
    <div>
      <Loading />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomeTemplate>
                <UserPage />
              </HomeTemplate>
            }
          />
          <Route
            exact
            path="/user/create"
            element={
              <HomeTemplate>
                <CreateUser />
              </HomeTemplate>
            }
          />
          <Route
            path="/user/:id"
            element={
              <HomeTemplate>
                <CreateUser />
              </HomeTemplate>
            }
          />

          {/* Category */}
          <Route
            path="/category"
            element={
              <HomeTemplate>
                <CategoryPage />
              </HomeTemplate>
            }
          />
          <Route
            path="/category/addnew"
            element={
              <HomeTemplate>
                <AddNewTypeJob />
              </HomeTemplate>
            }
          />
          <Route
            path="/category/edit/:id"
            element={
              <HomeTemplate>
                <EditTypeJob />
              </HomeTemplate>
            }
          />
          <Route
            path="/category/typejob/:id"
            element={
              <HomeTemplate>
                <SubTypeJob />
              </HomeTemplate>
            }
          />
          <Route
            path="/category/typejob/:id/addnew"
            element={
              <HomeTemplate>
                <AddNewSubTypeJob />
              </HomeTemplate>
            }
          />
          <Route
            path="/category/typejob/:id1/:id2"
            element={
              <HomeTemplate>
                <EditSubTypeJob />
              </HomeTemplate>
            }
          />

          <Route
            path="/job"
            element={
              <HomeTemplate>
                <JobPage />
              </HomeTemplate>
            }
          />
          <Route
            exact
            path="/job/create"
            element={
              <HomeTemplate>
                <CreateJob />
              </HomeTemplate>
            }
          />
          <Route
            path="/job/:id"
            element={
              <HomeTemplate>
                <CreateJob />
              </HomeTemplate>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login'
import Signup from './screens/Signup'
import Browser from './screens/Browser'
import Protected from './components/Protected';
import DetectAuth from './components/DetectAuth';
import Details from "./components/Details";
import FetchMovie from './components/FetchMovie';
import FetchSeries from './components/FetchSeries';
import AddMovie from "./Admin Panel/AddMovie";
import AddEpisode from "./Admin Panel/AddEpisode";
import MovieList from "./Admin Panel/MovieList";
import SeriesList from "./Admin Panel/SeriesList";
import UserList from "./Admin Panel/UserList";
import UpdateMovie from "./Admin Panel/UpdateMovieScreen"
import Posts from "./screens/Posts"
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostEntry from "./screens/PostEntry";
import Profile from "./screens/Profile";
import Search from "./screens/FilmDiziSearch";
import ActorsSearch from "./screens/ActorsSearch";
import Header from './components/Header'
import { FaRegCopyright } from 'react-icons/fa';
import './App.css';
import Films from "./screens/Films";
import Series from "./screens/Series";
import EpisodeSelect from "./components/EpisodeSelect";
import UpdateEpisode from "./components/UpdateEpisode";
import UpdateProfile from "./Admin Panel/UpdateProfile";
import UpdateUsers from "./Admin Panel/UpdateUsers";
import MovieDashboard from "./Admin Panel/MovieDashboard";
import SeriesDashboard from "./Admin Panel/SeriesDashboard";
import AddActors from "./Admin Panel/AddActors";
import ActorList from "./Admin Panel/ActorList";
import UpdateActors from "./Admin Panel/UpdateActors";
import ForgotPassword from "./screens/ForgotPassword";
import OTPInput from "./screens/OTPInput";
import ResetPassword from "./screens/ResetPassword";
import Players from "./screens/Players";
const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [OTP, setOTP] = useState("");

    return (
      <Router>
        <Header user={user} setUser={setUser} />

        <main className="py-1">
          <Container>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/" element={<Browser user={user} />}></Route>
              <Route path="/details/:id" element={<Protected><Details /></Protected>} user={user}></Route>
              <Route path="/play/:id" element={<FetchMovie user={user} />}> </Route>
              <Route path="/playseries/:id" element={<FetchSeries user={user} />}> </Route>
              <Route path="/episodes/:id" element={<EpisodeSelect user={user} />}> </Route>
              <Route path="/addmovie" element={<AddMovie user={user} setUser={setUser} />} exact />
              <Route path="/addactors" element={<AddActors user={user} setUser={setUser} />} exact />
              <Route path="/addepisode/:id" element={<AddEpisode user={user} setUser={setUser} />} exact />
              <Route path="/movielist" element={<MovieList user={user} setUser={setUser} />} exact />
              <Route path="/serieslist" element={<SeriesList user={user} setUser={setUser} />} exact />
              <Route path="/actorlist" element={<ActorList user={user} setUser={setUser} />} exact />
              <Route path="/moviedashboard/:id" element={<MovieDashboard user={user} setUser={setUser} />} />
              <Route path="/seriesdashboard/:id1/:id2" element={<SeriesDashboard user={user} setUser={setUser} />} />
              <Route path="/userlist" element={<UserList user={user} setUser={setUser} />} exact />
              <Route path="/updateprofile" element={<UpdateProfile user={user} setUser={setUser} />} exact />
              <Route path="/filmler" element={<Films user={user} setUser={setUser} />} exact />
              <Route path="/search" element={<Search user={user} setUser={setUser} />} exact />
              <Route path="/actors/:id" element={<ActorsSearch user={user} setUser={setUser} />} exact />
              <Route path="/diziler" element={<Series user={user} setUser={setUser} />} exact />
              <Route path="/updatemovie/:id" element={<UpdateMovie user={user} setUser={setUser} />} />
              <Route path="/updateactors/:id" element={<UpdateActors user={user} setUser={setUser} />} />
              <Route path="/updateuser/:id" element={<UpdateUsers user={user} setUser={setUser} />} />
              <Route path="/updateseries/:movieid/:seriesid" element={<UpdateEpisode user={user} setUser={setUser} />} />
              <Route path="/posts" element={<Posts user={user} setUser={setUser} />} />
              <Route path="/postEntry" element={<PostEntry user={user} setUser={setUser} />} />
              <Route path="/postEntry/:_id" element={<PostEntry user={user} setUser={setUser} />} />
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/forgotPassword" element={<ForgotPassword email={username} setEmail={setUsername} otp={OTP} setOTP={setOTP}/>} />
              <Route path="/code" element={<OTPInput email={username} setEmail={setUsername} otp={OTP} setOTP={setOTP}/>} />
              <Route path="/reset" element={<ResetPassword email={username} setEmail={setUsername} otp={OTP} setOTP={setOTP}/>} />
              <Route path="/oyuncular" element={<Players/>} />
            </Routes>
          </Container>
        </main>


        <Toaster position="top-center" toastOptions={{ duration: 2750 }} />
      </Router>
    );
  }

  export default App;
/*
<footer>
        <FaRegCopyright /> KnowledgeHut. All rights reserved.
      </footer>
      */
import React from "react";
import { NavLink } from "react-router-dom";
import TasksIcon from "../assets/Images/tasks_menu.svg";
import ExploreIcon from "../assets/Images/Explore_menu.svg";
import DonationsIcon from "../assets/Images/donation_menu.svg";
import ChallengesIcon from "../assets/Images/challenges_menu.svg";
import AccountIcon from "../assets/Images/Account_menu.svg";


export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/homepage"
        className={({ isActive }) =>
          `nav-item ${isActive ? "nav-item-active" : ""}`
        }
      >
        <img src={TasksIcon} alt="Tasks" className="nav-icon" />
        <span>Tasks</span>
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `nav-item ${isActive ? "nav-item-active" : ""}`
        }
      >
        <img src={ExploreIcon} alt="Explore" className="nav-icon" />
        <span>Explore</span>
      </NavLink>
      <NavLink
        to="/donations"
        className={({ isActive }) =>
          `nav-item ${isActive ? "nav-item-active" : ""}`
        }
      >
        <img src={DonationsIcon} alt="Donations" className="nav-icon" />
        <span>Donation</span>
      </NavLink>
      <NavLink
        to="/challenges"
        className={({ isActive }) =>
          `nav-item ${isActive ? "nav-item-active" : ""}`
        }
      >
        <img src={ChallengesIcon} alt="Challenges" className="nav-icon" />
        <span>Challenges</span>
      </NavLink>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          `nav-item ${isActive ? "nav-item-active" : ""}`
        }
      >
        <img src={AccountIcon} alt="Account" className="nav-icon" />
        <span>Account</span>
      </NavLink>
    </nav>
  );
}

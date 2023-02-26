import React, { Fragment } from "react";
import "./Sidebar.css";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import logo from "../../images/dashboardLogo.png";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar">
        {/* <Link to="/">
          <img src={logo} alt="Digital Bhojnalaya" />
        </Link> */}

        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon />
            Dashboard
          </p>
        </Link>

        <Link to="#">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label="Fooditems">
              <Link to="/admin/fooditems">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/fooditem">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>

        <Link to="/admin/orders">
          <p>
            <FormatListBulletedIcon />
            Orders
          </p>
        </Link>

        <Link to="/admin/users">
          <p>
            <PeopleIcon />
            Users
          </p>
        </Link>
      </div>
    </Fragment>
  );
};

export default Sidebar;

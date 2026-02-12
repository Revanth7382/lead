import { useEffect, useState } from "react";
import { Users, Globe, Instagram, Share2 } from "lucide-react";
import API from "../services/api";
import LeadForm from "../components/LeadForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    website: 0,
    instagram: 0,
    referral: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/leads");
      const leads = res.data;

      setStats({
        total: leads.length,
        website: leads.filter((l) => l.source === "Website").length,
        instagram: leads.filter((l) => l.source === "Instagram").length,
        referral: leads.filter((l) => l.source === "Referral").length,
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-wrapper">

        {/* Stats Cards */}
        <div className="stats-grid">

          <StatCard
            title="TOTAL LEADS"
            value={stats.total}
            icon={<Users size={24} />}
            type="primary"
          />

          <StatCard
            title="WEBSITE"
            value={stats.website}
            icon={<Globe size={24} />}
            type="success"
          />

          <StatCard
            title="INSTAGRAM"
            value={stats.instagram}
            icon={<Instagram size={24} />}
            type="pink"
          />

          <StatCard
            title="REFERRAL"
            value={stats.referral}
            icon={<Share2 size={24} />}
            type="warning"
          />

        </div>

        {/* Lead Form Section */}
        <div className="dashboard-form-card">
          <h3>Add New Lead</h3>
          <LeadForm />
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, type }) => {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
      </div>

      <div className="stat-icon">
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;

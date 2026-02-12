import { RefreshCw } from "lucide-react";
import LeadTable from "../components/LeadTable";
import "./Leads.css";

const Leads = () => {
  return (
    <div className="leads-container">

      {/* Header Section */}
      <div className="leads-header">

        <div>
          <h2 className="leads-title">Lead Management</h2>
          <p className="leads-subtitle">
            View and manage all customer leads
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* Table Section */}
      <div className="leads-table-card">
        <LeadTable />
      </div>

    </div>
  );
};

export default Leads;

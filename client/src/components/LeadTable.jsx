import { useEffect, useState } from "react";
import { Search, Loader2, Users } from "lucide-react";
import API from "../services/api";
import LeadModal from "./LeadModal";
import "./LeadTable.css";

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
      setFilteredLeads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = leads;

    if (search) {
      data = data.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase()) ||
          lead.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sourceFilter) {
      data = data.filter((lead) => lead.source === sourceFilter);
    }

    setFilteredLeads(data);
  }, [search, sourceFilter, leads]);

  const getSourceClass = (source) => {
    switch (source) {
      case "Website":
        return "badge website";
      case "Instagram":
        return "badge instagram";
      case "Referral":
        return "badge referral";
      default:
        return "badge default";
    }
  };

  return (
    <div className="lead-table-container">

      {/* Header */}
      <div className="lead-header">
        <div className="lead-title">
          <Users size={20} />
          <h2>Leads ({filteredLeads.length})</h2>
        </div>

        <div className="lead-controls">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="desktop-table">
        <table>
          <thead>
            <tr>
              <th>Lead</th>
              <th>Source</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="loader-cell">
                  <Loader2 className="spin" />
                </td>
              </tr>
            ) : filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  className="table-row"
                >
                  <td className="lead-info">
                    <div className="avatar">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="lead-name">{lead.name}</p>
                      <p className="lead-email">{lead.email}</p>
                    </div>
                  </td>

                  <td>
                    <span className={getSourceClass(lead.source)}>
                      {lead.source}
                    </span>
                  </td>

                  <td className="created-date">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {loading ? (
          <Loader2 className="spin" />
        ) : filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="lead-card"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="card-header">
                <div>
                  <p className="lead-name">{lead.name}</p>
                  <p className="lead-email">{lead.email}</p>
                </div>
                <span className={getSourceClass(lead.source)}>
                  {lead.source}
                </span>
              </div>
              <p className="created-date">
                {new Date(lead.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No leads found.</p>
        )}
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
};

export default LeadTable;

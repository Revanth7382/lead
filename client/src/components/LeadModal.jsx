import { useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Copy,
} from "lucide-react";
import "./LeadModal.css";

const LeadModal = ({ lead, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!lead) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              <User size={20} />
              Lead Details
            </h2>
            <p className="created-date">
              Created {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">

          <InfoRow icon={<User size={16} />} label="Name" value={lead.name} />

          <InfoRow
            icon={<Mail size={16} />}
            label="Email"
            value={lead.email}
            copy={() => copyToClipboard(lead.email)}
          />

          <InfoRow
            icon={<Phone size={16} />}
            label="Phone"
            value={lead.phone || "-"}
            copy={lead.phone ? () => copyToClipboard(lead.phone) : null}
          />

          <InfoRow
            icon={<Building2 size={16} />}
            label="Company"
            value={lead.company || "-"}
          />

          <InfoRow
            icon={<Globe size={16} />}
            label="Source"
            value={
              <span className="source-badge">
                {lead.source}
              </span>
            }
          />

          {/* Message */}
          <div className="message-section">
            <label>Message</label>
            <div className="message-box">
              {lead.message || "-"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* Info Row */
const InfoRow = ({ icon, label, value, copy }) => (
  <div className="info-row">
    <div className="info-left">
      <div className="icon-box">{icon}</div>
      <div>
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
      </div>
    </div>

    {copy && (
      <button className="copy-btn" onClick={copy}>
        <Copy size={14} />
      </button>
    )}
  </div>
);

export default LeadModal;

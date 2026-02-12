import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import API from "../services/api";
import "./LeadForm.css";

const LeadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage(null);

      await API.post("/leads", data);

      setMessage({
        type: "success",
        text: "Lead created successfully!",
      });

      reset();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong while creating lead.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <div className="lead-card">

        <h2 className="form-title">Create New Lead</h2>

        {/* Alert */}
        {message && (
          <div className={`alert ${message.type}`}>
            {message.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="lead-form">

          <FormInput
            label="Full Name *"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <FormInput
            label="Email Address *"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />

          <FormInput
            label="Phone Number"
            {...register("phone")}
          />

          <FormInput
            label="Company Name"
            {...register("company")}
          />

          {/* Source */}
          <div className="form-group full-width">
            <label>Lead Source *</label>
            <select
              {...register("source", { required: "Source is required" })}
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
            {errors.source && (
              <span className="error-text">
                {errors.source.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="form-group full-width">
            <label>Message</label>
            <textarea
              rows="4"
              {...register("message")}
            />
          </div>

          {/* Submit */}
          <div className="full-width">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading && <Loader2 className="spin" size={18} />}
              {loading ? "Submitting..." : "Submit Lead"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, error, type = "text", ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} {...props} />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export default LeadForm;

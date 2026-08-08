import React from "react";

function SettingsPage() {
  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <div className="card" style={{maxWidth: "800px"}}>
         <h3 style={{marginBottom: "var(--space-6)", fontSize: "var(--text-lg)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-4)"}}>Profile Information</h3>
         
         <div style={{display: "flex", flexDirection: "column", gap: "var(--space-6)"}}>
            <div className="form-group">
               <label className="form-label">Full Name</label>
               <input type="text" className="form-input" defaultValue="John Doe" disabled />
               <span className="form-hint">Contact support to change your legal name.</span>
            </div>
            
            <div className="form-group">
               <label className="form-label">Email Address</label>
               <input type="email" className="form-input" defaultValue="john.doe@example.com" />
            </div>
            
            <div className="form-group">
               <label className="form-label">Phone Number</label>
               <input type="tel" className="form-input" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <div>
               <button className="btn btn-primary">Save Changes</button>
            </div>
         </div>
         
         <h3 style={{marginTop: "var(--space-12)", marginBottom: "var(--space-6)", fontSize: "var(--text-lg)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-4)"}}>Security</h3>
         
         <div style={{display: "flex", flexDirection: "column", gap: "var(--space-6)"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
               <div>
                  <div style={{fontWeight: "500", marginBottom: "var(--space-1)"}}>Two-Factor Authentication</div>
                  <div className="text-secondary text-sm">Add an extra layer of security to your account.</div>
               </div>
               <button className="btn btn-secondary">Enable 2FA</button>
            </div>
            
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
               <div>
                  <div style={{fontWeight: "500", marginBottom: "var(--space-1)"}}>Change Password</div>
                  <div className="text-secondary text-sm">Update your password regularly to keep your account secure.</div>
               </div>
               <button className="btn btn-secondary">Update Password</button>
            </div>
         </div>
      </div>
    </div>
  );
}

export default SettingsPage;

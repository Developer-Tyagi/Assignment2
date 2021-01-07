export default function() {
  return {
    showLoading: false,
    notification: null,
    contactType: ["phone", "mobile", "pager"],
    titleType: ["vendor", "vendor2", "vendor4"],
    leadSources: [
      { value: "", name: "None" },
      { value: "client", name: "Prior Client" },
      { value: "vendor", name: "Vendor" },
      { value: "affiliate", name: "Affiliate" },
      { value: "referral", name: "Referral" },
      { value: "advertisement", name: "Advertisement" },
      { value: "google", name: "Google" },
      { value: "other", name: "Other" }
    ]
  };
}

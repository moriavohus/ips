export const contactSubmission = {
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "message", title: "Message", type: "text" },
    { name: "product", title: "Product of Interest", type: "string" },
    { name: "quantity", title: "Quantity", type: "string" },
    { name: "submittedAt", title: "Submitted At", type: "datetime" },
  ],
};

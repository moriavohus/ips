export const documentSchema = {
  name: "document",
  title: "Document",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Product Datasheets", value: "datasheets" },
          { title: "Technical Guides", value: "technical" },
          { title: "Certificates", value: "certificates" },
          { title: "Safety Data Sheets", value: "msds" },
        ],
      },
    },
    { name: "file", title: "File", type: "file" },
  ],
};

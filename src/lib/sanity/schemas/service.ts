export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "description", title: "Description", type: "text" },
    { name: "icon", title: "Icon Name", type: "string" },
  ],
};

export const industry = {
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "description", title: "Description", type: "text" },
    {
      name: "caseStudies",
      title: "Case Studies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
};

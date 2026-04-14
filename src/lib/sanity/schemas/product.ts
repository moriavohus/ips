export const product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cellular Glass", value: "cellularGlass" },
          { title: "Mineral Wool", value: "mineralWool" },
          { title: "Stainless Accessories", value: "stainlessAccessories" },
          { title: "Coatings & Ancillaries", value: "coatings" },
        ],
      },
    },
    { name: "description", title: "Description", type: "text" },
    {
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    {
      name: "datasheets",
      title: "Datasheets",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "file", title: "File", type: "file" },
          ],
        },
      ],
    },
  ],
};

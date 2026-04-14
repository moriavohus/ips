export const productQuery = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  category,
  description,
  specs,
  images,
  "datasheets": datasheets[]{
    title,
    "url": file.asset->url
  }
}`;

export const allProductsQuery = `*[_type == "product"] | order(category asc){
  _id,
  name,
  slug,
  category,
  description,
  "thumbnail": images[0]
}`;

export const serviceQuery = `*[_type == "service"] | order(_createdAt asc){
  _id,
  name,
  slug,
  description,
  icon
}`;

export const industryQuery = `*[_type == "industry"] | order(_createdAt asc){
  _id,
  name,
  slug,
  description,
  caseStudies
}`;

export const documentsQuery = `*[_type == "document"] | order(category asc, title asc){
  _id,
  title,
  category,
  "fileUrl": file.asset->url
}`;

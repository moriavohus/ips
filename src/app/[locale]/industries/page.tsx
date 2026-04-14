import { redirect } from "next/navigation";

export default function IndustriesPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/industries/oil-gas`);
}

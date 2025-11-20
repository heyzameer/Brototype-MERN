import { redirect } from "next/navigation";

export default function Page({ params }) {
  if (params.slug) {
    redirect("/");   // redirect ANY slug to home
  }
}

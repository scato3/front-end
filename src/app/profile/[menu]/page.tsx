export default function Page({ params }: { params: { slug: string } }) {
  return <div>메뉴: {params.slug}</div>;
}

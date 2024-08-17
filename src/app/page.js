import dynamic from "next/dynamic";
import Head from "next/head";

 const Home = dynamic(() => import("./_component/Home"), {
  ssr: false, 
});

export default function Page() {
  return (
    <div>
      <Head>
        <title>Leaflet Map</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6/dist/leaflet.css"
        />
      </Head>
      <Home />
    </div>
  );
}

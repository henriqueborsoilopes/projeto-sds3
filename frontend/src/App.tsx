import DataTable from "components/DataTable";
import Footer from "components/Footer";
import NavBar from "components/NavBar/indes";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <DataTable />
      </div>
      <Footer />
    </>
  );
}

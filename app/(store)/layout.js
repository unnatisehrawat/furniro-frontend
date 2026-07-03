import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

export default function StoreLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
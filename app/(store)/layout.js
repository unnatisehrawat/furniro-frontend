import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"

export default function StoreLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <ChatBot />
      <Footer />
    </>
  )
}
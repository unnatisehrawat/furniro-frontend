import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex flex-col md:flex-row justify-between">

        
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Furniro
            </h2>
          </div>
          <div>
            <p className="text-gray-500 leading-8">
              400 University Drive Suite 200
              <br />
              Coral Gables,
              <br />
              FL 33134 USA
            </p>



          </div>

          
          <div >
            <h3 className="text-gray-400 font-medium mb-8">
              Links
            </h3>

            <ul className="space-y-6 font-semibold">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/shop">Shop</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <p className="text-gray-700">
            2023 Furniro. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
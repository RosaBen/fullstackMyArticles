export default function Header(){
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">My Articles</h1>
      </div>
    </header>
  );
}
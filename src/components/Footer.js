export default function Footer() {
  return (
    <footer className="mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
      &copy; {new Date().getFullYear()} Daily Books. Tous droits réservés.
    </footer>
  );
}
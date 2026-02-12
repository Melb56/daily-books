import Link from "next/link";
import "@/styles/components/footer.scss"

export default function Footer() {
  return (
    <footer>
      <div  className="footer">
        &copy; {new Date().getFullYear()} Daily Books - <Link href="/mentions-legales">Mentions Légales</Link> <br />
        Tous droits réservés
      </div>
      

    </footer>
  );
}
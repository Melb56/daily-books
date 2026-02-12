export default function MentionsLegalesPage() {
  return (
    <section className="legal">
      <h2>Mentions légales</h2>

      <h3>Éditeur du site</h3>
        <p>
            Nom : Mélanie Bruzac <br />
            Statut : Auto-entrepreneure <br />
            Email : melanie.bruzac@outlook.fr 
        </p>

      <h3>Hébergeur</h3>
         <p>
            Vercel Inc.
            440 N Barranca Ave #4133 <br />
            Covina, CA 91723 <br />
            États-Unis <br />
            https://vercel.com <br />
        </p>

        <h3>Propriété intellectuelle</h3>
            <p>
                L’ensemble du contenu présent sur l’application
                (textes, interface, structure, code source)
                est la propriété exclusive de Mélanie Bruzac,
                sauf mention contraire. <br />
                Toute reproduction ou utilisation non autorisée
                est interdite.
            </p>
        
        <h3>Données personnelles</h3>
            <p>
                <h4>Données collectées :</h4>
                <ul>
                    <li>Adresse email</li>
                    <li>Mot de passe (stocké de manière chiffrée)</li>
                    <li>Données liées au compte utilisateur</li>
                </ul>
               
                <h4>Finalité :</h4>
                <ul>
                    <li>Authentification</li>
                    <li>Accès à l’espace personnel</li>
                </ul>

                <h4>Base légale du traitement :</h4>
                Consentement de l’utilisateur et exécution du service.

                <h4>Durée de conservation : </h4>
                Les données sont conservées tant que le compte est actif. <br />
                L’utilisateur peut demander la suppression de son compte à tout moment.

                <h4>Droits utilisateurs :</h4>
                Conformément au RGPD, l’utilisateur dispose des droits suivants :
                <ul>
                    <li>Droit d’accès</li>
                    <li>Droit de rectification</li>
                    <li>Droit de suppression</li>
                    <li>Droit d’opposition</li>
                </ul>
                Toute demande peut être adressée à :
                melanie.bruzac@outlook.fr
            </p>

        <h3>Cookies</h3>
            <p>
                Ce site utilise uniquement des cookies techniques
                nécessaires au bon fonctionnement de l’application. <br />
                Aucun cookie de suivi ou publicitaire n’est utilisé.
            </p>
        
        <h3>Sécurité</h3>
        <p>
            Les données sont stockées sur des serveurs sécurisés. <br />
            Toutes les communications sont chiffrées via HTTPS.
        </p>

    </section>
  );
}



const UserProfilePage = () => {

    return (
        <>
            <div>Compte</div>

            <div>
                <ul>
                    <li><a href="">Déposer une annonce <span>&gt;</span></a></li>
                    <li><a href="">Voir mes annonces <span>&gt;</span></a></li>
                    <li><a href="">Voir mes inscriptions <span>&gt;</span></a></li>
                </ul>
            </div>

            <button id="accountClosureBtn">Demande de fermeture de compte</button>

            <div id="accountClosureModal" className="accountClosureModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Fermer mon compte</h2>
                    </div>
                    <div className="modal-body">
                        <p>Êtes-vous sûr vouloir fermer votre compte</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success">Oui</button>
                        <button type="button" className="btn btn-warning" data-dismiss="modal">Non</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfilePage
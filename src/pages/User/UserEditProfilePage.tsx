
const UserEditProfilePage = () => {
    return (
        <>
            <h1>À propos de vous</h1>

            <form method="post">

                <input
                    type="file"
                    id="picture"
                    name="picture"
                />
                <input
                    type="checkbox"
                    name="publicPicture"
                    id="publicPicture"
                />
                <label htmlFor="publicPicture">public</label>
                <br />
                <br />

                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Votre prénom"
                />
                <input
                    type="checkbox"
                    name="publicFirstName"
                    id="publicFirstName"
                />
                <label htmlFor="publicFirstName">public</label>
                <br />
                <br />

                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Votre nom"
                />
                <input
                    type="checkbox"
                    name="publicLastName"
                    id="publicLastName"
                />
                <label htmlFor="publicLastName">public</label>
                <br />
                <br />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Votre mot de passe"
                />
                <br />
                <br />

                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="Votre date de naissance"
                />
                <input
                    type="checkbox"
                    name="publicBirthDate"
                    id="publicBirthDate"
                />
                <label htmlFor="publicBirthDate">public</label>
                <br />
                <br />

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Votre email"
                />
                <input
                    type="checkbox"
                    name="publicEmail"
                    id="publicEmail"
                />
                <label htmlFor="publicEmail">public</label>
                <br />
                <br />

                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Votre numéro de téléphone"
                />
                <input
                    type="checkbox"
                    name="publicPhone"
                    id="publicPhone"
                />
                <label htmlFor="publicPhone">public</label>
                <br />
                <br />

                <input
                    type="submit"
                    value="Actualiser mon profil"
                    className="btn btn-secondary"
                />
            </form>
            
        </>
    )
}

export default UserEditProfilePage
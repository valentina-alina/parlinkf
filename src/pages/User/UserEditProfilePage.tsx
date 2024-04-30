import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { IoIosSend } from "react-icons/io";
import { ProfileInterface } from "../../services/interfaces/Profile";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ProfileProp {
    handleSubmitProfile: (contactForm: ProfileInterface) => void;
}

export default function UserEditProfilePage(props: ProfileProp) {

    const handleSubmitProfile = props.handleSubmitProfile;

    const formik = useFormik({
        initialValues: {
            file: "",
            firstname: "",
            lastname: "",
            password: "",
            birthDate: "",
            email: "",
            phone: "",
        },
        validationSchema: Yup.object({
            file: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères"),
            firstname: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères"),
            lastname: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères"),
            password: Yup.string()
                            .min(3, "minimum 3 caractères"),
            email: Yup.string()
                            .email(),
            phone: Yup.string()
                            .min(3, "minimum 10 caractères"),
        }),
        onSubmit: (values) => {
            const parsedValues = {
                ...values,
                birthDate: values.birthDate ? new Date(values.birthDate) : null
            };
        
            handleSubmitProfile(parsedValues);

            // setCurrentId(idIncrement(currentId));
            formik.resetForm();
            alert('Votre profil a bien été mis à jour!');
        },
    });


    return (
        <>
            <h1 className="font-h1 mb-8 text-3xl">À propos de vous</h1>

            <div className="flex justify-center items-center font-input">
                <Card className="w-96 bg-gray-50 shadow-lg">
                    <form onSubmit={formik.handleSubmit}>
                    
                        <input
                            type="file"
                            id="picture"
                            name="picture"
                            className="mb-2"
                            onChange={formik.handleChange}
                            value={ formik.values.file }
                        />
                        <br />

                        <div className="flex items-center gap-2">
                            <Checkbox id="publicPicture" />
                            <Label htmlFor="publicPicture">public</Label>
                        </div>
                        <br />
                    
                        <TextInput
                            id="firstname"
                            type="text"
                            name="firstname"
                            className="mb-2"
                            placeholder="Votre prénom"
                            onChange={formik.handleChange}
                            value={ formik.values.firstname }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.firstname}</span>
                                </>
                            }
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox id="publicFirstname" />
                            <Label htmlFor="publicFirstname">public</Label>
                        </div>
                        <br />
                    
                        <TextInput
                            id="lastname"
                            type="text"
                            name="lastname"
                            className="mb-2"
                            placeholder="Votre nom"
                            onChange={formik.handleChange}
                            value={ formik.values.lastname }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.lastname}</span>
                                </>
                            }
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox id="publicLastname" />
                            <Label htmlFor="publicLastname">public</Label>
                        </div>
                        <br />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            className="mb-2"
                            placeholder="Votre mot de passe"
                            onChange={formik.handleChange}
                            value={ formik.values.password }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.password}</span>
                                </>
                            }
                        />
                        <br />

                        <TextInput
                            id="birthDate"
                            type="date"
                            name="birthDate"
                            className="mb-2"
                            placeholder="Votre date de naissance"
                            onChange={formik.handleChange}
                            value={ formik.values.birthDate }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.birthDate}</span>
                                </>
                            }
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox id="publicBirthDate" />
                            <Label htmlFor="publicBirthDate">public</Label>
                        </div>
                        <br />
                    
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            className="mb-2"
                            placeholder="Votre email"
                            onChange={formik.handleChange}
                            value={ formik.values.email }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.email}</span>
                                </>
                            }
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox id="publicEmail" />
                            <Label htmlFor="publicEmail">public</Label>
                        </div>
                        <br />

                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            className="mb-2"
                            placeholder="Votre n° de téléphone"
                            onChange={formik.handleChange}
                            value={ formik.values.phone }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.phone}</span>
                                </>
                            }
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox id="publicPhone" />
                            <Label htmlFor="publicPhone">public</Label>
                        </div>
                        <br />

                        <Button
                            className="bg-violet-900 font-button"
                            type="submit"
                        >
                            Actualiser <IoIosSend className="mt-1 ml-1" />
                        </Button>
                    </form>
                </Card>
            </div>
            

        </>
    )
}
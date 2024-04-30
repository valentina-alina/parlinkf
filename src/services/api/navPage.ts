// import axios from 'axios';
import PageData  from '../../components/Navbar/faker';

export async function getPageByTitle() {
    try {
        const data = PageData;

        return data;
    } catch (error) {
        console.log(error)
    }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from '../../hooks/useApi';
// import fakeAd from '../../pages/Ads/fakerAds';

const api = useApi();

export async function getAds() {
    try {
        const response = await api.get('ad');
        const data = response.data;

        console.log('Fetched ads:', data);

        if (data && data.data && data.data.ads) {
            const ads = data.data.ads; // Extract ads array from response

            // You can perform any additional processing here if needed

            return ads;
        } else {
            console.error('Unexpected response format:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching ads:', error);
        return [];
    }
}

export async function getAdsByParams(search: string) {
    try {
        const {data} = await api.get(`ad/params?search=${search}`);
        return data
    } catch (error) {
        return {
            error: error
        }
    }
}

/* export async function getAdsByCategories(categoryName: string) {
    try {
        const {data} = await api.post(`ad/categories?categoryName=${categoryName}`);
        return data
    } catch (error) {
        return {
            error: error
        }
    }
} */

export async function getCategories() {
    try {
        const response = await api.get('categories');
        console.log('Fetched categories:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/*  export async function postSubscribedProfilesById(id: any) {
    try {
        const {data} = await api.post(`student/${id}`);
        return data
    } catch (error) {
        return {
            error: error
        }
    }
} */
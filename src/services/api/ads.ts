import fakeAd from '../../pages/Ads/fakerAds';

export async function getAds() {
    try {
        return fakeAd;
    } catch (error) {
        console.log(error)
    }
}
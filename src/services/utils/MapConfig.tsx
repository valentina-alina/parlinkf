/* eslint-disable @typescript-eslint/no-explicit-any */
export default class MapConfig {
    defaultMapContainerStyle(width: any, height:any) {
        return {
            width: width,
            height: height,
            borderRadius: '10px 10px 10px 10px',
        }
    }
    
    defaultMapCenter(ads:any) {
        return {
            lat: ads.length > 0 ? ads[0].lat : 0,
            lng: ads.length > 0 ? ads[0].lng : 0,
        }
    }

    defaultMapCenterAdDetail(ads:any) {
        return {
            lat: ads.lat,
            lng: ads.lng,
        }
    }
    
    defaultMapZoom(zoom: number) {
        return zoom
    }
    
    defaultMapOptions(zoomControl: boolean, tilt: number, gestureHandling: string, mapTypeId: string) {
        return {
            zoomControl: zoomControl,
            tilt: tilt,
            gestureHandling: gestureHandling,
            mapTypeId: mapTypeId,
        }
    }
}
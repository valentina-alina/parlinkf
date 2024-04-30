import { useParams} from 'react-router-dom';

export default function AdsDetailPage() {

    const { idAd } = useParams();
    console.log('idAd', idAd);

    return (
        <div>
            <h3 className="font-h3">Détail de l'annonce</h3>
            <p className="font-body">Annonce n° <strong>{ idAd }</strong></p>
        </div>
    )
}
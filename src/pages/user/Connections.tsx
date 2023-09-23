import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const ConnectionsPage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Connections</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Connections</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>Connections form</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default ConnectionsPage;
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const ContentEditPage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Edit Content</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Edit Content</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>Edit Content</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default ContentEditPage;
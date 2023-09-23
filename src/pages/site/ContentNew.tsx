import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const ContentNewPage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>New Content</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">New Content</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>New Content</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default ContentNewPage;
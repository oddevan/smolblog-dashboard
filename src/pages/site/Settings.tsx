import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const SettingsPage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Settings</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Settings</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>Settings form</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
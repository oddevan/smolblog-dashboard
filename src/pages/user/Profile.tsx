import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const ProfilePage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Profile</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>Profile form</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
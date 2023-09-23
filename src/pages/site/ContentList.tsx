import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const ContentListPage = () => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Content</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Content</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <p>Content List</p>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default ContentListPage;
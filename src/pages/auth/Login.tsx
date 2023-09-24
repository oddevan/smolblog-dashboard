import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import { useSmolblog } from "../../components/SmolblogContext";
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage';

const LoginPage = () => {
    const smolblog = useSmolblog();
    const [serverInput, setServerInput] = useState('https://smol.blog');
    

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Login</IonTitle>
            </IonToolbar>
            </IonHeader>
            <div className="container">
                <IonInput
                    label="Server"
                    type="url"
                    labelPlacement="stacked"
                    value={serverInput}
                />
                <IonButton color="primary">Login with Smolblog</IonButton>
            </div>
        </IonContent>
        </IonPage>
    );
};

export default LoginPage;
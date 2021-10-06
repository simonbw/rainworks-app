import React, { useContext, useState } from "react";
import { showError, showSuccess } from "../utils/toastUtils";
import { registerForPushNotifications } from "../utils/util";

interface SubmitContextValue {
  creatorEmail: string;
  setCreatorEmail: (creatorEmail: string) => void;
  creatorName: string;
  setCreatorName: (creatorName: string) => void;
  description: string;
  setDescription: (description: string) => void;
  imageUri: string;
  setImageUri: (imageUri: string) => void;
  installationDate: Date; // TODO: Date?
  setInstallationDate: (installationDate: Date) => void; // TODO: Date?
  location: { lat: number; lng: number };
  setLocation: (lat: number, lng: number) => void;
  name: string;
  setName: (name: string) => void;
  submit: () => void;
}

const SubmitContext = React.createContext<SubmitContextValue>({
  creatorEmail: "",
  setCreatorEmail: () => null,
  creatorName: "",
  setCreatorName: () => null,
  description: "",
  setDescription: () => null,
  imageUri: "",
  setImageUri: () => null,
  installationDate: new Date(),
  setInstallationDate: () => null,
  location: { lat: 0, lng: 0 },
  setLocation: () => null,
  name: "",
  setName: () => null,
  submit: () => null
});

export function useSubmitContext() {
  return useContext(SubmitContext);
}

export function SubmitProvider({ children }: { children: React.ReactNode }) {
  const [creatorEmail, setCreatorEmail] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [installationDate, setInstallationDate] = useState(new Date());
  const [location, setLocation] = useState({ lat: 0, lng: 0 }); // TODO: Current location
  const [name, setName] = useState("");

  return (
    <SubmitContext.Provider
      value={{
        creatorEmail,
        setCreatorEmail,
        creatorName,
        setCreatorName,
        description,
        setDescription,
        imageUri,
        setImageUri,
        installationDate,
        setInstallationDate,
        location,
        setLocation,
        name,
        setName,
        submit: async () => {
          try {
            this.setState({ submitting: true });
            const { uploadUrl, finalizeUrl } = await postToApi();
            await uploadImage(uploadUrl);
            await finalize(finalizeUrl);
            this.setState(this.getResetState());
            showSuccess("Rainwork Submitted");
          } catch (error) {
            // Some API error
            showError("Error Submitting Rainwork");
            console.error(error);
            this.setState({ submitting: false, submitError: error });
            return false;
          }
          registerForPushNotifications().catch(e => console.error(e));
          return true;
        }
      }}
    >
      {children}
    </SubmitContext.Provider>
  );
}

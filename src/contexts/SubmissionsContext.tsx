import React, { useContext, useState, useEffect } from "react";
import { showError } from "../utils/toastUtils";
import { fetchSubmissions } from "../api/submissionsApi";

type Submission = any; // TODO: Better type for Submission

interface Value {
  loading: boolean;
  submissions: Submission[];
  refresh: () => void;
  getSubmission: (submissionId: string) => Submission | undefined;
}

const SubmissionsContext = React.createContext<Value>({
  loading: false,
  submissions: [],
  refresh: () => undefined,
  getSubmission: () => undefined
});

export const SubmissionsConsumer = SubmissionsContext.Consumer;

export function useSubmissionsContext() {
  return useContext(SubmissionsContext);
}

interface Props {
  children?: React.ReactNode;
}

export function SubmissionsProvider({ children = null }: Props) {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const newSubmissions = await fetchSubmissions();
      setSubmissions(newSubmissions);
    } catch (e) {
      showError("Error loading submissions");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadSubmissions();
  });

  return (
    <SubmissionsContext.Provider
      value={{
        loading,
        submissions,
        getSubmission: id => submissions.find(s => s["id"] === id),
        refresh: loadSubmissions
      }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export interface Student {
  id: string;
  studentNumber: string;
  name: string;
  dateOfBirth: string;
  major: string;
  createdAt: string;
}

const url = "http://localhost:5000/students";

async function updateRequest(id: string, data: Student) {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Student) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(id: string) {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function getRequest() {
  const response = await fetch(url);
  const data = await response.json();

  // Mengurutkan data secara descending berdasarkan createdAt
  const sortedData = data.sort(
    (a: Student, b: Student) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedData;
}

export default function useStudents() {
  const queryClient = useQueryClient();

  // Query for fetching students
  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: getRequest,
    initialData: [],
  });

  // Mutation for updating a student
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Student }) =>
      updateRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  // Mutation for deleting a student
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  // Mutation for adding a student
  const addMutation = useMutation({
    mutationFn: (data: Student) => addRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    data: data ?? [],
    isLoading,
    createRow: (postData: Student) => addMutation.mutate(postData),
    updateRow: (id: string, postData: Student) =>
      updateMutation.mutate({ id, data: postData }),
    removeRow: (id: string) => deleteMutation.mutate(id),
  };
}

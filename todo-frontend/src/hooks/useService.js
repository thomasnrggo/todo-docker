import { useState, useEffect, useCallback } from "react";

const useService = (completed = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:6969";

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks?completed=${completed}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [completed]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  const createItem = async (item) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await fetchData();
      } else {
        throw new Error("Failed to create item.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const updateItem = async (itemId, updatedItem) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks/${itemId}`, {
        method: "PUT",
        body: JSON.stringify(updatedItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await fetchData();
      } else {
        throw new Error("Failed to update item.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchData();
      } else {
        throw new Error("Failed to delete item.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return {
    data,
    createItem,
    updateItem,
    deleteItem,
    loading,
  };
};

export default useService;

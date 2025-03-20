/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommunitiesDiscussions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${id}/discussions`
        );
        const data = await res.json();
        setDiscussions(data);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
        toast.error("Failed to load communities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunitiesDiscussions();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      {discussions && discussions.length > 0 ? (
        <div>
          <h1>Discussions</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "300px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2>{discussion.title}</h2>
                <p>{discussion.description}</p>
                <button
                  onClick={() =>
                    router.push(`/student/discussions/${discussion.id}/chat`)
                  }
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Go to Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No discussions found</div>
      )}
    </div>
  );
}

export default Page;

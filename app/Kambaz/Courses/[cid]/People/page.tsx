"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";
import { User } from "../../../Database/types";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    const enrolledUsers = await coursesClient.findUsersForCourse(cid);
    setUsers(enrolledUsers);
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div id="wd-people">
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";

interface Student {
  userName: string;
  name: string;
  department: string;
  grade: string;
  class: string;
  Email: string;
}

const AddStudent: React.FC = () => {
  const [student, setStudent] = useState<Student>({
    userName: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:7777/api/v1/user/insertOne", student);
      setResponseMessage(`新增成功: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setResponseMessage("新增失敗，請檢查輸入資料或伺服器錯誤");
    }
  };

  return (
    <div>
      <h2>新增學生</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="帳號"
          value={student.userName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="姓名"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="系所"
          value={student.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="年級"
          value={student.grade}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="class"
          placeholder="班級"
          value={student.class}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={student.Email}
          onChange={handleChange}
          required
        />
        <button type="submit">新增學生</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default AddStudent;

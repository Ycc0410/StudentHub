import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {
  const [students, setStudents] = useState<Array<Student>>([]) // 學生資料狀態
  const cache = useRef<boolean>(false) // 緩存狀態，避免重複請求

  // 新增學生的狀態
  const [newStudent, setNewStudent] = useState<Student>({
    userName: '',
    座號: '',
    姓名: '',
    院系: '',
    年級: '',
    班級: '',
    Email: '',
    absences: 0,
  })

  const [message, setMessage] = useState<string>('')

  // 初始化資料：發送請求查詢所有學生
  useEffect(() => {
    if (!cache.current) {
      cache.current = true
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          setStudents(res.body)
        }
      })
    }
  }, [])

  // 刪除學生的函數
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${api.deleteById}?id=${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      if (result.code === 200) {
        setStudents((prev) => prev.filter((student) => student._id !== id))
        alert('刪除成功！')
      } else {
        alert('刪除失敗！')
      }
    } catch (error) {
      console.error('刪除錯誤:', error)
      alert('刪除發生錯誤！')
    }
  }

  // 新增學生的函數
  const handleAddStudent = async () => {
    try {
      const response = await fetch(api.insertOne, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      })

      const result = await response.json()
      if (result.code === 200) {
        setStudents([...students, result.body]) // 更新學生列表
        setMessage('新增成功！')
        setNewStudent({
          userName: '',
          座號: '',
          姓名: '',
          院系: '',
          年級: '',
          班級: '',
          Email: '',
          absences: 0,
        })
      } else {
        setMessage(`新增失敗: ${result.message}`)
      }
    } catch (error) {
      console.error('新增錯誤:', error)
      setMessage('新增發生錯誤！')
    }
  }

  // 渲染學生列表
  const studentList = students.length
    ? students.map((student: Student) => (
        <div className="student" key={student._id}>
          <p>帳號: {student.帳號}</p>
          <p>座號: {student.座號}</p>
          <p>姓名: {student.姓名}</p>
          <p>院系: {student.院系}</p>
          <p>年級: {student.年級}</p>
          <p>班級: {student.班級}</p>
          <p>Email: {student.Email}</p>
          <p>缺席次數: {student.absences ? student.absences : 0}</p>
          <button
            className="del_button"
            type="button"
            onClick={() => handleDelete(student._id)}
          >
            刪除
          </button>
        </div>
      ))
    : '載入中...'

  return (
    <>
      <div className="container">
        <h2></h2>
        {studentList}

        <h3></h3>
<div className="add-student-form">
  <input
    type="text"
    placeholder="帳號"
    value={newStudent.userName}
    onChange={(e) => setNewStudent({ ...newStudent, userName: e.target.value })}
  />
  <input
    type="text"
    placeholder="座號"
    value={newStudent.座號}
    onChange={(e) => setNewStudent({ ...newStudent, 座號: e.target.value })}
  />
  <input
    type="text"
    placeholder="姓名"
    value={newStudent.姓名}
    onChange={(e) => setNewStudent({ ...newStudent, 姓名: e.target.value })}
  />
  <button onClick={handleAddStudent}>新增</button>
</div>
<p className="message">{message}</p>

      </div>
    </>
  )
}

export default App

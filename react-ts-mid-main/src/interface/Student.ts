export interface Student {
  _id?: string;       // 可選，MongoDB 自動生成的 ID
  帳號: string;        // 帳號
  座號: number;       // 座號
  姓名: string;        // 姓名
  院系: string;        // 院系
  年級: string;        // 年級
  班級: string;        // 班級
  Email: string;      // Email 地址
  absences?: number;  // 可選，缺席次數
}

  
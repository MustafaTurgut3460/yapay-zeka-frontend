export interface CreateTestType {
  test_code: string;
  isStarted: boolean;
  students: any[];
  high_score: number;
  low_score: number;
  moderate_score: number;
}

export interface StudentFormType {
  test_code: string;
  Gender: number;
  Age: number;
  Education_Level: number;
  Institution_Type: number;
  IT_Student: number;
  Location: number;
  Load_shedding: number;
  Financial_Condition: number;
  Internet_Type: number;
  Network_Type: number;
  Class_Duration: number;
  Self_Lms: number;
  Device: number;
}

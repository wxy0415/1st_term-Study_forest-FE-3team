import axios from "axios";

const instance = axios.create({
  baseURL: "https://test-lm9p.onrender.com/",
});

// 리스트 조회 API
const gethabitList = async (studyId) => {
  const res = await instance.get(`/study/${studyId}/habitList`);
  return res.data;
};

// 습관 완료 APi
const postSuccess = async (habitId) => {
  const res = await instance.post(`/habit/${habitId}/success`);
  return res.data;
};

// 완료한 습관 삭제 API
const deleteSuccess = async (habitSuccessId) => {
  const res = await instance.delete(`/success/${habitSuccessId}`);
  return res.data;
};

// 습관 삭제(PATCH) API
const deleteHabit = async (habitId) => {
  const res = await instance.patch(`/habit/${habitId}/delete`);
  return res.data;
};

// 습관 생성 API
const postHabit = async (studyId, surveyData) => {
  const res = await instance.post(`/study/${studyId}/habit`, surveyData);
  return res.data;
};

export { gethabitList, postSuccess, deleteSuccess, deleteHabit, postHabit };

import axios from "axios";

const instance = axios.create({
  baseURL: "https://test-lm9p.onrender.com/",
});

const gethabitList = async (studyId) => {
  const res = await instance.get(`/study/${studyId}/habitList`);
  return res.data;
};

const postSuccess = async (habitId) => {
  const res = await instance.post(`/habit/${habitId}/success`);
  return res.data;
};

const deleteSuccess = async (habitSuccessId) => {
  const res = await instance.delete(`/successed/${habitSuccessId}`);
  return res.data;
};

export { gethabitList, postSuccess, deleteSuccess };

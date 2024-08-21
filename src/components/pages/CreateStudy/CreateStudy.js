import Header from '../../Layout/Header.js';
import InputForm from './InputForm/InputForm.js';

const CreateStudy = () => {
  return (
    <>
      <Header hideCreateButton={true} />
      <InputForm />
    </>
  );
};

export default CreateStudy;
